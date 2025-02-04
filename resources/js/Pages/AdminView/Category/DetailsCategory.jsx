import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import { Edit, Trash2 } from "lucide-react"; // Optional icons

function DetailsCategory({ category }) {
    const { delete: destroy } = useForm({});
    // Handle Delete ⛔
    const handleDelete = (id) => {
        if (confirm("Are you sure want to delete this category?")) {
            destroy(route("category.destroy", id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Category Details
                </h2>
            }
        >
            <Head title="Category Details" />
            <div className="max-w-3xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 space-y-4">
                <div className="grid gird-cols-2 gap-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Category Name:
                        </h3>
                        <p>{category.name}</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="font-semibold text-gray-900">
                            Decription:
                        </h3>
                        <p>{category.description}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Parent Id:
                        </h3>
                        <p>{category.parent_id}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Parent Name:
                        </h3>
                        <p>{category.parent_name}</p>
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
                            }).format(new Date(category.created_at))}
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
                            }).format(new Date(category.updated_at))}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-3 mt-4">
                    <Link
                        href={route("category.edit", { id: category.id })}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <Edit size={16} /> {/* Edit Icon */}
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(category.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    >
                        <Trash2 size={16} /> {/* Delete Icon */}
                        Delete
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default DetailsCategory;
