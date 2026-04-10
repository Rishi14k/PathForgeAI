
import { useSelector } from "react-redux";
import { startPayment } from "../services/paymentService";

const UpgradeButton = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <button
      onClick={() => startPayment(token)}
      className="bg-violet-600 px-6 py-3 rounded-xl text-white"
    >
      Upgrade to Pro
    </button>
  );
};

export default UpgradeButton;