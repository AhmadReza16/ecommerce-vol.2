export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
        />
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-slate-900 text-white py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
