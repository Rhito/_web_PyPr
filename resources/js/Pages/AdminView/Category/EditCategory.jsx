import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@headlessui/react";

function EditCategory({ category, categories }) {
    console.log(category);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: category.id,
        name: category.name,
        description: category.description ?? "",
        parent_id: category.parent_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("category.update"), data, {
            onSuccess: () => {
                reset();
                alert("Product E successfully!");
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create new category
                </h2>
            }
        >
            <Head title="Create category" />
            {/* Form create category*/}
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
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm forcus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.name && (
                        <span className="text-sm text-red-600">
                            {errors.name}
                        </span>
                    )}
                </div>
                {/* Input desciption */}
                <div className="mb-4">
                    <label
                        htmlFor="desciption"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>
                    <Textarea
                        type="text"
                        id="desciption"
                        placeholder="Desciption..."
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="block w-full min-h-20 mt-1 border-gray-300 rounded-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors?.description && (
                        <span className="text-sm text-red-600">
                            {errors.description}
                        </span>
                    )}
                </div>
                {/* Select parent_id */}
                <div className="mb-4">
                    <label
                        htmlFor="parent_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Parent ID
                    </label>
                    <select
                        name="parent_id"
                        id="parent_id"
                        value={data.parent_id}
                        onChange={(e) => setData("parent_id", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="" default disabled>
                            Select a category
                        </option>
                        {/* render option list */}
                        {categories &&
                            categories?.map((cate) => (
                                <option
                                    key={cate.id}
                                    value={cate.id}
                                    className="bg-white text-gray-900 hover:bg-blue-100"
                                >
                                    {cate.name}
                                </option>
                            ))}
                    </select>
                </div>
                {/* Save button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 w-28 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-offset-2"
                >
                    Save
                </button>
            </form>
        </AuthenticatedLayout>
    );
}

export default EditCategory;
