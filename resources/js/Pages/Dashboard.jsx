import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SubmitAttendance from "@/Components/Atttendance/Submit";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    errors = {},
    hasAttendedToday,
    success,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {errors?.attendance && (
                        <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded-lg">
                            {errors.attendance[0]}
                        </div>
                    )}

                    {success && (
                        <div className="p-3 mb-3 text-sm text-green-700 bg-green-100 rounded-lg">
                            {success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b text-gray-900 flex items-center justify-between">
                            <span>You're logged in. Hi {auth.user.name}!</span>
                            <span
                                className={`h-4 w-4 rounded-full ${
                                    hasAttendedToday
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            ></span>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SubmitAttendance />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
