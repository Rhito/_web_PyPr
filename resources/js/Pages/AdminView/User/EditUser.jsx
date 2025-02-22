import { React } from "react";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

function EditUser({ user }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: user.id ?? 0,
        name: user.name ?? "",
        email: user.email ?? "",
        password: user.password ?? "",
        avatar: null,
        phone: user.phone ?? "",
        role: user.role ?? "customer",
        address: user.address ?? "",
        is_active: user.is_active ?? "non-active",
    });

    const handleSubmit = (e) => {
        console.log(data);

        e.preventDefault();

        post(route("user.update"), data, {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => console.error("Errors:", errors),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />
            <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-6"
            >
                {/* Input Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name..."
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.name && (
                        <span className="text-sm text-red-600">
                            {errors.name}
                        </span>
                    )}
                </div>
                {/* Input Image */}
                <div className="mb-4">
                    <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Avatar
                    </label>
                    <div className="relative group flex">
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={(e) =>
                                setData("avatar", e.target.files[0])
                            }
                            className="block w-[50%] text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                        />
                        {data.avatar ? (
                            <img
                                src={URL.createObjectURL(data.avatar)}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-full mb-2"
                            />
                        ) : (
                            user.avatar && (
                                <img
                                    src={`../../storage/${user.avatar}`}
                                    alt="Current Avatar"
                                    className="w-20 h-20 object-cover rounded-full mb-2"
                                />
                            )
                        )}

                        {errors?.avatar && (
                            <span className="text-sm text-red-600">
                                {errors.avatar}
                            </span>
                        )}
                    </div>
                </div>
                {/* Input Email */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <TextInput
                        autoComplete="off"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email..."
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.email && (
                        <span className="text-sm text-red-600">
                            {errors.email}
                        </span>
                    )}
                </div>
                {/* Input Password */}
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <TextInput
                        autoComplete="new-password"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password..."
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.password && (
                        <span className="text-sm text-red-600">
                            {errors.password}
                        </span>
                    )}
                </div>
                {/* Input Phone */}
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Phone
                    </label>
                    <TextInput
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone..."
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.phone && (
                        <span className="text-sm text-red-600">
                            {errors.phone}
                        </span>
                    )}
                </div>
                {/* Input Address */}
                <div className="mb-4">
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Address
                    </label>
                    <TextInput
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address..."
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.address && (
                        <span className="text-sm text-red-600">
                            {errors.address}
                        </span>
                    )}
                </div>
                {/* Select Active or not active */}
                <div className="mb-4">
                    <label
                        htmlFor="is_active"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Status
                    </label>
                    <select
                        name="is_active"
                        id="is_active"
                        value={data.is_active}
                        onChange={(e) => setData("is_active", e.target.value)} // Keep it as a string
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option
                            value=""
                            disabled
                            className="bg-white text-gray-900 hover:bg-blue-100"
                        >
                            Chose active or not
                        </option>
                        <option
                            value="active"
                            className="bg-white text-gray-900 hover:bg-blue-100"
                        >
                            Active
                        </option>
                        <option
                            value="non-active"
                            className="bg-white text-gray-900 hover:bg-blue-100"
                        >
                            Non-active
                        </option>
                    </select>

                    {errors?.is_active && (
                        <span className="text-sm text-red-600">
                            {errors.is_active}
                        </span>
                    )}
                </div>
                {/* Select Role*/}
                <div className="mb-4">
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Role
                    </label>
                    <select
                        name="role"
                        id="role"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)} // Keep it as a string
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option
                            value=""
                            disabled
                            className="bg-white text-gray-900 hover:bg-blue-100"
                        >
                            Chose admin or customer
                        </option>
                        <option
                            value="customer"
                            className="bg-white text-gray-900 hover:bg-blue-100"
                        >
                            Customer
                        </option>
                        <option
                            value="admin"
                            className="bg-white text-gray-900 hover:bg-blue-100"
                        >
                            Admin
                        </option>
                    </select>

                    {errors?.role && (
                        <span className="text-sm text-red-600">
                            {errors.role}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 w-28 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </form>
        </AuthenticatedLayout>
    );
}

export default EditUser;
