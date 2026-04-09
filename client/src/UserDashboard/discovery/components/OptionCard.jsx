import React from "react";

const OptionCard = ({ label, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer border transition
      ${selected ? "bg-primary/20 border-primary" : "border-border"}
      hover:scale-[1.02]`}
    >
      {label}
    </div>
  );
};

export default OptionCard;
