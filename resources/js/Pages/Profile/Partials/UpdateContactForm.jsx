import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
function UpdateContactForm({ className = "" }) {
    const addressInput = useRef();
    const phoneInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        addressInput: "",
        phoneInput: "",
    });

    return <div></div>;
}

export default UpdateContactForm;
