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
        dob: user.dob || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
        next_of_kin_name: user.next_of_kin_name || "",
        next_of_kin_relationship: user.next_of_kin_relationship || "",
        next_of_kin_phone_number: user.next_of_kin_phone_number || "",
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
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label forInput="dob" value="Date of Birth" />

                            <Input
                                type="date"
                                name="dob"
                                value={data.dob}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label
                                forInput="phone_number"
                                value="Phone Number"
                            />

                            <Input
                                type="tel"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                                placeholder="000-000-0000"
                            />
                        </div>

                        <div>
                            <Label forInput="address" value="Address" />

                            <Input
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label
                                forInput="next_of_kin_name"
                                value="Next of Kin Full Name"
                            />

                            <Input
                                type="text"
                                name="next_of_kin_name"
                                value={data.next_of_kin_name}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label
                                forInput="next_of_kin_relationship"
                                value="Next of Kin Relationship"
                            />

                            <Input
                                type="text"
                                name="next_of_kin_relationship"
                                value={data.next_of_kin_relationship}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label
                                forInput="next_of_kin_phone_number"
                                value="Next of Kin Phone Number"
                            />

                            <Input
                                type="tel"
                                name="next_of_kin_phone_number"
                                value={data.next_of_kin_phone_number}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                                placeholder="000-000-0000"
                            />
                        </div>

                        <Button processing={processing}>Save</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
