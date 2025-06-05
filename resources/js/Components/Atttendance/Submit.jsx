import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import Selectbox from "@/Components/SelectBox";
import { useEffect } from "react";

export default function SubmitAttendance() {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            status: "present",
            description: "",
            latitude: null,
            longitude: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("attendance.store"), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Attendance submitted successfully!");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData((prevData) => ({
                        ...prevData,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }));
                },
                (error) => {
                    console.error("Error getting location:", error);
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("Location access denied by user.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            alert("Location request timed out.");
                            break;
                        default:
                            alert("An unknown error occurred.");
                    }
                    setData((prevData) => ({
                        ...prevData,
                        latitude: "0.000000",
                        longitude: "0.000000",
                    }));
                },
                { timeout: 10000 }
            );
        }
    }, []);

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-3 bg-white border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">
                            Submit Attendance
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Please fill in the attendance form below. Ensure all
                            fields are correctly filled before submitting.
                        </p>
                    </div>

                    <div className="p-3 bg-white border-gray-200">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="status"
                                    value="Attendance Status"
                                />
                                <Selectbox
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            status: e.target.value,
                                        })
                                    }
                                    options={[
                                        { value: "present", label: "Hadir" },
                                        { value: "permit", label: "Izin" },
                                        { value: "sick", label: "Sakit" },
                                        { value: "absent", label: "Alfa" },
                                        { value: "late", label: "Terlambat" },
                                        {
                                            value: "bussiness_trip/remote",
                                            label: "Business trip/Remote",
                                        },
                                    ]}
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />

                                <Transition
                                    show={data.status !== "present"}
                                    enter="transition ease-in-out duration-300"
                                    enterFrom="opacity-0 translate-y-2"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in-out duration-300"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-2"
                                >
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />
                                        <TextInput
                                            id="description"
                                            type="text"
                                            name="description"
                                            value={data.description || ""}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    description: e.target.value,
                                                })
                                            }
                                            placeholder="Explain your reason"
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>
                                </Transition>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Submit
                                </PrimaryButton>

                                {/* Transition for Success Message */}
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out duration-300"
                                    enterFrom="opacity-0 translate-y-2"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in-out duration-300"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-2"
                                    className="transition ease-in-out"
                                >
                                    <p className="text-sm text-gray-600">
                                        Attendance submitted successfully.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
