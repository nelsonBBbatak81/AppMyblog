import React from "react";
import Pagination from "@/Components/Pagination";

function ListBlog({
    blogs,
    showFormAddBlog,
    showFormItemBlog,
    showFormEditBlog,
    handleDeleteBlog,
    showBlog,
}) {
    return (
        <div className="overflow-x-auto animate__animated animate__fadeInUp">
            <div className="min-w-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full py-4 lg:w-5/6">
                    <h1 className="text-xl font-bold text-center mb-8">
                        List of Blog
                    </h1>
                    <div className="flex flex-row justify-end mb-1">
                        <button
                            onClick={() => showFormAddBlog()}
                            type="button"
                            className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                        >
                            Create Blog
                        </button>
                    </div>
                    <div className="bg-white shadow-md rounded my-2">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">
                                        Figure
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Title
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Meta Info
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {blogs.data.length > 0 &&
                                    blogs.data.map((blog) => (
                                        <tr
                                            key={blog.id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <img
                                                    src={`/storage/blog/${blog.urlimage}`}
                                                    alt="Image Category"
                                                    width={60}
                                                    height={60}
                                                />
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {blog.title}
                                            </td>
                                            <td
                                                className="py-3 px-6 text-center"
                                                dangerouslySetInnerHTML={{
                                                    __html: `${blog.content.substr(
                                                        0,
                                                        60
                                                    )} ...`,
                                                }}
                                            />
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div
                                                        className="w-4 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
                                                        title="Show Blog"
                                                        onClick={() =>
                                                            showBlog(blog.id)
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        className="w-4 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
                                                        title="Edit Blog"
                                                        onClick={() =>
                                                            showFormEditBlog(
                                                                blog.id
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            handleDeleteBlog(
                                                                blog.id
                                                            )
                                                        }
                                                        className="w-4 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <div className="flex flex-row justify-center px-2 py-2">
                            <Pagination data={blogs.links} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListBlog;
