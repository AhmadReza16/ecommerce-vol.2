"use client";
import { deleteUser, toggleUserField } from "@/services/users";
import { useEffect, useState } from "react";
import { getUsers } from "@/services/users";
import Table from "@/components/Table";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers(page, search).then((data) => {
      setUsers(data.results);
      setCount(data.count);
    });
  }, [page, search]);

  const totalPages = Math.ceil(count / 10);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {/* Search */}
      <input
        className="border p-2 mb-4 w-64"
        placeholder="Search username or email"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <Table
        data={users}
        columns={[
          { key: "username", label: "Username" },
          { key: "email", label: "Email" },

          {
            key: "is_active",
            label: "Active",
            render: (user) => (
              <button
                onClick={async () => {
                  const res = await toggleUserField(user.id, "is_active");
                  setUsers((prev) =>
                    prev.map((u) => (u.id === user.id ? { ...u, ...res } : u))
                  );
                }}
              >
                {user.is_active ? "Yes" : "No"}
              </button>
            ),
          },

          {
            key: "is_staff",
            label: "Admin",
            render: (user) => (
              <button
                onClick={async () => {
                  const res = await toggleUserField(user.id, "is_staff");
                  setUsers((prev) =>
                    prev.map((u) => (u.id === user.id ? { ...u, ...res } : u))
                  );
                }}
              >
                {user.is_staff ? "Yes" : "No"}
              </button>
            ),
          },

          {
            key: "id",
            label: "Actions",
            render: (user) => (
              <button
                className="text-red-500"
                onClick={async () => {
                  if (confirm("Delete this user?")) {
                    await deleteUser(user.id);
                    setUsers((prev) => prev.filter((u) => u.id !== user.id));
                  }
                }}
              >
                Delete
              </button>
            ),
          },
        ]}
      />

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
