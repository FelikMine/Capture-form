import React, {useState} from "react";
import "./form.css";

export default function Form () {

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Здесь вы можете вызвать ваш метод для отправки данных
        console.log(formData);
        // Пример вызова API
        // const response = await fetch('YOUR_API_ENDPOINT', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // });
        // const data = await response.json();
        // console.log(data);
    };

    function AddField() {

        const fields = [];


        for(const prop in formData) {

            const value = formData[prop as keyof FormData];
            let inputType: string = 'text';

            if (typeof value === 'boolean') {
                inputType = 'checkbox';
            } else if (typeof value === 'string') {
                inputType = 'text';
            }

            console.log("ehi");

            fields.push(
                <div className="relative z-0 w-full mb-5 group">
                     {inputType === 'checkbox' ? (
                <>
                    <input
                        type={inputType}
                        name={prop}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                [prop]: e.target.checked,
                            });
                        }}
                    />
                    <label className="ml-2 text-sm text-gray-500 dark:text-gray-400">{prop}</label>
                </>
            ) : (
                <>
                    <input
                        type={inputType}
                        name={prop}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                [prop]: e.target.value,
                            });
                        }}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{prop}</label>
                </>
            )}
                    {/* <input type={inputType} name={prop}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    checked={typeof value === 'boolean' ? value : undefined} placeholder=" " required
                    onChange={(e) => {
                        const newValue = inputType === 'checkbox' ? e.target.checked : e.target.value;
                        setFormData({
                            ...formData,
                            [prop]: newValue,
                        });
                    }}
                    />

                    <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                    >{prop}</label> */}
                </div>
            );
        }
        return <>{fields}</>
        // const fieldLength = Object.keys(formData).length;
        // const fields = [];
        // for (let i = 0; i < fieldLength; i++) {
        //     fields.push(
        //     <div className="relative z-0 w-full mb-5 group">
        //         <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        //         <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        //     </div>
        //     );
        // }
    }

    return (
        <>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <AddField />
            </form>
        </>
    )
}