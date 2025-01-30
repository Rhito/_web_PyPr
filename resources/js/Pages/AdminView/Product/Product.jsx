import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
function Product({ products, filters }) {
    const handleDelete = function (id) {};
    const { data, setData, get } = useForm({
        search: filters?.search || "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("product"), { preserveState: true });
    };

    const dataMap =
        products.data && products.data.length > 0 ? (
            products.data.map((product, index) => (
                <tr
                    key={product.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950 text-center h-11 border-b-slate-400"
                >
                    <td>{index + 1}</td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category?.name}</td>
                    <td className="max-w-[150px] truncate overflow-hidden whitespace-nowrap p-3">
                        {product?.image_url && (
                            <img
                                src={`storage/${product.image_url}`}
                                alt="Product Image"
                                className="w-full h-auto"
                                loading="lazy" // Lazy loading enabled
                            />
                        )}
                        {product.image_url ?? "null"}
                    </td>

                    <td className="max-w-[250px] truncate overflow-hidden whitespace-nowrap">
                        {product.description}
                    </td>
                    <td>
                        {product.created_at
                            ? new Intl.DateTimeFormat("en-UK", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                              }).format(new Date(product.created_at))
                            : "null"}
                    </td>
                    <td>
                        {product.updated_at
                            ? new Intl.DateTimeFormat("en-UK", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                              }).format(new Date(product.updated_at))
                            : "null"}
                    </td>

                    <td
                        className={`${
                            product.isActive === "active"
                                ? "text-green-600"
                                : "text-gray-400"
                        }`}
                    >
                        {product.isActive}
                    </td>
                    <td>
                        <Link
                            href={`/edit/${product.id}`}
                            className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link
                            href={`/details/${product.id}`}
                            className="inline-block px-3 me-1 py-1 text-sm font-medium text-white bg-slate-500 rounded hover:bg-slate-600"
                        >
                            Details
                        </Link>
                    </td>
                    <td>
                        <button
                            href={`/delete/${product.id}`}
                            onChange={() => handleDelete(product.id)}
                            className="inline-block px-3 me-1 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr className="text-center">
                <td colSpan={8}>No data</td>
            </tr>
        );

    return (
        <AuthenticatedLayout>
            <Head title="Product" />
            <div className="flex flex-wrap items-center justify-between mt-5 gap-4">
                {/* Button: Add New Product */}
                <Link
                    className="h-[45.6px] px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    href={route("product.create")}
                >
                    Add New Product
                </Link>

                {/* Search Input + Button */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2 w-full sm:w-auto"
                >
                    <input
                        type="text"
                        placeholder="Search by ID or Name"
                        value={data.search}
                        onChange={(e) => setData("search", e.target.value)}
                        className="w-full sm:w-[250px] border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Table Products */}
            <div className="mt-4 p-3 border sm:rounded-lg">
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden group:">
                    <thead>
                        <tr className="text-center border h-11">
                            <th width="5%">#</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category Id</th>
                            <th>Image_url</th>
                            <th>Description</th>
                            <th>Created_at</th>
                            <th>Updated_at</th>
                            <th>Status</th>
                            <th width="5%">Edit</th>
                            <th width="5%">Details</th>
                            <th width="5%">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataMap}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <nav className="text-center mt-2">
                <ul className="flex items-center justify-center space-x-2">
                    {products.links.map((link, index) => {
                        let label = link.label;
                        if (index === 0) {
                            label = "Previous";
                        }
                        if (index === products.links.length - 1) {
                            label = "Next";
                        }
                        return (
                            <li
                                className={`cursor-pointer ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                } rounded-md`}
                                key={label}
                            >
                                <Link
                                    className={`block px-4 py-2 text-sm rounded-md ${
                                        !link.url
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "hover:bg-blue-400 hover:text-white"
                                    }`}
                                    href={link.url || "#"}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </AuthenticatedLayout>
    );
}

export default Product;
