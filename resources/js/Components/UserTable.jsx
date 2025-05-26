import React from 'react';

const UserTable = ({ users }) => {
    return (
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
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{user.role || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;


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
