import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";

export default function HomeAdmin() {
    const { auth } = usePage().props;

    return (
        <AdminLayout>
            <Head>
                <title>Home Admin | Blog Nelson BB</title>
                <meta
                    name="description"
                    content="This is page dashboard for admin"
                />
            </Head>

            <p>Welcome {auth.user.email}</p>
        </AdminLayout>
    );
}
