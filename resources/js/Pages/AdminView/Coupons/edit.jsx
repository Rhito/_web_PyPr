import React, { use, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
function edit({ coupon }) {
    // Define the innitial state of the form
    const { data, setData, put, processing, errors, reset } = useForm({
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        expiration_date: coupon.expiration_date,
        usage_limit: coupon.usage_limit,
    });

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        put(route("coupon.update", { coupon: data }), {
            onSuccess: () => {
                reset();
            },
            preserveState: true,
        });
    };
    // id code discount expiration_date usage_limit
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-grat-800">
                    Create new coupon
                </h2>
            }
        >
            <Head title="Create coupon" />

            <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-6"
            >
                {/* Input Code */}
                <div className="mb-4">
                    <label
                        htmlFor="code"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.code} />
                </div>

                {/* Input Discound */}
                <div className="mb-4">
                    <label
                        htmlFor="discount"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Discount
                    </label>
                    <input
                        type="number"
                        name="discount"
                        id="discount"
                        value={data.discount}
                        onChange={(e) => setData("discount", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.discount} />
                </div>

                {/* Input Expiration Date */}
                <div className="mb-4">
                    <label
                        htmlFor="expiration_date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Expiration Date
                    </label>
                    <input
                        type="date"
                        name="expiration_date"
                        id="expiration_date"
                        value={data.expiration_date}
                        onChange={(e) =>
                            setData("expiration_date", e.target.value)
                        }
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.expiration_date} />
                </div>

                {/* Input Usage Limit */}
                <div className="mb-4">
                    <label
                        htmlFor="usage_limit"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Usage Limit
                    </label>
                    <input
                        type="number"
                        name="usage_limit"
                        id="usage_limit"
                        value={data.usage_limit}
                        onChange={(e) => setData("usage_limit", e.target.value)}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.usage_limit} />
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

export default edit;
