import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h2>Users</h2>

      {users.map((u) => (
        <div key={u._id}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;