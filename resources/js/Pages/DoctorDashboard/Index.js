import React from "react";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import DoctorLayout from "@/Layouts/Doctor";

export default function DoctorDashboard(props) {
    const { user } = props.auth;

    const approve = (appointment_id) => {
        Inertia.put(
            route("appointment.approve", { appointment: appointment_id })
        );
    };

    const decline = (appointment_id) => {
        Inertia.put(
            route("appointment.decline", { appointment: appointment_id })
        );
    };

    return (
        <DoctorLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Patient
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Appointment Doctor
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3"
                                        >
                                            <span className="sr-only">
                                                Cancel
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-50 divide-y divide-gray-200">
                                    {props.appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-6 py-4 text-sm">
                                                {appointment.patient.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {appointment.doctor.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {appointment.date}
                                            </td>
                                            <td className="px-6 py-4 uppercase text-sm">
                                                <span className="bg-gray-200 py-1 px-2 rounded-lg">
                                                    {appointment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                                {appointment.status ==
                                                    "pending" &&
                                                    appointment.doctor_id ==
                                                        user.id && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    approve(
                                                                        appointment.id
                                                                    )
                                                                }
                                                                className="bg-green-600 hover:bg-green-900 p-1 rounded-md uppercase text-white text-sm font-bold"
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    decline(
                                                                        appointment.id
                                                                    )
                                                                }
                                                                className="bg-red-600 hover:bg-red-900 p-1 rounded-md uppercase text-white text-sm font-bold"
                                                            >
                                                                Decline
                                                            </button>
                                                        </>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
}
