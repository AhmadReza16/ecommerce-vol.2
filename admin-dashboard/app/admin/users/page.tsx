import Table from "@/components/Table";

type User = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
};

const users: User[] = [
  { id: 1, username: "admin", email: "admin@test.com", is_staff: true },
  { id: 2, username: "user1", email: "user@test.com", is_staff: false },
];

export default function UsersPage() {
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
