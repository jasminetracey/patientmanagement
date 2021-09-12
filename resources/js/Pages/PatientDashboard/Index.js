import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import PatientLayout from "@/Layouts/Patient";
import CreateAppointment from "./Partials/CreateAppointment";
import AppointmentTable from "./Partials/AppointmentTable";

export default function PatientDashboard(props) {
    const { doctors, appointments } = props;

    return (
        <PatientLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-bold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid lg:grid-cols-3 gap-4">
                <div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="font-semibold mb-6">
                                Create Appointment
                            </h3>

                            <CreateAppointment doctors={doctors} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="font-semibold mb-6">Appointments</h3>
                            <AppointmentTable appointments={appointments} />
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
