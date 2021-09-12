import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Form/Input";
import Label from "@/Components/Form/Label";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/Form/ValidationErrors";

export default function CreateAppointment({ doctors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        doctor_id: "",
        date: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("appointment.store"));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <ValidationErrors errors={errors} />

            <div>
                <Label forInput="doctor_id" value="Please Select Doctor" />

                <select
                    name="doctor_id"
                    id="doctor_id"
                    className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    onChange={onHandleChange}
                    onBlur={onHandleChange}
                >
                    <option value=""></option>
                    {doctors.map(({ id, name }) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label forInput="date" value="Please Select Appointment Date" />

                <Input
                    type="datetime-local"
                    name="date"
                    value={data.date}
                    className="mt-1 block w-full"
                    handleChange={onHandleChange}
                />
            </div>

            <Button processing={processing}>Make Appointment</Button>
        </form>
    );
}
