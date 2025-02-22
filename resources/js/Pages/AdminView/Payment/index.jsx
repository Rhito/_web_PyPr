import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { React, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
function index({ payments, filters, flash }) {
    // Innitialize useForm
    const {
        data,
        setData,
        get,
        delete: destroy,
    } = useForm({
        search: filters?.search || "",
    });

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

    // Handle Delete ⛔
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this payment?")) {
            destroy(route("payments.destroy", id));
        }
    };

    // Notification
    useEffect(() => {
        if (flash?.message?.success) {
            toast.success(flash.message.success);
        }
        if (flash?.message?.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    // Handle Search 🔍
    const handleSearch = (e) => {
        e.preventDefault();
        get(route("payments.index"), { preserveState: true });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Payments
                </h2>
            }
        >
            <Head title="Payments" />
            <ToastContainer />
            <div className="flex flex-wrap items-center justify-between mt-5 gap-4">
                {/* Button: Add New Payments */}
                <Link
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    href={route("payments.create")}
                >
                    Add New Payments
                </Link>

                {/* Search Input + Button */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2 w-full sm:w-auto"
                >
                    <input
                        type="text"
                        placeholder="Search..."
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
            {/* Table Payments */}
            <div className="mt-4 p-3 border sm:rounded-lg">
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden group:">
                    <thead>
                        <tr className="text-center border h-11">
                            <th width="5%">#</th>
                            <th>Id</th>
                            <th>Order Id</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                            <th>Payment Date</th>
                            <th width="5%">Details</th>
                            <th width="5%">Edit</th>
                            <th width="5%">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.data.length > 0 ? (
                            payments.data.map((payment, index) => (
                                <tr
                                    key={payment.id}
                                    className="odd:bg-white even:bg-gray-50 text-center h-12 borderD-b hover:bg-gray-100 transition"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{payment.id}</td>
                                    <td className="p-3">
                                        {payment.order_id +
                                            " - " +
                                            payment.order.status}
                                    </td>
                                    <td className="p-3">
                                        {payment.payment_method}
                                    </td>
                                    <td
                                        className={`p3 ${getStatusColor(
                                            payment.payment_status
                                        )}`}
                                    >
                                        {payment.payment_status}
                                    </td>
                                    <td className="p-3">
                                        {new Intl.DateTimeFormat("en-UK", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }).format(
                                            new Date(payment.payment_date)
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            href={route("payments.show", {
                                                id: payment.id,
                                            })}
                                            className="px-3 py-1 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            href={route("payments.edit", {
                                                id: payment.id,
                                            })}
                                            className="w-full px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>
                                    </td>

                                    <td>
                                        <a
                                            onClick={() =>
                                                handleDelete(payment.id)
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
                                    No order payment found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <nav className="text-center mt-2">
                <ul className="flex items-center justify-center space-x-2">
                    {payments.links.map((link, index) => {
                        let label = link.label;
                        if (index === 0) {
                            label = "Previous";
                        }
                        if (index === payments.links.length - 1) {
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
