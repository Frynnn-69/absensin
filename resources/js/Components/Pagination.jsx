import { Link } from "@inertiajs/react";
import he from "he";

export default function Pagination({ links, total, label = "result(s)" }) {
    return (
        links.length > 0 && (
            <nav className="flex items-center justify-between mt-4" aria-label="Pagination">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing of {total} results
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        {links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                                        link.active ? 'bg-slate-500 text-white' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {he.decode(link.label)}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed"
                                >
                                    {he.decode(link.label)}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            </nav>
        )
    );
}
