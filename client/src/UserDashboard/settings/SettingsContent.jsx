import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Mail,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function SettingsContent() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    username: "alexj",
    bio: "Full-stack developer learning new skills every day.",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  /* ---------- reusable styles ---------- */

  const sectionCard = (children) => (
    <div
      className="rounded-2xl p-5 lg:p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );

  const sectionTitle = (icon, title, subtitle) => (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: "var(--accent-dim)" }}
      >
        {icon}
      </div>

      <div>
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl text-sm outline-none";

  const inputStyle = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  const labelStyle = {
    color: "var(--text-secondary)",
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: "6px",
    display: "block",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={sectionVariants}>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          Settings
        </h1>

        <p
          className="text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Manage your account preferences
        </p>
      </motion.div>

      {/* ================= PROFILE ================= */}
      <motion.div variants={sectionVariants}>
        {sectionCard(
          <>
            {sectionTitle(
              <User size={16} style={{ color: "var(--accent-light)" }} />,
              "Profile",
              "Update your personal information"
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  className={inputClass}
                  style={inputStyle}
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Username</label>
                <input
                  className={inputClass}
                  style={inputStyle}
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label style={labelStyle}>Email Address</label>

                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-muted)" }}
                  />

                  <input
                    className={inputClass}
                    style={{ ...inputStyle, paddingLeft: "32px" }}
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label style={labelStyle}>Bio</label>

                <textarea
                  rows={3}
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    resize: "none",
                    minHeight: "80px",
                  }}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                />
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* ================= SECURITY ================= */}
      <motion.div variants={sectionVariants}>
        {sectionCard(
          <>
            {sectionTitle(
              <Shield size={16} style={{ color: "var(--accent-light)" }} />,
              "Security",
              "Manage your password"
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Current Password</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={inputClass}
                    style={{ ...inputStyle, paddingRight: "36px" }}
                    placeholder="••••••••"
                  />

                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {showPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>New Password</label>

                <input
                  type="password"
                  className={inputClass}
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              className="mt-4 px-4 py-2 rounded-xl text-sm font-medium"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              Update Password
            </button>
          </>
        )}
      </motion.div>

      {/* ================= SAVE BUTTON ================= */}
      <motion.div
        variants={sectionVariants}
        className="flex justify-end pb-6"
      >
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: saved
              ? "rgba(16,185,129,0.2)"
              : "var(--accent)",
            color: saved ? "var(--success)" : "#fff",
            border: saved
              ? "1px solid rgba(16,185,129,0.3)"
              : "none",
          }}
        >
          {saved ? (
            <>
              <Check size={15} /> Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default SettingsContent;