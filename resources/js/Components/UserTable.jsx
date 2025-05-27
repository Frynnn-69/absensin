import Pagination from "@/Components/Pagination";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function UserTable({ users }) {
    const { data, setData, get } = useForm({ search: "" });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("users"), { preserveState: true });
    };
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-bold text-gray-700 tracking-wider">
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
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-amber-500 "
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700"
                        >
                            Search
                        </button>
                    </form>
                    <Link
                        href={route("users.create")}
                        className="px-4 py-2 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700 "
                    >
                        Add User
                    </Link>
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
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.data.map(({ id, name, email }) => (
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
                                {/* {role || } */ "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination links={users.links} />
        </>
    );
}

// use if need more features like sorting, filtering, etc.
// import React from 'react';
// import { useTable } from '@tanstack/react-table';

// const UserTable = ({ users }) => {
//     const columns = React.useMemo(
//         () => [
//             { Header: 'ID', accessor: 'id' },
//             { Header: 'Name', accessor: 'name' },
//             { Header: 'Email', accessor: 'email' },
//             { Header: 'Role', accessor: 'role' },
//         ],
//         []
//     );

//     const tableInstance = useTable({ columns, data: users });

//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

//     return (
//         <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//                 {headerGroups.map((headerGroup) => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                         {headerGroup.headers.map((column) => (
//                             <th
//                                 {...column.getHeaderProps()}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                             >
//                                 {column.render('Header')}
//                             </th>
//                         ))}
//                     </tr>
//                 ))}
//             </thead>
//             <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
//                 {rows.map((row) => {
//                     prepareRow(row);
//                     return (
//                         <tr {...row.getRowProps()}>
//                             {row.cells.map((cell) => (
//                                 <td
//                                     {...cell.getCellProps()}
//                                     className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
//                                 >
//                                     {cell.render('Cell')}
//                                 </td>
//                             ))}
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// };

// export default UserTable;
