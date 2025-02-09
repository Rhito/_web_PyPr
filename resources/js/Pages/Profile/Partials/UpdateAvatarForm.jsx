import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

function UpdateAvatarForm({ user }) {
    const [preview, setPreview] = useState(
        `storage/${user.avatar}` || `storage/default-avatar.png`
    );

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        avatar: null,
    });

    // Handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData("avatar", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!data.avatar) {
            alert("Please, Chose your image!");
            return;
        }
        // Post data
        post(
            route("profile.avatar.update"),
            { avatar: data },
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                },
                onError: () => alert("Error!"),
            }
        );
    };

    return (
        <div className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Avatar
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's avatar.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="flex items-center space-x-4">
                    <img
                        src={preview}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 w-2/4"
                    />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>

                <InputError message={errors?.avatar} className="mt-2" />

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}

export default UpdateAvatarForm;
