import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const notifications = [
  {
    id: "notif-001",
    title: "Task completed!",
    body: 'You finished "React Hooks Deep Dive"',
    time: "2m ago",
    read: false,
  },
  {
    id: "notif-002",
    title: "Streak milestone",
    body: "You've maintained a 7-day streak 🔥",
    time: "1h ago",
    read: false,
  },
  {
    id: "notif-003",
    title: "New roadmap ready",
    body: "Your TypeScript roadmap was generated",
    time: "3h ago",
    read: true,
  },
  {
    id: "notif-004",
    title: "Weekly recap",
    body: "You completed 8/12 tasks this week",
    time: "1d ago",
    read: true,
  },
];

const Topbar = ({ pageTitle, onMobileMenuToggle }) => {

  const {user} = useSelector((state)=>state.auth)

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);

  const unreadCount = notifList.filter((n) => !n.read).length;
  const markAllRead = () => {
    setNotifList(notifList.map((n) => ({ ...n, read: true })));
  };

  return (
    <header
      className="flex items-center h-16 px-4 lg:px-8 gap-4 flex-shrink-0 sticky top-0 z-20"
      style={{
        background: "rgba(11, 15, 25, 0.9)",
        borderBottom: "1px solid rgba(45, 55, 72, 0.4)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Mobile menu */}
      <button
        className="lg:hidden p-2 rounded-lg transition-colors"
        style={{ color: "#9CA3AF" }}
        onClick={onMobileMenuToggle}
      >
        <Menu size={20} />
      </button>

      {/* Page Title */}
      <div className="flex-1 min-w-0">
        <h1
          className="text-lg font-semibold truncate"
          style={{ color: "#F9FAFB" }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Search */}
      {/* <div className="relative hidden md:flex items-center">
        {searchOpen ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#6B7280" }}
              />
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search roadmaps, tasks..."
                className="input-field pl-9 pr-4 py-2 text-sm"
                style={{ width: "260px" }}
              />
            </div>

            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchValue("");
              }}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "#9CA3AF" }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200"
            style={{
              background: "rgba(45, 55, 72, 0.3)",
              border: "1px solid rgba(45, 55, 72, 0.5)",
              color: "#6B7280",
            }}
          >
            <Search size={14} />
            <span>Search</span>

            <span
              className="text-xs mono px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(45, 55, 72, 0.5)",
                color: "#4B5563",
                fontSize: "10px",
              }}
            >
              ⌘K
            </span>
          </button>
        )}
      </div> */}

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => {
            setNotifOpen(!notifOpen);
            setUserMenuOpen(false);
          }}
          className="relative p-2 rounded-lg transition-all duration-200"
          style={{
            background: notifOpen
              ? "rgba(124, 58, 237, 0.15)"
              : "rgba(45, 55, 72, 0.3)",
            border: `1px solid ${
              notifOpen ? "rgba(124, 58, 237, 0.4)" : "rgba(45, 55, 72, 0.5)"
            }`,
            color: notifOpen ? "#9F67FF" : "#9CA3AF",
          }}
        >
          <Bell size={18} />

          {unreadCount > 0 && (
            <span
              className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full"
              style={{
                background: "#7C3AED",
                color: "white",
                fontSize: "10px",
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden z-50"
            style={{
              background: "rgba(17, 24, 39, 0.98)",
              border: "1px solid rgba(45, 55, 72, 0.6)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(45, 55, 72, 0.4)" }}
            >
              <span className="font-semibold text-sm text-gray-100">
                Notifications
              </span>

              <button
                onClick={markAllRead}
                className="text-xs font-medium text-violet-500"
              >
                Mark all read
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {notifList.map((notif) => (
                <div
                  key={notif.id}
                  className="flex gap-3 px-4 py-3 cursor-pointer"
                  style={{
                    borderBottom: "1px solid rgba(45, 55, 72, 0.3)",
                    background: notif.read
                      ? "transparent"
                      : "rgba(124, 58, 237, 0.05)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1.5"
                    style={{
                      background: notif.read ? "transparent" : "#7C3AED",
                    }}
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-100">
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-400">{notif.body}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => {
            setUserMenuOpen(!userMenuOpen);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl"
          style={{
            background: userMenuOpen
              ? "rgba(124, 58, 237, 0.1)"
              : "rgba(45, 55, 72, 0.3)",
            border: `1px solid ${
              userMenuOpen ? "rgba(124, 58, 237, 0.3)" : "rgba(45, 55, 72, 0.5)"
            }`,
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #9F67FF)",
              color: "white",
            }}
          >
            {user?.name?.charAt(0) || "SO"}
          </div>

          <span className="text-sm hidden sm:block text-gray-100">
            {user?.name || "Guest"}
          </span>

          <ChevronDown size={14} className="text-gray-400" />
        </button>

        {userMenuOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden z-50"
            style={{
              background: "rgba(17, 24, 39, 0.98)",
              border: "1px solid rgba(45, 55, 72, 0.6)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {[
              { icon: User, label: "Profile" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-violet-500/10 hover:text-white text-gray-400"
              >
                <item.icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}

            <div className="flex items-center gap-3 px-4 py-2.5 cursor-pointer border-t border-gray-700 text-red-500 hover:bg-red-500/10">
              <LogOut size={16} />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
