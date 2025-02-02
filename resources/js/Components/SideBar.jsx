import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars, faFile } from "@fortawesome/free-solid-svg-icons";

function SideBar({ items }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-gray-800 text-white min-h-screen w-64">
            {/* Logo */}
            <div className="flex justify-center mt-4">
                <Link href="/" className="block">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                </Link>
            </div>

            <nav className="mt-4 space-y-2">
                {/* Dashboard */}
                <div>
                    <Link
                        href={route("dashboard")}
                        className="flex items-center px-4 py-2 hover:bg-gray-700 w-full"
                    >
                        <FontAwesomeIcon icon={faHouse} className="me-2" />
                        <p className="hidden lg:block">Dashboard</p>
                    </Link>
                </div>

                {/* Dropdown CRUD */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center px-4 py-2 hover:bg-gray-700 w-full transition-all duration-700"
                    >
                        <FontAwesomeIcon icon={faBars} className="me-2" />
                        <p className="hidden lg:block">CRUD</p>
                        <svg
                            className="-me-0.5 ms-2 h-6 w-6 transition-all duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            style={{
                                transform: isOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                            }}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {isOpen && (
                        <ul
                            className={`bg-gray-800 mt-2 rounded ms-4 overflow-hidden transition-all duration-700 ease-in-out ${
                                isOpen
                                    ? "max-h-[500px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            {items && items.length > 0 ? (
                                items.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={route(
                                                item.label.toLowerCase()
                                            )}
                                            className={`block px-4 py-2 hover:bg-gray-700 whitespace-nowrap ${
                                                route().current(
                                                    item.label.toLowerCase()
                                                )
                                                    ? "border-indigo-400 text-white"
                                                    : "border-transparent text-gray-500"
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="block px-4 py-2 text-gray-400">
                                        No items available
                                    </p>
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Log */}
                <div>
                    <Link
                        href="/log"
                        className="flex items-center px-4 py-2 hover:bg-gray-700 w-full"
                    >
                        <FontAwesomeIcon icon={faFile} className="me-2" />
                        <p className="hidden lg:block">Log</p>
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default SideBar;
