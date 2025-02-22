import React, { use, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

function create({ orders }) {
    // Define the initial state of the form
    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: "",
        payment_method: "",
        payment_status: "",
    });
    // Define the options for the select input
    const optionsPaymentMethod = ["credit_card", "paypal", "bank_transfer"];
    const optionsPaymentStatus = ["success", "failed", "pending"];

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("payments.store"), {
            onSuccess: () => {
                reset();
            },
            preserveState: true,
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-grat-800">
                    Create new payment
                </h2>
            }
        >
            <Head title="Create payment" />
            <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-6"
            >
                {/* Select order_id */}
                <div className="mb-4">
                    <label
                        htmlFor="order_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Order_Id
                    </label>
                    <select
                        name="order_id"
                        id="order_id"
                        value={data.order_id}
                        onChange={(e) => setData("order_id", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select an order_id
                        </option>
                        {/* Options list */}
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <option key={order.id} value={order.id}>
                                    {order.id + " - " + order.status}
                                </option>
                            ))
                        ) : (
                            <option value="">No order found</option>
                        )}
                    </select>
                    <InputError message={errors.order_id} name="order_id" />
                </div>
                {/* Select payment method */}
                <div className="mb-4">
                    <label
                        htmlFor="payment_method"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Payment Method
                    </label>
                    <select
                        name="payment_method"
                        id="payment_method"
                        value={data.payment_method}
                        onChange={(e) =>
                            setData("payment_method", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select an payment_method
                        </option>
                        {/* Options list */}
                        {optionsPaymentMethod &&
                        optionsPaymentMethod.length > 0 ? (
                            optionsPaymentMethod.map((option, index) => (
                                <option key={index} value={option}>
                                    {option[0].toUpperCase() + option.slice(1)}
                                </option>
                            ))
                        ) : (
                            <option value="">No payment method found</option>
                        )}
                    </select>
                    <InputError
                        message={errors.payment_method}
                        name="payment_method"
                    />
                </div>

                {/* Select payment status */}
                <div className="mb-4">
                    <label
                        htmlFor="payment_status"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Payment Status
                    </label>
                    <select
                        name="payment_status"
                        id="payment_status"
                        value={data.payment_status}
                        onChange={(e) =>
                            setData("payment_status", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select an payment_status
                        </option>
                        {/* Options list */}
                        {optionsPaymentStatus &&
                        optionsPaymentStatus.length > 0 ? (
                            optionsPaymentStatus.map((option, index) => (
                                <option key={index} value={option}>
                                    {option[0].toUpperCase() + option.slice(1)}
                                </option>
                            ))
                        ) : (
                            <option value="">No status found</option>
                        )}
                    </select>
                    <InputError
                        message={errors.payment_status}
                        name="payment_status"
                    />
                </div>

                {/* Submit button */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

export default create;
