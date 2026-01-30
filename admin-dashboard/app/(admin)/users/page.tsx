"use client";

import { useEffect, useState } from "react";

import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import SearchInput from "@/components/table/SearchInput";
import Loader from "@/components/feedback/Loader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { usersService } from "@/services/users.service";
import { User } from "@/types/user";
import { useConfirm } from "@/hooks/useConfirm";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const { confirm } = useConfirm();
  const pageSize = 10;

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await usersService.getUsers({ page, search });
      setUsers(res.results);
      setTotal(res.count);
    } catch (err) {
      console.error("Error retrieving users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (user: User) => {
    try {
      await usersService.toggleActive(user.id);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: !u.is_active } : u,
        ),
      );
    } catch {
      console.error("Error changing user status");
    }
  };

  const handleToggleStaff = async (user: User) => {
    try {
      await usersService.toggleStaff(user.id);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_staff: !u.is_staff } : u,
        ),
      );
    } catch {
      console.error("Error changing user role");
    }
  };

  const handleDelete = async (user: User) => {
    const ok = await confirm({
      title: "Delete user",
      message: `Are you sure you want to delete ${user.username}?`,
      confirmText: "delete",
    });

    if (!ok) return;

    try {
      await usersService.deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch {
      console.error("Error deleting user");
    }
  };

  const columns: Array<{
    key: string;
    label: string;
    render?: (value: any, row?: any) => React.ReactNode;
  }> = [
    { key: "id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    {
      key: "last_login",
      label: "Last Login",
      render: (value: string | null) =>
        value ? new Date(value).toLocaleDateString() : "Never",
    },
    {
      key: "date_joined",
      label: "Joined",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "is_active",
      label: "Status",
      render: (value: boolean) =>
        value ? (
          <Badge color="green">Active</Badge>
        ) : (
          <Badge color="red">Inactive</Badge>
        ),
    },
    {
      key: "is_staff",
      label: "Role",
      render: (value: boolean) =>
        value ? (
          <Badge color="blue">Admin</Badge>
        ) : (
          <Badge color="gray">User</Badge>
        ),
    },
    {
      key: "actions",
      label: "Operation",
      render: (_: any, row: User) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleToggleActive(row)}
          >
            {row.is_active ? "Inactive" : "Active"}
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() => handleToggleStaff(row)}
          >
            {row.is_staff ? "user" : "admin"}
          </Button>

          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
            delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">users</h1>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by username or email..."
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            columns={columns as any}
            data={users}
            keyExtractor={(item: User) => item.id}
          />

          <Pagination
            currentPage={page}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
