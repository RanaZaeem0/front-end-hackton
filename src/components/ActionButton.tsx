import React from "react";
import { FaDownload } from "react-icons/fa6"
import { IoSearch } from "react-icons/io5"

export function ActionButtons() {
  const actions = [
    { label: "Add Beneficiary", icon: "file-text" },
    { label: "Search Beneficiary", icon: "search" },
    { label: "Generate Report", icon: "download" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  {actions.map(({ label, icon }) => (
    <button
      key={label}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-[#54d454] transition-colors"
    >
      {/* Replace Font Awesome with SVGs or custom icons */}
      {icon === "file-text" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 3v12a4 4 0 004 4h4a4 4 0 004-4V3M6 3a4 4 0 014-4h4a4 4 0 014 4M6 3h12"
          />
        </svg>
      )}
      {icon === "search" && (
        <IoSearch />
      )}
      {icon === "download" && (
        <FaDownload />
      )}
      {label}
    </button>
  ))}
</div>

  );
}
