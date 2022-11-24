import React from "react";

function ShowCategory({ backButton, category }) {
    return (
        <>
            <div className="max-w-md mx-auto py-10">
                <div className="flex flex-row justify-end mb-5">
                    <button
                        onClick={() => backButton()}
                        className="bg-stone-600 text-white text-md font-bold inline-flex justify-center px-4 py-2 rounded-md shadow-md transition-all hover:bg-stone-800"
                    >
                        Back
                    </button>
                </div>
                <div className="w-full flex flex-col rounded-md shadow-md px-3 py-3">
                    <div className="w-full flex flex-row mb-3">
                        <p className="w-1/4 text-md font-bold">Title</p>
                        <p className="w-full text-md">{category.title}</p>
                    </div>
                    <div className="w-full flex flex-row mb-3">
                        <p className="w-1/4 text-md font-bold">Slug</p>
                        <p className="w-full text-md">{category.slug}</p>
                    </div>
                    <div className="w-full flex flex-row mb-3">
                        <p className="w-1/4 text-md font-bold">Meta Info</p>
                        <p className="w-full text-md">{category.meta_info}</p>
                    </div>
                    <div className="w-full flex flex-row mb-3">
                        <p className="w-1/4 text-md font-bold">Figure</p>
                        <p className="w-full text-md">
                            <img
                                src={`/storage/category/${category.urlimage}`}
                                alt=""
                                className="w-full h-40"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowCategory;
