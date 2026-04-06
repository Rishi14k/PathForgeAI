import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const loading = useSelector((state) => state.ui.globalLoading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
    </div>
  );
};

export default GlobalLoader;