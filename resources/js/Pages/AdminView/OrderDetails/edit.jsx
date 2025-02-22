import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
function edit({ orderDetail, coupons, orders, products }) {
    // Define the initial state of the form
    const { data, setData, put, processing, errors, reset } = useForm({
        id: orderDetail.id,
        order_id: orderDetail.order_id,
        product_id: orderDetail.product_id,
        quantity: orderDetail.quantity,
        coupon_id: orderDetail.coupon_id,
    });

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("order-details.update", { order_detail: data }), {
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
                    Edit order details
                </h2>
            }
        >
            <Head title="Edit Order Details" />
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
                                    {order.id + " - " + order.status}
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
                {/* Select coupon_id */}
                <div className="mb-4">
                    <label
                        htmlFor="coupon_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Coupon Id
                    </label>
                    <select
                        name="coupon_id"
                        id="coupon_id"
                        value={data.coupon_id}
                        onChange={(e) => setData("coupon_id", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default>
                            No coupon
                        </option>
                        {/* Options list */}
                        {coupons && coupons.length > 0 ? (
                            coupons.map((coupon) => (
                                <option key={coupon.id} value={coupon.id}>
                                    {`Id: ${coupon.id} - Code: ${coupon.code} - Limit: ${coupon.usage_limit}`}
                                </option>
                            ))
                        ) : (
                            <option value="">No coupon found</option>
                        )}
                    </select>
                    <InputError message={errors.coupon_id} name="coupon_id" />
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

                {/* Submit button */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

export default edit;
