import React from "react";
import { Link } from "@inertiajs/inertia-react";

function NavAdmin() {
    return (
        <div className="flex flex-col justify-start mt-10">
            <Link
                href="/dashboard"
                className="px-2 py-2 w-full no-underline text-md text-white font-bold cursor-default transition-all hover:bg-lime-300 hover:text-black"
            >
                Home
            </Link>
            <Link
                href="/categories"
                className="px-2 py-2 w-full no-underline text-md text-white font-bold cursor-default transition-all hover:bg-lime-300 hover:text-black"
            >
                Category
            </Link>
            <Link
                href="/admin/home"
                className="px-2 py-2 w-full no-underline text-md text-white font-bold cursor-default transition-all hover:bg-lime-300 hover:text-black"
            >
                Tag
            </Link>
            <Link
                href="/blogs"
                className="px-2 py-2 w-full no-underline text-md text-white font-bold cursor-default transition-all hover:bg-lime-300 hover:text-black"
            >
                Blog
            </Link>
        </div>
    );
}

export default NavAdmin;
