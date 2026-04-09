import { motion } from "framer-motion";

function SelectableChip({ label, selected, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-all
      ${selected ? "bg-primary text-white" : "bg-muted"}`}
    >
      {label}
    </motion.button>
  );
}

export default SelectableChip