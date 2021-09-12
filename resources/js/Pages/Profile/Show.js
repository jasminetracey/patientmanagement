import React from "react";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import PatientLayout from "@/Layouts/Patient";
import Button from "@/Components/Button";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";

export default function Profile(props) {
    const destroy = () => {
        if (confirm("Are you sure you want to delete your account?")) {
            Inertia.delete(route("profile.delete"));
        }
    };

    return (
        <PatientLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <UpdateProfileInformationForm user={props.auth.user} />

                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>

                    <UpdatePasswordForm />

                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Delete Account
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Once your account is deleted, all of its
                                        resources and data will be permanently
                                        deleted.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-white uppercase tracking-widest bg-red-600"
                                    onClick={destroy}
                                >
                                    Remove Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
