import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavAdmin from "@/Components/NavAdmin";
import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/inertia-react";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <>
            <div className="flex flex-row">
                <div className="px-4 py-8 w-1/6 bg-gray-900">
                    <ApplicationLogo className="w-full h-20 fill-current text-gray-500" />

                    <NavAdmin />
                </div>
                <div className="px-3 py-6 w-full">
                    <div className="flex flex-row justify-end">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {auth.user.name}

                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="font-sans antialiased">{children}</div>
                </div>
            </div>
        </>
    );
}
