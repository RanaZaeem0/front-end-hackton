import { NavLink } from "react-router-dom";

export function Sidebar() {
  const menuItems = [
    { to: "/", icon: "home", label: "Dashboard" },
    { to: "/beneficiaries", icon: "users", label: "Beneficiaries" },
    // { to: "/incident", icon: "exclamation-circle", label: "Incident" },
    // { to: "/history", icon: "history", label: "Export History" },
    // { to: "/programs", icon: "layout", label: "Programs" },
    // { to: "/users", icon: "users", label: "Users" },
  ];

  return (
    <aside className="hidden lg:block bg-gradient-to-b bg-green-500 text-white p-6">
  <div className="mb-8">
    <h2 className="text-2xl font-bold">Admin</h2>
  </div>
  <nav className="space-y-4">
    {menuItems.map(({ to, icon, label }) => (
      <NavLink
        key={label}
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive ? "bg-white/10" : "hover:bg-white/10"
          }`
        }
      >
        <i className={`fa fa-${icon} w-5 h-5`} />
        {label}
      </NavLink>
    ))}
  </nav>
</aside>
  );
}
