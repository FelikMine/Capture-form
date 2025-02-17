import React, { useState, useEffect } from "react";
import "./form.css";

export default function Form() {
    
    interface FormData {
        title: string;
        description: string;
        tags: string;
        budget_from: string;
        budget_to: string;
        deadline_days: string;
        number_of_reminders: string;
        private_content: string;
        is_hard: boolean;
        all_auto_responses: boolean;
    }

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        tags: '',
        budget_from: '',
        budget_to: '',
        deadline_days: '',
        number_of_reminders: '',
        private_content: '',
        is_hard: false,
        all_auto_responses: false,
    });

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Отправленные данные:", { ...formData, token });

        try {
            const response = await fetch('APIendpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Ответ сервера:", data);

            if (response.status === 200) {
                alert("Отправка выполнена успешно.");
                setFormData({
                    title: '',
                    description: '',
                    tags: '',
                    budget_from: '',
                    budget_to: '',
                    deadline_days: '',
                    number_of_reminders: '',
                    private_content: '',
                    is_hard: false,
                    all_auto_responses: false,
                });
            } else {
                alert("Ошибка отправки.");
            }
        } catch (error) {
            console.error("Произошла ошибка при отправке данных: ", error);
            alert("Произошла ошибка при отправке данных.");
        }
    };

    function AddField() {
        const fields = [];

        for (const prop in formData) {
            const value = formData[prop as keyof FormData];
            let inputType: string = 'text';

            if (typeof value === 'boolean') {
                inputType = 'checkbox';
            } else if (typeof value === 'string') {
                inputType = 'text';
            }

            fields.push(
                <div className="relative z-0 w-full mb-5 group" key={prop}>
                    {inputType === 'checkbox' ? (
                        <>
                            <input
                                type={inputType}
                                name={prop}
                                checked={value as boolean}
                                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                onChange={handleChange}
                            />
                            <label className="ml-2 text-sm text-gray-500 dark:text-gray-400">{prop}</label>
                        </>
                    ) : (
                        <>
                            <input
                                type={inputType}
                                name={prop}
                                value={value as string}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                onChange={handleChange}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{prop}</label>
                        </>
                    )}
                </div>
            );
        }

        return <>{fields}</>;
    }

    return (
        <>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <AddField />
                <button type="submit" className="bg-violet-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
                    Submit
                </button>
            </form>
        </>
    );
}