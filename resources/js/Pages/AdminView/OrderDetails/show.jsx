import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
function show({ orderDetail }) {
    const { delete: destroy } = useForm({});
    // Handle Delete ⛔
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this order detail?")) {
            destroy(route("order-details.destroy", id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Order Details
                </h2>
            }
        >
            <Head title="Order Details" />
            <div className="max-w-3xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold text-gray-900">ID:</h3>
                        <p>{orderDetail.id}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Order Id:
                        </h3>
                        <p>
                            {orderDetail.order_id +
                                " - " +
                                orderDetail.order.status}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Product:
                        </h3>
                        <p>
                            {orderDetail.product_id +
                                " - " +
                                orderDetail.product.name}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Quantity:
                        </h3>
                        <p>{orderDetail.quantity}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Unit price:
                        </h3>
                        <p>{orderDetail.unit_price}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Total Amount:
                        </h3>
                        <p>{orderDetail.unit_price * orderDetail.quantity}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Created At:
                        </h3>
                        <p>
                            {new Intl.DateTimeFormat("en-UK", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }).format(new Date(orderDetail.created_at))}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Updated At:
                        </h3>
                        <p>
                            {new Intl.DateTimeFormat("en-UK", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }).format(new Date(orderDetail.updated_at))}
                        </p>
                    </div>

                    <div className="flex space-x-3 mt-4">
                        <Link
                            href={route("order-details.edit", {
                                id: orderDetail.id,
                            })}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <Edit size={16} /> {/* Edit Icon */}
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(orderDetail.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        >
                            <Trash2 size={16} /> {/* Delete Icon */}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default show;
