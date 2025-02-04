import { React } from "react";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Textarea } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

function CreateProduct({ categoryName }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        image_url: "",
        category_id: "",
        stock: "",
        price: "",
        description: "",
        isActive: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("product.create"), data, {
            onSuccess: () => {
                reset();
                alert("Product created successfully!");
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create New Product
                </h2>
            }
        >
            <Head title="Create Product" />

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
                        htmlFor="image_url"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Image
                    </label>
                    <div className="relative group">
                        <input
                            type="file"
                            id="image_url"
                            onChange={(e) =>
                                setData("image_url", e.target.files[0])
                            }
                            className="block w-full text-sm text-gray-500 
                                file:mr-4 file:py-2 file:px-4 
                                file:rounded-full file:border-0 
                                file:text-sm file:font-semibold 
                                file:bg-indigo-100 file:text-indigo-700
                                hover:file:bg-indigo-200 file:focus:border-gray-500"
                        />
                        {errors?.image_url && (
                            <span className="text-sm text-red-600">
                                {errors.image_url}
                            </span>
                        )}
                    </div>
                </div>
                {/* Select category */}
                <div className="mb-4">
                    <label
                        htmlFor="category_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Category
                    </label>
                    <select
                        name="category_id"
                        id="category_id"
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select a category
                        </option>
                        {/* Options list */}
                        {categoryName &&
                            categoryName.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                    className="bg-white text-gray-900 hover:bg-blue-100"
                                >
                                    {category.name}
                                </option>
                            ))}
                    </select>
                    {errors?.category_id && (
                        <span className="text-sm text-red-600">
                            {errors.category_id}
                        </span>
                    )}
                </div>
                {/* Input Stock */}
                <div className="mb-4">
                    <label
                        htmlFor="stock"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Stock
                    </label>
                    <TextInput
                        type="text"
                        id="stock"
                        placeholder="Stock..."
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.stock && (
                        <span className="text-sm text-red-600">
                            {errors.stock}
                        </span>
                    )}
                </div>
                {/* Input Price */}
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Price
                    </label>
                    <TextInput
                        type="number"
                        id="price"
                        placeholder="Price..."
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.price && (
                        <span className="text-sm text-red-600">
                            {errors.price}
                        </span>
                    )}
                </div>
                {/* Select Active or not active */}
                <div className="mb-4">
                    <label
                        htmlFor="isActive"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Status
                    </label>
                    <select
                        name="isActive"
                        id="isActive"
                        value={data.isActive} // Ensure a default value
                        onChange={(e) => setData("isActive", e.target.value)} // Keep it as a string
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option
                            value=""
                            disabled
                            default
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

                    {errors?.isActive && (
                        <span className="text-sm text-red-600">
                            {errors.isActive}
                        </span>
                    )}
                </div>
                {/* Desciption*/}
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>
                    <Textarea
                        type="text"
                        id="description"
                        placeholder="Description..."
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="block w-full min-h-20 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.description && (
                        <span className="text-sm text-red-600">
                            {errors.description}
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

export default CreateProduct;
