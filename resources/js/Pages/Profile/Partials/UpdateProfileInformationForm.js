import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Form/Input";
import Label from "@/Components/Form/Label";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/Form/ValidationErrors";

export default function UpdateProfileInformationForm({ user }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        _method: "PUT",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("profile.update"));
    };

    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Personal Information
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Please enter accurate information
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={submit} className="space-y-6">
                        <ValidationErrors errors={errors} />

                        <div>
                            <Label forInput="name" value="Name" />

                            <Input
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label forInput="email" value="Email" />

                            <Input
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <Button processing={processing}>Save</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
