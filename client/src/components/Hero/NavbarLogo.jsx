  import { motion, AnimatePresence } from "framer-motion";
  import { useEffect, useState } from "react";

  import orbitMobile from "../../assets/orbitMobile.png";
  import orbitLogo from "../../assets/orbitLogo.png";

  function NavbarLogo() {
    const [mode, setMode] = useState("orbit");

    // Infinite change
    useEffect(() => {
      const interval = setInterval(() => {
        setMode((prev) => (prev === "orbit" ? "logo" : "orbit"));
      }, 3500);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative flex items-center justify-center h-24 w-[180px] overflow-hidden">

        <AnimatePresence mode="wait">

          {/* ORBIT ICON */}
          {mode === "orbit" && (
            <motion.img
              key="orbit"
              src={orbitMobile}
              alt="Orbit"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 360,
              }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.6 },
                rotate: {
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="absolute h-24 object-contain"
            />
          )}

          {/* FULL LOGO */}
          {mode === "logo" && (
            <motion.img
              key="logo"
              src={orbitLogo}
              alt="SkillOrbit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.8 }}
              className="absolute h-30 object-contain"
            />
          )}

        </AnimatePresence>
      </div>
    );
  }

  export default NavbarLogo