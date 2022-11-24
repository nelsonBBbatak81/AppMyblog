import React from "react";

function ShowBlog({ blog, backButton }) {
    return (
        <div className="py-10 max-w-lg mx-auto">
            <div className="w-full flex flex-row justify-end mb-5">
                <button
                    onClick={() => backButton()}
                    className="bg-stone-600 text-white text-md font-bold inline-flex justify-center px-4 py-2 rounded-md shadow-md transition-all hover:bg-stone-800"
                >
                    Back
                </button>
            </div>
            <h1 className="text-lg text-center mb-6">{blog.title}</h1>
            <div className="w-full flex flex-col rounded-md shadow-md px-3 py-3">
                <div className="w-full flex flex-row mb-3">
                    <p className="w-1/4 text-md font-bold">Title</p>
                    <p className="w-full text-md">{blog.title}</p>
                </div>
                <div className="w-full flex flex-row mb-3">
                    <p className="w-1/4 text-md font-bold">Sub Title</p>
                    <p className="w-full text-md">{blog.subtitle}</p>
                </div>
                <div className="w-full flex flex-row mb-3">
                    <p className="w-1/4 text-md font-bold">Slug</p>
                    <p className="w-full text-md">{blog.slug}</p>
                </div>
                <div className="w-full flex flex-row mb-3">
                    <p className="w-1/4 text-md font-bold">Meta Info</p>
                    <p className="w-full text-md">{blog.meta_info}</p>
                </div>
                <div className="w-full flex flex-row mb-3">
                    <p className="w-1/4 text-md font-bold">Content</p>
                    <p
                        className="w-full text-md"
                        dangerouslySetInnerHTML={{
                            __html: `${blog.content.substr(0, 100)} ...`,
                        }}
                    />
                </div>
                <div className="w-full flex flex-row mb-3">
                    <p className="w-1/4 text-md font-bold">Tags</p>
                    <p className="w-full text-md">
                        {blog.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-green-500 tex-white px-2 py-2 rounded-lg"
                            >
                                {tag}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="w-full flex flex-row mb-3">
                    <p className="w-1/4 text-md font-bold">Figure</p>
                    <p className="w-full text-md">
                        <img
                            src={`/storage/blog/${blog.urlimage}`}
                            alt=""
                            className="w-full h-40"
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ShowBlog;
