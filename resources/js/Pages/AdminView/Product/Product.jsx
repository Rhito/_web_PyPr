import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { React, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

function Product({ products, filters, flash }) {
    const {
        data,
        setData,
        get,
        delete: destroy,
    } = useForm({
        search: filters?.search || "",
    });
    // Handle Delete ⛔
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(route("product.destroy", id));
        }
    };

    // Notification
    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }
        if (flash.message.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    // Handle Search 🔍
    const handleSearch = (e) => {
        e.preventDefault();
        get(route("product"), { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl">Products</h2>}
        >
            <Head title="Product" />
            <ToastContainer />
            <div className="flex flex-wrap items-center justify-between mt-5 gap-4">
                {/* Button: Add New Product */}
                <Link
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
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
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
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
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category Id</th>
                            <th>Image_url</th>
                            <th>Status</th>
                            <th width="5%">Edit</th>
                            <th width="5%">Details</th>
                            <th width="5%">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.length > 0 ? (
                            products.data.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className="odd:bg-white even:bg-gray-50 text-center h-12 border-b hover:bg-gray-100 transition"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td>{product.id}</td>
                                    <td className="font-medium">
                                        {product.name}
                                    </td>
                                    <td className="font-medium">
                                        {product.price}
                                    </td>
                                    <td className="font-medium">
                                        {product.stock}
                                    </td>
                                    <td>{product.category?.name ?? "N/A"}</td>
                                    <td className="max-w-[150px] truncate p-3">
                                        {product?.image_url ? (
                                            <img
                                                src={`storage/${product.image_url}`}
                                                alt="Product Image"
                                                className="w-20 h-auto m-auto rounded shadow"
                                                loading="lazy"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td
                                        className={`font-bold ${
                                            product.isActive === "active"
                                                ? "text-green-600"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {product.isActive}
                                    </td>
                                    <td>
                                        <Link
                                            href={route("product.details", {
                                                id: product.id,
                                            })}
                                            className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            href={route("product.edit", {
                                                id: product.id,
                                            })}
                                            className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="cursor-pointer px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="text-center py-4">
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
