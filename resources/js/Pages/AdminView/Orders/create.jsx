import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Textarea } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
function create({ users }) {
    // Define the initial state of the form
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: "",
        total_amount: "",
        status: "",
    });

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("orders.store"), {
            onSuccess: () => {
                reset();
            },
            preserveState: true,
        });
    };

    // Define the options for the select input
    const options = ["pending", "processing", "completed", "cancelled"]; // Add your options here

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create new order
                </h2>
            }
        >
            <Head title="Create Order" />
            <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-6"
            >
                {/* Select user_id */}
                <div className="mb-4">
                    <label
                        htmlFor="user_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        User_Id
                    </label>
                    <select
                        name="user_id"
                        id="user_id"
                        value={data.user_id}
                        onChange={(e) => setData("user_id", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select a user_id
                        </option>
                        {/* Options list */}
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <option
                                    key={user.id}
                                    value={user.id}
                                    className="bg-white text-gray-900 hover:bg-blue-100"
                                >
                                    {user.name + " - " + user.id}
                                </option>
                            ))
                        ) : (
                            <option disabled value="">
                                No data
                            </option>
                        )}
                    </select>
                    {errors?.user_id && (
                        <span className="text-sm text-red-600">
                            {errors.user_id}
                        </span>
                    )}
                </div>
                {/* Total Amount */}
                <div className="mb-4">
                    <label
                        htmlFor="total_amount"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Total Amount
                    </label>
                    <input
                        type="number"
                        name="total_amount"
                        id="total_amount"
                        value={data.total_amount}
                        onChange={(e) =>
                            setData("total_amount", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    {errors?.total_amount && (
                        <span className="text-sm text-red-600">
                            {errors.total_amount}
                        </span>
                    )}
                </div>

                {/* Select Status */}
                <div className="mb-4">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        value={data.status} // Ensure a default value
                        onChange={(e) => setData("status", e.target.value)} // Keep it as a string
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option
                            value=""
                            disabled
                            default
                            className="bg-white text-gray-900 hover:bg-blue-100"
                        >
                            Chose order status
                        </option>

                        {/* Options list */}
                        {options && options.length > 0 ? (
                            options.map((option, index) => (
                                <option
                                    key={index}
                                    value={option}
                                    className="bg-white text-gray-900 hover:bg-blue-100"
                                >
                                    {option[0].toUpperCase() + option.slice(1)}
                                </option>
                            ))
                        ) : (
                            <option disabled value="">
                                No data
                            </option>
                        )}
                    </select>

                    {errors?.isActive && (
                        <span className="text-sm text-red-600">
                            {errors.isActive}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 w-28 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </form>
        </AuthenticatedLayout>
    );
}

export default create;
