import React, { use, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { ToastContainer, toast } from "react-toastify";
function create({ orders, products, flash }) {
    // Define the initial state of the form
    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: "",
        product_id: "",
        quantity: "",
        unit_price: "",
    });

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("order-details.store"), {
            onSuccess: () => {
                reset();
            },
            preserveState: true,
        });
    };

    // Notification error
    useEffect(() => {
        if (flash?.message?.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-grat-800">
                    Create new order details
                </h2>
            }
        >
            <Head title="Create Order Details" />
            <ToastContainer />
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
                                    {order.id +
                                        " - " +
                                        order.status +
                                        " - " +
                                        order.user.name +
                                        " - " +
                                        order.user.id}
                                </option>
                            ))
                        ) : (
                            <option value="">No order found</option>
                        )}
                    </select>
                    <InputError message={errors.order_id} name="order_id" />
                </div>
                {/* Select product_id */}
                <div className="mb-4">
                    <label
                        htmlFor="product_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Product_Id
                    </label>
                    <select
                        name="product_id"
                        id="product_id"
                        value={data.product_id}
                        onChange={(e) => setData("product_id", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select a product_id
                        </option>
                        {/* Options list */}
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.id + " - " + product.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No product found</option>
                        )}
                    </select>
                    <InputError message={errors.product_id} name="product_id" />
                </div>
                {/* Quantity */}
                <div className="mb-4">
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError message={errors.quantity} name="quantity" />
                </div>
                {/* Unit Price */}
                <div className="mb-4">
                    <label
                        htmlFor="unit_price"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Unit Price
                    </label>
                    <input
                        type="number"
                        name="unit_price"
                        id="unit_price"
                        value={data.unit_price}
                        onChange={(e) => setData("unit_price", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError message={errors.unit_price} name="unit_price" />
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
