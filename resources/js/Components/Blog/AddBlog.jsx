import React, { useState, useRef, Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
// import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import { WithContext as ReactTags } from "react-tag-input";

// const suggestions = COUNTRIES.map((country) => {
//     return {
//         id: country,
//         text: country,
//     };
// });

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function AddBlog({
    backButton,
    onSubmit,
    errors,
    title,
    setTitle,
    subTitle,
    setSubTitle,
    setCategoryId,
    category_id,
    setMetaInfo,
    setUrlImage,
    setPreviewImage,
    previewImage,
    setContent,
    setTags,
    tags,
    categories,
}) {
    const imageFile = useRef(null);
    const [isUpload, setIsUpload] = useState(false);
    const token = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = (index) => {
        console.log("The tag at index " + index + " was clicked");
    };

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
            <h1 className="text-lg text-center font-bold mb-5">Add Blog ada</h1>
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
                        htmlFor="SubTitle"
                        className="text-md font-bold text-stone-800 mb-1"
                    >
                        Sub Title
                    </label>
                    <input
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        className="w-full text-md px-2 py-2 rounded-md border border-solid border-stone-200 shadow-md transition-all hover:border-stone-400 focus:border-stone-400"
                        placeholder="Fill title category ..."
                    />
                    {errors.subTitle && (
                        <div className="text-red-400">{errors.subTitle}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="Category"
                        className="text-md font-bold text-stone-800 mb-1"
                    >
                        Category
                    </label>
                    <select
                        name=""
                        id=""
                        className="w-full text-md px-2 py-2 rounded-md border border-solid border-stone-200 shadow-md transition-all hover:border-stone-400 focus:border-stone-400"
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="" selected></option>
                        {categories.data.length > 0 &&
                            categories.data.map((category) => (
                                <option value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                    </select>
                    {errors.category_id && (
                        <div className="text-red-400">{errors.category_id}</div>
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
                    ></textarea>

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
                <div className="mb-6">
                    <label
                        htmlFor="Content"
                        className="text-md font-bold text-stone-800 mb-1"
                    >
                        Content
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            ckfinder: {
                                // Upload the images to the server using the CKFinder QuickUpload command.
                                uploadUrl: `/image-upload?_token=${token}`,
                                // Enable the XMLHttpRequest.withCredentials property.
                                withCredentials: true,
                                // Headers sent along with the XMLHttpRequest to the upload server.
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRF-TOKEN": token,
                                },
                            },
                        }}
                        data=""
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                            setContent(data);
                        }}
                        onBlur={(event, editor) => {
                            console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log("Focus.", editor);
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="Tags"
                        className="text-md font-bold text-stone-800 mb-1"
                    >
                        Tags
                    </label>
                    <div className="w-full">
                        <ReactTags
                            tags={tags}
                            // suggestions={suggestions}
                            delimiters={delimiters}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            handleTagClick={handleTagClick}
                            inputFieldPosition="bottom"
                            autocomplete
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white text-md font-bold inline-flex justify-center px-4 py-2 rounded-md shadow-md transition-all hover:bg-blue-800"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default AddBlog;
