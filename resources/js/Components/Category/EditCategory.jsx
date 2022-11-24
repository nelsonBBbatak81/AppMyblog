import React, { useState, useRef } from "react";

function EditCategory({
    backButton,
    setPreviewImage,
    previewImage,
    setTitle,
    title,
    setMetaInfo,
    meta_info,
    onSubmit,
    setUrlImage,
    errors,
}) {
    const imageFile = useRef(null);
    const [isUpload, setIsUpload] = useState(false);

    const selectImage = () => {
        imageFile.current.click();
    };

    const pickFile = () => {
        setPreviewImage(null);
        let file = imageFile.current.files;
        console.log(file);
        if (file && file[0]) {
            let reader = new FileReader();
            reader.onloadstart = (e) => {
                console.log("start");
                setIsUpload(true);
            };
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.onloadend = (e) => {
                console.log("end");
                setIsUpload(false);
            };
            reader.readAsDataURL(file[0]);
            setUrlImage(file[0]);
        }
    };

    const styleImagePreview = {
        width: "250px",
        height: "250px",
        display: "block",
        cursor: "pointer",
        margin: "0 auto 30px",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url(${previewImage})`,
    };

    return (
        <div className="py-10 max-w-md mx-auto">
            <div className="w-full flex flex-row justify-end mb-5">
                <button
                    onClick={() => backButton()}
                    className="bg-stone-600 text-white text-md font-bold inline-flex justify-center px-4 py-2 rounded-md shadow-md transition-all hover:bg-stone-800"
                >
                    Back
                </button>
            </div>
            <h1 className="text-lg text-center font-bold mb-5">
                Update Category
            </h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="Title"
                        className="text-md font-bold text-stone-800 mb-1"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-md px-2 py-2 rounded-md border border-solid border-stone-200 shadow-md transition-all hover:border-stone-400 focus:border-stone-400"
                        placeholder="Fill title category ..."
                    />
                    {errors.title && (
                        <div className="text-red-400">{errors.title}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="Meta Info"
                        className="text-md font-bold text-stone-800 mb-1"
                    >
                        Meta Info
                    </label>
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        onChange={(e) => setMetaInfo(e.target.value)}
                        className="w-full text-md px-2 py-2 rounded-md border border-solid border-stone-200 shadow-md transition-all hover:border-stone-400 focus:border-stone-400"
                        placeholder="Fill meta info category .."
                    >
                        {meta_info}
                    </textarea>
                    {errors.meta_info && (
                        <div className="text-red-400">{errors.meta_info}</div>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="Image"
                        className="text-md font-bold text-stone-800 mb-1"
                    >
                        Image
                    </label>
                    <input
                        type="file"
                        ref={imageFile}
                        onInput={() => pickFile()}
                        className="w-full rounded-md border border-solid border-stone-200 shadow-md transition-all hover:border-stone-400 focus:border-stone-400"
                    />
                    {errors.urlimage && (
                        <div className="text-red-400">{errors.urlimage}</div>
                    )}
                    {isUpload && <p>Wait for uploading ...</p>}
                    <div
                        style={previewImage && styleImagePreview}
                        onClick={() => selectImage()}
                    ></div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white text-md font-bold inline-flex justify-center px-4 py-2 rounded-md shadow-md transition-all hover:bg-blue-800"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditCategory;
