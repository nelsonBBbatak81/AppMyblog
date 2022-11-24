import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layouts/AdminLayout";
import ListCategory from "@/Components/Category/ListCategory";
import AddCategory from "@/Components/Category/AddCategory";
import EditCategory from "@/Components/Category/EditCategory";
import Spinner from "@/Components/Spinner";
import ShowCategory from "@/Components/Category/ShowCategory";

export default function CategoryAdmin({ categories }) {
    const [isListCategory, setListCategory] = useState(true);
    const [isFormShowCategory, setFormShowCategory] = useState(false);
    const [isFormAddCategory, setFormAddCategory] = useState(false);
    const [isFormEditCategory, setFormEditCategory] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [title, setTitle] = useState("");
    const [meta_info, setMetaInfo] = useState("");
    const [urlimage, setUrlImage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const { errors } = usePage().props;

    const backButton = () => {
        setFormAddCategory(false);
        setFormEditCategory(false);
        setFormShowCategory(false);
        setListCategory(true);
    };

    const handleReset = () => {
        setTitle("");
        setMetaInfo("");
        setUrlImage("");
        setPreviewImage(null);
    };

    const showFormCategory = (data) => {
        setListCategory(false);
        setCategory(data);
        setFormShowCategory(true);
    };

    const showFormAddCategory = () => {
        setListCategory(false);
        setFormAddCategory(true);
    };

    const showFormEditCategory = (data) => {
        setListCategory(false);
        setCategory(data);
        setTitle(data.title);
        setMetaInfo(data.meta_info);
        setPreviewImage(`/storage/category/${data.urlimage}`);
        setFormEditCategory(true);
    };

    const addCategory = async () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("title", title);
        formData.append("meta_info", meta_info);
        formData.append("urlimage", urlimage);
        await Inertia.post("/categories/add", formData, {
            preserveScroll: true,
            onBefore: () => {},
            onStart: (visit) => {},
            onSuccess: (page) => {
                setLoading(false);
                backButton();
            },
            onError: (errors) => {
                console.log(errors);
                setLoading(false);
            },
        });
    };

    const updateCategory = async (id) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("title", title);
        formData.append("meta_info", meta_info);
        formData.append("urlimage", urlimage);
        await Inertia.post(`/categories/update/${id}`, formData, {
            preserveScroll: true,
            onBefore: () => {},
            onStart: (visit) => {},
            onSuccess: (page) => {
                setLoading(false);
                backButton();
            },
            onError: (errors) => {
                console.log(errors);
                setLoading(false);
            },
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (category.hasOwnProperty("id")) {
            updateCategory(category.id);
        } else {
            addCategory();
        }
    };

    return (
        <AdminLayout>
            <Head>
                <title>Category Admin | Blog Nelson BB</title>
                <meta
                    name="description"
                    content="This is page category for admin"
                />
            </Head>

            {/** show spinner loading animation */}
            {isLoading && <Spinner />}

            {/** show form category item */}
            {isFormShowCategory && (
                <ShowCategory category={category} backButton={backButton} />
            )}

            {/* show form add */}
            {isFormAddCategory && (
                <AddCategory
                    backButton={backButton}
                    setMetaInfo={setMetaInfo}
                    setTitle={setTitle}
                    title={title}
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    onSubmit={onSubmit}
                    setUrlImage={setUrlImage}
                    errors={errors}
                />
            )}

            {/** show form edit category */}
            {isFormEditCategory && (
                <EditCategory
                    backButton={backButton}
                    setMetaInfo={setMetaInfo}
                    meta_info={meta_info}
                    setTitle={setTitle}
                    title={title}
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    onSubmit={onSubmit}
                    setUrlImage={setUrlImage}
                    errors={errors}
                />
            )}

            {/* show list category */}
            {isListCategory && (
                <ListCategory
                    categories={categories}
                    showFormCategory={showFormCategory}
                    showFormAddCategory={showFormAddCategory}
                    showFormEditCategory={showFormEditCategory}
                />
            )}
        </AdminLayout>
    );
}
