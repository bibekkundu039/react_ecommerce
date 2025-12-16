import React, { useEffect, useState } from "react";
import { useAuth } from "../../zustand/useAuth";
import { Select, Table } from "antd";
import { Loader2Icon } from "lucide-react";
import moment from "moment";
import { toast } from "react-toastify";
import { httpRequest } from "../../lib/http-request";

const Customers = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await httpRequest.get("/auth/users");
      setCustomers(data);
      // console.log("Fetched users:", data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const changeRole = async (role, id) => {
    try {
      const { data } = await httpRequest.put(`/auth/users/${id}`, { role });
      fetchUsers();
      toast.success("Role updated successfully");
      console.log(data);
    } catch (err) {
      toast.error("Error updating role");
    }
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex pt-32 justify-center h-screen">
        <Loader2Icon className="animate-spin size-12 text-gray-400" />
      </div>
    );
  }

  console.log("Rendering Customers with data:", customers);

  const columns = [
    {
      title: "SL No.",
      key: "srno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "fullname",
      render: (item) => <h2 className="capitalize">{item.fullname}</h2>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      render: (item) => (
        <Select
          defaultValue={item.role}
          className="w-[100px]"
          onChange={(role) => changeRole(role, item._id)}>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      ),
    },
    {
      title: "Joined At",
      key: "createdAt",
      render: (text) => moment(text.createdAt).format("DD-MM-YYYY, h:mm A"),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={customers} rowKey="_id" />
    </div>
  );
};

export default Customers;
