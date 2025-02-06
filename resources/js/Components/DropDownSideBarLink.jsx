import { Link } from "@inertiajs/react";

function DropDownNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`block px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                active
                    ? "bg-gray-600 text-white"
                    : "text-gray-300 hover:bg-gray-600"
            } ${className}`}
        >
            {children}
        </Link>
    );
}

export default DropDownNavLink;
