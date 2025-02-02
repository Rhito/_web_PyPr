import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import { Edit, Trash2 } from "lucide-react"; // Optional icons

function DetailsProduct({ product }) {
    const { delete: destroy } = useForm({});
    // Handle Delete ⛔
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(route("product.destroy", id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Product Details
                </h2>
            }
        >
            <Head title="Product Details" />

            <div className="max-w-3xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-center">
                    {product?.image_url ? (
                        <img
                            src={`../../storage/${product.image_url}`}
                            alt="Product Image"
                            className="w-48 h-48 object-cover rounded-lg shadow-md"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Product ID:
                        </h3>
                        <p>{product.id}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">Name:</h3>
                        <p>{product.name}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">Price:</h3>
                        <p>${product.price}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">Stock:</h3>
                        <p>{product.stock}</p>
                    </div>

                    <div className="col-span-2">
                        <h3 className="font-semibold text-gray-900">
                            Description:
                        </h3>
                        <p className="text-justify">
                            {product.description || "No description provided."}
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
                            }).format(new Date(product.created_at))}
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
                            }).format(new Date(product.updated_at))}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="font-semibold text-gray-900">Status:</h3>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                product.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {product.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <div className="flex space-x-3 mt-4">
                        <Link
                            href={route("product.edit", { id: product.id })}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <Edit size={16} /> {/* Edit Icon */}
                            Edit
                        </Link>

                        <button
                            onClick={() => handleDelete(product.id)}
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

export default DetailsProduct;
