import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function AppointmentTable({ appointments }) {
    const cancel = (appointment_id) => {
        Inertia.put(
            route("appointment.cancel", { appointment: appointment_id })
        );
    };

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr>
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
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Cancel</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
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
                        <td className="px-6 py-4 text-right text-sm font-medium">
                            {(appointment.status == "pending" ||
                                appointment.status == "confirmed") && (
                                    <>
                                        <button
                                            onClick={() =>
                                                cancel(appointment.id)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-900 p-1 rounded-md uppercase text-white text-sm font-bold"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
