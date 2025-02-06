import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { React, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
function index({ orders, filters, flash }) {
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
        if (confirm("Are you sure you want to delete this order?")) {
            destroy(route("orders.destroy", id));
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
        get(route("orders.index"), { preserveState: true });
    };

    // Select the color of the status
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "text-green-600";
            case "pending":
                return "text-yellow-600";
            case "cancelled":
                return "text-red-600";
            default:
                return "text-gray-600"; // default color
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />
            <ToastContainer />
            <div className="flex flex-wrap items-center justify-between mt-5 gap-4">
                {/* Button: Add New order */}
                <Link
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    href={route("orders.create")}
                >
                    Add New Order
                </Link>

                {/* Search Input + Button */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2 w-full sm:w-auto"
                >
                    <input
                        type="text"
                        placeholder="Search by ID or Status"
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
            {/* Table Order */}
            <div className="mt-4 p-3 border sm:rounded-lg">
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden group:">
                    <thead>
                        <tr className="text-center border h-11">
                            <th width="5%">#</th>
                            <th>Id</th>
                            <th>User Id</th>
                            <th>Total Amount</th>
                            <th>Status</th>

                            <th>Created_at</th>
                            <th>Updated_at</th>
                            <th width="5%">Edit</th>
                            {/* <th width="5%">Details</th> */}
                            <th width="5%">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.length > 0 ? (
                            orders.data.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className="odd:bg-white even:bg-gray-50 text-center h-12 border-b hover:bg-gray-100 transition"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{order.id}</td>
                                    <td className="font-medium">
                                        {order.user?.name +
                                            " - " +
                                            order.user?.id}
                                    </td>
                                    <td className="font-medium">
                                        {order.total_amount}
                                    </td>
                                    <td
                                        className={`font-bold ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </td>

                                    <td>
                                        {new Intl.DateTimeFormat("en-UK", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }).format(new Date(order.created_at))}
                                    </td>
                                    <td>
                                        {new Intl.DateTimeFormat("en-UK", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }).format(new Date(order.updated_at))}
                                    </td>

                                    <td>
                                        <Link
                                            href={route("orders.edit", {
                                                id: order.id,
                                            })}
                                            className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    {/* <td>
                                        <Link
                                            href={route("orders.show", {
                                                id: order.id,
                                            })}
                                            className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                                        >
                                            Details
                                        </Link>
                                    </td> */}
                                    <td>
                                        <a
                                            onClick={() =>
                                                handleDelete(order.id)
                                            }
                                            className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="text-center py-4">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <nav className="text-center mt-2">
                <ul className="flex items-center justify-center space-x-2">
                    {orders.links.map((link, index) => {
                        let label = link.label;
                        if (index === 0) {
                            label = "Previous";
                        }
                        if (index === orders.links.length - 1) {
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

export default index;
