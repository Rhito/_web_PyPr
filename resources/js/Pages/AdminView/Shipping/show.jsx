import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
function show({ shipp }) {
    const { delete: destroy } = useForm({});

    // Handle Delete ⛔
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this shipping?")) {
            destroy(route("payments.destroy", id));
        }
    };
    // Select the color of the status 'pending', 'shipped', 'delivered'
    const getStatusColor = (status) => {
        switch (status) {
            case "shipped":
                return "text-green-600";
            case "pending":
                return "text-yellow-600";
            case "delivered":
                return "text-blue-600";
            default:
                return "text-gray-600"; // default color
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Details Shipping
                </h2>
            }
        >
            <Head title="Details Shipping" />
            <div className="max-w-3xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold text-gray-900">ID:</h3>
                        <p>{shipp.id}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Order Id:
                        </h3>
                        <p>{shipp.order_id + " - " + shipp.order.status}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Shipping Adress:
                        </h3>
                        <p>{shipp.shipping_address}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Shipping Phone:
                        </h3>
                        <p>{shipp.contact_phone}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Shipp Status:
                        </h3>
                        <p
                            className={`${getStatusColor(
                                shipp.shipping_status
                            )}`}
                        >
                            {shipp.shipping_status}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Shipping Date
                        </h3>
                        <p>
                            {new Intl.DateTimeFormat("en-UK", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                            }).format(new Date(shipp.shipping_date))}
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
                            }).format(new Date(shipp.created_at))}
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
                            }).format(new Date(shipp.updated_at))}
                        </p>
                    </div>

                    <div className="flex space-x-3 mt-4 col-span-2">
                        <Link
                            href={route("payments.edit", {
                                id: shipp.id,
                            })}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <Edit size={16} /> {/* Edit Icon */}
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(shipp.id)}
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
