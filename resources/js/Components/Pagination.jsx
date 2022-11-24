import React from "react";
import { Link } from "@inertiajs/inertia-react";

function Pagination({ data }) {
    const convertHTMLEntity = (text) => {
        const span = document.createElement("span");

        return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
            span.innerHTML = entity;
            return span.innerText;
        });
    };

    return (
        <nav ariaLabel="Page navigation example">
            <ul class="inline-flex -space-x-px">
                {data.length > 0 &&
                    data.map((item) => (
                        <li>
                            <Link
                                href="item.url"
                                class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {convertHTMLEntity(item.label)}
                            </Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}

export default Pagination;
