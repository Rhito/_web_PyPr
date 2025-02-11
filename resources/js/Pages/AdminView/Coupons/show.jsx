import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
function show({ coupon }) {
    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this coupon?")) {
            destroy(route("coupon.destroy", id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">Coupon</h2>
            }
        >
            <Head title="Coupon Details" />
            <div className="max-w-3xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold text-gray-900">ID:</h3>
                        <p>{coupon.id}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Code:</h3>
                        <p>{coupon.code}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Expiration Date:
                        </h3>
                        <p>{coupon.expiration_date}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Usage Limit:
                        </h3>
                        <p>{coupon.usage_limit}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Discount:
                        </h3>
                        <p>{coupon.discount}</p>
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
                            }).format(new Date(coupon.expiration_date))}
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
                            }).format(new Date(coupon.created_at))}
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
                            }).format(new Date(coupon.updated_at))}
                        </p>
                    </div>
                    <div className="flex space-x-3 mt-4">
                        <Link
                            href={route("coupon.edit", {
                                id: coupon.id,
                            })}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <Edit size={16} /> {/* Edit Icon */}
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(coupon.id)}
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
