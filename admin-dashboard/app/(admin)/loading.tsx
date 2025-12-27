import Loader from "@/components/feedback/Loader";

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader />
    </div>
  );
}
