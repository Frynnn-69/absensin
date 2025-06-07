import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AttendanceTable({ attendances }) {
    const { data, setData, get } = useForm({ search: "" });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("attendance"), { preserveState: true });
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <label className="text-base font-bold text-gray-700 tracking-wider">
                    ({attendances.total}) Attendances
                </label>

                <div className="flex items-center space-x-2">
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center space-x-2"
                    >
                        <input
                            type="text"
                            name="search"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            placeholder="Search attendances..."
                            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                        <PrimaryButton type="submit">
                            <MagnifyingGlassIcon className="h-3 w-3 text-white" />
                        </PrimaryButton>
                    </form>
                </div>
            </div>

            <table className="min-w-full divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Created At
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            User ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {attendances.data.map((attendance) => (
                        <tr key={attendance.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                {attendance.created_at}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                {attendance.user_id}
                            </td>
                            <td
                                className={`px-6 py-4 whitespace-nowrap text-base font-medium ${
                                    attendance.status === "present"
                                        ? "bg-white "
                                        : "bg-red-500 hover:bg-red-600 text-white"
                                }`}
                            >
                                {attendance.user?.name || "N/A"}
                            </td>
                            <td className="whitespace-nowrap text-base text-gray-900 text-center">
                                <div
                                    className={`inline-block h-4 w-4 rounded-full ${
                                        attendance.status === "present"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                ></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                {attendance.description || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination links={attendances.links} total={attendances.total} />
        </>
    );
}
