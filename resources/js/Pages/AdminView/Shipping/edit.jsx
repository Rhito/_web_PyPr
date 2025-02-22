import React, { use, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

function edit({ shipp, orders }) {
    // Define the initial state of the form
    const { data, setData, patch, processing, errors, reset } = useForm({
        id: shipp.id,
        order_id: shipp.order_id,
        shipping_status: shipp.shipping_status,
        shipping_date: shipp.shipping_date,
        shipping_address: shipp.shipping_address,
        contact_phone: shipp.contact_phone,
    });

    // Define the options for the select input
    const optionsShippingStatus = ["shipped", "delivered", "pending"];

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("shipping.update", { shipping: data }), {
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
                    Create new shipping
                </h2>
            }
        >
            <Head title="Create shipping" />
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
                {/* Select shipping status */}
                <div className="mb-4">
                    <label
                        htmlFor="shipping_status"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        shipping Status
                    </label>
                    <select
                        name="shipping_status"
                        id="shipping_status"
                        value={data.shipping_status}
                        onChange={(e) =>
                            setData("shipping_status", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select an shipping status
                        </option>
                        {/* Options list */}
                        {optionsShippingStatus &&
                        optionsShippingStatus.length > 0 ? (
                            optionsShippingStatus.map((option, index) => (
                                <option key={index} value={option}>
                                    {option[0].toUpperCase() + option.slice(1)}
                                </option>
                            ))
                        ) : (
                            <option value="">No status found</option>
                        )}
                    </select>
                    <InputError
                        message={errors.shipping_status}
                        name="shipping_status"
                    />
                </div>
                {/* Shipping date */}
                <div className="mb-4">
                    <label
                        htmlFor="shipping_date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Shipping Date
                    </label>
                    <input
                        type="date"
                        name="shipping_date"
                        id="shipping_date"
                        value={
                            data.shipping_date
                                ? data.shipping_date.split(" ")[0]
                                : ""
                        }
                        onChange={(e) =>
                            setData("shipping_date", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />

                    <InputError
                        message={errors.shipping_date}
                        name="shipping_date"
                    />
                </div>
                {/* Phone contact */}
                <div className="mb-4">
                    <label
                        htmlFor="contact_phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Phone contact
                    </label>
                    <input
                        type="tel"
                        name="contact_phone"
                        id="contact_phone"
                        value={data.contact_phone}
                        onChange={(e) =>
                            setData("contact_phone", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError
                        message={errors.contact_phone}
                        name="contact_phone"
                    />
                </div>
                {/* Shipping address */}
                <div className="mb-4">
                    <label
                        htmlFor="shipping_address"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Shipping address
                    </label>
                    <input
                        type="tel"
                        name="shipping_address"
                        id="shipping_address"
                        value={data.shipping_address}
                        onChange={(e) =>
                            setData("shipping_address", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError
                        message={errors.shipping_address}
                        name="shipping_address"
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

export default edit;
