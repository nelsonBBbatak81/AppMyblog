import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { useSnackbar } from "notistack";
import AdminLayout from "@/Layouts/AdminLayout";
import ListBlog from "@/Components/Blog/ListBlog";
import ShowBlog from "@/Components/Blog/ShowBlog";
import AddBlog from "@/Components/Blog/AddBlog";
import EditBlog from "@/Components/Blog/EditBlog";
import Spinner from "@/Components/Spinner";

export default function BlogAdmin({ blogs, categories }) {
    const [isListBlog, setListBlog] = useState(true);
    const [isShowItemBlog, setShowItemBlog] = useState(false);
    const [isShowFormAddBlog, setShowFormAddBlog] = useState(false);
    const [isShowFormEditBlog, setShowFormEditBlog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [blog, setBlog] = useState({});
    const [title, setTitle] = useState(null);
    const [subTitle, setSubTitle] = useState(null);
    const [category_id, setCategoryId] = useState(null);
    const [categoryTitle, setCategoryTitle] = useState(null);
    const [meta_info, setMetaInfo] = useState(null);
    const [urlimage, setUrlImage] = useState(null);
    const [content, setContent] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [tags, setTags] = useState([]);
    const { errors } = usePage().props;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const backButton = () => {
        setShowItemBlog(false);
        setShowFormAddBlog(false);
        setShowFormEditBlog(false);
        setListBlog(true);
        handleReset();
    };

    const handleReset = () => {
        setTitle(null);
        setSubTitle(null);
        setMetaInfo(null);
        setUrlImage(null);
        setContent(null);
        setPreviewImage(null);
        setTags([]);
    };

    const showFormItemBlog = () => {};

    const showFormAddBlog = () => {
        handleReset();
        setListBlog(false);
        setShowFormAddBlog(true);
    };

    const handleShowItemBlog = async (id) => {
        await axios
            .get(`/blogs/show/${id}`)
            .then((res) => {
                console.log(res);
                setListBlog(false);
                setShowItemBlog(true);
                setBlog(res.data.blog);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showFormEditBlog = async (id) => {
        await axios
            .get(`/blogs/show/${id}`)
            .then((res) => {
                console.log(res);
                setListBlog(false);
                setShowFormEditBlog(true);
                setBlog(res.data.blog);
                setTitle(res.data.blog.title);
                setSubTitle(res.data.blog.subtitle);
                setCategoryId(res.data.blog.category_id);
                setCategoryTitle(res.data.blog.category);
                setMetaInfo(res.data.blog.meta_info);
                setUrlImage(res.data.blog.urlimage);
                setContent(res.data.blog.content);
                let tagList = [];
                res.data.blog.tags.map((tag) =>
                    tagList.push({ id: tag, text: tag })
                );
                setTags(tagList);
                setPreviewImage(`/storage/blog/${res.data.blog.urlimage}`);
            })
            .catch((err) => {
                console.log(err);
            });
        // console.log(data);
    };

    const handleAddBlog = async () => {
        closeSnackbar();
        let tagList = [];
        tags.map((tag) => tagList.push(tag.text));
        console.log(tags);
        let formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subTitle);
        formData.append("category_id", category_id);
        formData.append("meta_info", meta_info);
        formData.append("urlimage", urlimage);
        formData.append("content", content);
        formData.append("tags", tagList);
        await Inertia.post("/blogs/add", formData, {
            preserveScroll: true,
            onBefore: () => {},
            onStart: (visit) => {},
            onSuccess: (page) => {
                setLoading(false);
                backButton();
                enqueueSnackbar("Adding blog successfully!", {
                    variant: "success",
                });
            },
            onError: (errors) => {
                console.log(errors);
                setLoading(false);
                enqueueSnackbar("Adding blog failure!", { variant: "error" });
            },
        });
    };

    const handleEditBlog = async (id) => {
        closeSnackbar();
        let tagList = [];
        tags.map((tag) => tagList.push(tag.text));
        console.log(tags);
        let formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subTitle);
        formData.append("category_id", category_id);
        formData.append("meta_info", meta_info);
        formData.append("urlimage", urlimage);
        formData.append("content", content);
        formData.append("tags", tagList);
        await Inertia.post(`/blogs/update/${id}`, formData, {
            preserveScroll: true,
            onBefore: () => {},
            onStart: (visit) => {},
            onSuccess: (page) => {
                setLoading(false);
                backButton();
                enqueueSnackbar("Updating blog successfully!", {
                    variant: "success",
                });
            },
            onError: (errors) => {
                console.log(errors);
                setLoading(false);
                enqueueSnackbar("Updating blog failure!", {
                    variant: "success",
                });
            },
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (blog.hasOwnProperty("id")) {
            handleEditBlog(blog.id);
        } else {
            handleAddBlog();
        }
    };

    const handleDeleteBlog = async (id) => {
        let conf = confirm("Are you sure want to delete this blog ?");
        if (conf) {
            closeSnackbar();
            await Inertia.delete(`/blogs/delete/${id}`, {
                preserveScroll: true,
                onBefore: () => {},
                onStart: (visit) => {},
                onSuccess: (page) => {
                    setLoading(false);
                    enqueueSnackbar("Deleting blog successfully!", {
                        variant: "success",
                    });
                },
                onError: (errors) => {
                    console.log(errors);
                    setLoading(false);
                    enqueueSnackbar("Deleting blog failure!", {
                        variant: "error",
                    });
                },
            });
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

            {/** show item blog */}
            {isShowItemBlog && <ShowBlog blog={blog} backButton={backButton} />}

            {/** show form add blog  */}
            {isShowFormAddBlog && (
                <AddBlog
                    backButton={backButton}
                    onSubmit={onSubmit}
                    title={title}
                    setTitle={setTitle}
                    subTitle={subTitle}
                    setSubTitle={setSubTitle}
                    errors={errors}
                    setMetaInfo={setMetaInfo}
                    setUrlImage={setUrlImage}
                    setPreviewImage={setPreviewImage}
                    previewImage={previewImage}
                    setContent={setContent}
                    setTags={setTags}
                    tags={tags}
                    categories={categories}
                    category_id={category_id}
                    setCategoryId={setCategoryId}
                />
            )}

            {/** show form edit blog */}
            {isShowFormEditBlog && (
                <EditBlog
                    backButton={backButton}
                    onSubmit={onSubmit}
                    title={title}
                    setTitle={setTitle}
                    subTitle={subTitle}
                    setSubTitle={setSubTitle}
                    errors={errors}
                    setMetaInfo={setMetaInfo}
                    meta_info={meta_info}
                    setUrlImage={setUrlImage}
                    setPreviewImage={setPreviewImage}
                    previewImage={previewImage}
                    setContent={setContent}
                    content={content}
                    setTags={setTags}
                    tags={tags}
                    categories={categories}
                    category_id={category_id}
                    categoryTitle={categoryTitle}
                    setCategoryId={setCategoryId}
                />
            )}

            {/** show list blog */}
            {isListBlog && (
                <ListBlog
                    blogs={blogs}
                    showFormItemBlog={showFormItemBlog}
                    showFormAddBlog={showFormAddBlog}
                    showFormEditBlog={showFormEditBlog}
                    handleDeleteBlog={handleDeleteBlog}
                    showBlog={handleShowItemBlog}
                />
            )}
        </AdminLayout>
    );
}
