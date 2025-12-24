import { apiFetch } from "@/lib/api";
import Table from "@/components/Table";

type User = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
};

export default async function UsersPage() {
  let users: User[] = [];

  try {
    users = await apiFetch<User[]>("/users/");
  } catch (error) {
    return <div className="text-red-600">Failed to load users</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "username", label: "Username" },
          { key: "email", label: "Email" },
          { key: "is_staff", label: "Admin" },
        ]}
        data={users}
      />
    </div>
  );
}
