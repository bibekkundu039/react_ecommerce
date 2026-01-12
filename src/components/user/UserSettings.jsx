import { Button, Card, Form, Input } from "antd";
import { Edit, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import { httpRequest } from "../../lib/http-request";

const UserSettings = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [form] = Form.useForm();

  const { data, error, isLoading } = useSWR("/auth/session", fetcher);

  console.log(data);

  const handleEditable = () => {
    setIsEditable(true);
    toast.info("You can now edit your settings.", { position: "top-center" });
  };

  const updateUser = async (values) => {
    try {
      const { data } = await httpRequest.put("/auth/update", values);
      form.setFieldsValue(data);
      setIsEditable(false);
      toast.success("User updated successfully", { position: "top-center" });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <Card
        title={<h1 className="text-lg font-medium">User Settings</h1>}
        className="shadow"
        extra={
          <Edit
            className="cursor-pointer size-4 hover:scale-120 duration-300 active:scale-80"
            onClick={handleEditable}
          />
        }>
        <Form form={form} className="flex flex-col gap-4" onFinish={updateUser}>
          <div className="grid grid-cols-3 gap-6">
            <Form.Item
              label={
                <label className="text-base font-semi-bold">FullName</label>
              }
              rules={[{ required: true }]}
              name="fullname">
              <Input
                size="large"
                placeholder="Enter your fullname"
                readOnly={!isEditable}
              />
            </Form.Item>
            <Form.Item
              label={<label className="text-base font-semi-bold">Email</label>}
              rules={[{ required: true }]}
              name="email">
              <Input size="large" placeholder="Enter your email" disabled />
            </Form.Item>
            <Form.Item
              label={<label className="text-base font-semi-bold">Mobile</label>}
              rules={[{ required: true }]}
              name="mobile">
              <Input
                size="large"
                placeholder="Enter your Mobile No."
                readOnly={!isEditable}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <label className="text-base font-semi-bold">Street address</label>
            }
            rules={[{ required: true }]}
            name="address">
            <Input
              size="large"
              placeholder="Gali/Moholla/Socity"
              readOnly={!isEditable}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label={<label className="text-base font-semi-bold">City</label>}
              rules={[{ required: true }]}
              name="city">
              <Input size="large" placeholder="City" readOnly={!isEditable} />
            </Form.Item>

            <Form.Item
              label={<label className="text-base font-semi-bold">State</label>}
              rules={[{ required: true }]}
              name="state">
              <Input size="large" placeholder="State" readOnly={!isEditable} />
            </Form.Item>

            <Form.Item
              label={
                <label className="text-base font-semi-bold">Country</label>
              }
              rules={[{ required: true }]}
              name="country">
              <Input
                size="large"
                placeholder="Country"
                readOnly={!isEditable}
              />
            </Form.Item>

            <Form.Item
              label={
                <label className="text-base font-semi-bold">Pin Code</label>
              }
              rules={[{ required: true }]}
              name="pincode">
              <Input
                size="large"
                placeholder="Pin Code"
                readOnly={!isEditable}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={<label className="text-base font-semi-bold">Password</label>}
            name="password">
            <Input.Password
              size="large"
              placeholder="Password"
              readOnly={!isEditable}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              danger
              icon={<Save className="w-4 h-4" />}
              disabled={!isEditable}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserSettings;
