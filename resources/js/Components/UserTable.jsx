import { dangerButtonClassName } from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import PrimaryButton, {
    primaryButtonClassName,
} from "@/Components/PrimaryButton";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import {
    PencilSquareIcon,
    UserPlusIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";

export default function UserTable({ users }) {
    const { data, setData, get } = useForm({ search: "" });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("users"), { preserveState: true });
    };
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <label className="text-base font-bold text-gray-700 tracking-wider">
                    ({users.total}) Users
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
                            placeholder="Search users..."
                            className="px-2 py-1 border border-gray-300 rounded-md text-sm "
                        />
                        <PrimaryButton type="submit">
                            <MagnifyingGlassIcon className="h-3 w-3 text-white" />
                        </PrimaryButton>
                    </form>
                    <Link
                        href={route("users.create")}
                        className={primaryButtonClassName}
                        data-tooltip-id="add-user-tooltip"
                        data-tooltip-content="Add User"
                    >
                        <UserPlusIcon className="h-3 w-3 text-white" />
                    </Link>
                    <Tooltip id="add-user-tooltip" />
                </div>
            </div>

            <table className="min-w-full divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                            &nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.data.map(({ id, name, email, role }) => (
                        <tr key={id}>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                {id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                {name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                {email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                <div>
                                    {role === "admin" ? (
                                        <span className="px-2 py-1 text-sm font-bold text-white bg-red-400 rounded">
                                            Admin
                                        </span>
                                    ) : role === "user" ? (
                                        <span className="px-2 py-1 text-sm font-bold text-white bg-emerald-400 rounded">
                                            User
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-sm font-bold text-gray-700 bg-gray-300 rounded">
                                            {role}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                <Link
                                    href={route("users.edit", id)}
                                    className={dangerButtonClassName}
                                                  data-tooltip-id="edit-user-tooltip"
                        data-tooltip-content="Edit User"
                                >
                                    <PencilSquareIcon className="h-3 w-3 text-white" />
                                </Link>
                                <Tooltip id="edit-user-tooltip" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination links={users.links} total={users.total} />
        </>
    );
}
