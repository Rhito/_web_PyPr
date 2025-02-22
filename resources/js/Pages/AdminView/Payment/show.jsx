import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
function show({ payment }) {
    const { delete: destroy } = useForm({});

    // Handle Delete ⛔
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this payment?")) {
            destroy(route("payments.destroy", id));
        }
    };

    // Select the color of the status
    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "text-green-600";
            case "pending":
                return "text-yellow-600";
            case "failed":
                return "text-red-600";
            default:
                return "text-gray-600"; // default color
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Payments Details
                </h2>
            }
        >
            <Head title="Payments Details" />
            <div className="max-w-3xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold text-gray-900">ID:</h3>
                        <p>{payment.id}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Order Id:
                        </h3>
                        <p>{payment.order_id + " - " + payment.order.status}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Payment Method:
                        </h3>
                        <p>{payment.payment_method}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Payment Status:
                        </h3>
                        <p
                            className={`${getStatusColor(
                                payment.payment_status
                            )}`}
                        >
                            {payment.payment_status}
                        </p>
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
                            }).format(new Date(payment.payment_date))}
                        </p>
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
                            }).format(new Date(payment.created_at))}
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
                            }).format(new Date(payment.updated_at))}
                        </p>
                    </div>

                    <div className="flex space-x-3 mt-4 col-span-2">
                        <Link
                            href={route("payments.edit", {
                                id: payment.id,
                            })}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <Edit size={16} /> {/* Edit Icon */}
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(payment.id)}
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
