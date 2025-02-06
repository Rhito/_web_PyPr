import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDownSideBarLink from "./DropDownSideBarLink";
import {
    faHouse,
    faBars,
    faFile,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function SideBar({ navItems }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    return (
        <>
            <button
                className="lg:hidden p-4 text-white bg-gray-800"
                onClick={toggleSidebar}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div
                className={`bg-gray-800 text-white min-h-screen lg:w-64 fixed lg:static transition-transform duration-300 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="flex justify-center mt-4">
                    <Link href="/" className="block">
                        <ApplicationLogo className="w-20 h-auto fill-current text-white" />
                    </Link>
                </div>

                <nav className="mt-4 space-y-2">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center px-4 py-2 hover:bg-gray-700 w-full"
                    >
                        <FontAwesomeIcon icon={faHouse} className="me-2" />
                        <span className="hidden lg:block">Dashboard</span>
                    </Link>

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center px-4 py-2 hover:bg-gray-700 w-full transition duration-300"
                        >
                            <FontAwesomeIcon icon={faBars} className="me-2" />
                            <span className="hidden lg:block">CRUD</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`ms-auto transition-transform duration-300 ${
                                    isOpen ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </button>
                        {isOpen && (
                            <ul className="mt-2 rounded ms-4 overflow-hidden mr-4 ">
                                {navItems.map((item, index) => (
                                    <li key={index} className="mb-1">
                                        <DropDownSideBarLink
                                            href={route(item.route)}
                                            active={route()
                                                .current()
                                                ?.startsWith(item.prefix)}
                                        >
                                            {item.name}
                                        </DropDownSideBarLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Link
                        // href={route("log")}
                        className="flex items-center px-4 py-2 hover:bg-gray-700 w-full transition duration-300"
                    >
                        <FontAwesomeIcon icon={faFile} className="me-2" />
                        <span className="hidden lg:block">Log</span>
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default SideBar;
