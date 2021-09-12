import React, { useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Form/Input";
import Label from "@/Components/Form/Label";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/Form/ValidationErrors";

export default function UpdatePasswordForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("current_password", "password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const updatePassword = (e) => {
        e.preventDefault();

        post(route("password.change"));
    };

    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Password Information
                        </h3>
                        <p className="mt-1 text-sm text-gray-600"></p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={updatePassword} className="space-y-6">
                        <ValidationErrors errors={errors} />

                        <div>
                            <Label
                                forInput="current_password"
                                value="Current Password"
                            />

                            <Input
                                type="password"
                                name="current_password"
                                value={data.current_password}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                        </div>

                        <div>
                            <Label forInput="password" value="Password" />

                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                handleChange={onHandleChange}
                            />
                        </div>

                        <div>
                            <Label
                                forInput="password_confirmation"
                                value="Confirm Password"
                            />

                            <Input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                handleChange={onHandleChange}
                            />
                        </div>

                        <Button processing={processing}>Save</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
