import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
  Tooltip,
} from "antd";
import { Edit2, Plus, PlusIcon, Search, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { httpRequest } from "../../lib/http-request";

const Products = () => {
  const [open, setOpen] = useState(false);

  const [productForm] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [EditId, setEditId] = useState(null);

  const categories = [
    "Electronics",
    "Fashion & Apparel",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Sports & Outdoors",
    "Toys & Games",
    "Books & Stationery",
    "Groceries & Gourmet Food",
    "Furniture",
    "Automotive",
    "Jewelry & Accessories",
    "Baby & Kids",
    "Pet Supplies",
    "Office Supplies",
    "Digital Products",
    "Software & Subscriptions",
  ];

  const handleClose = () => {
    setEditId(null);
    setOpen(false);
    productForm.resetFields();
  };

  const createProduct = async (values) => {
    try {
      await httpRequest.post("/products", values);
      toast.success("Product created successfully");
      handleClose();
      fetchedProducts();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const fetchedProducts = async () => {
    try {
      const { data } = await httpRequest.get("/products");
      setProducts(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const editProduct = (product) => {
    setEditId(product._id);
    productForm.setFieldsValue(product);
    setOpen(true);
  };

  const updateProduct = async (values) => {
    try {
      await httpRequest.put(`/products/${EditId}`, values);
      toast.success("Product updated successfully");
      setEditId(null);
      handleClose();
      fetchedProducts();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await httpRequest.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchedProducts();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchedProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 flex items-center justify-between">
        <div>
          <Input
            placeholder="Search..."
            className="!w-md"
            suffix={<Search className="size-4 text-gray-400" />}
          />
        </div>
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          className="bg-indigo-500"
          icon={<Plus className="size-4" />}>
          Add New Product
        </Button>
      </div>
      {products.map((product, index) => (
        <Card key={index} hoverable>
          <img
            src="/images/product-placeholder.webp"
            alt={`Product ${index}`}
          />
          <Card.Meta
            title={product.title}
            description={
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-600">
                  ₹{product.price - (product.price * product.discount) / 100}
                </label>
                <del className="text-rose-500">{product.price}</del>
                <label>{product.discount}% off</label>
              </div>
            }
          />
          <Tag className="!mt-2">{product.category}</Tag>
          <div className="mt-4 space-x-2">
            <Tooltip title="Edit Product">
              <Button
                onClick={() => editProduct(product)}
                size="small"
                icon={<Edit2 className="size-3" />}
                type="primary"
                className="bg-indigo-500"
              />
            </Tooltip>
            <Tooltip title="Delete Product">
              <Popconfirm
                title="Are you sure you want to delete this product?"
                onConfirm={() => deleteProduct(product._id)}
                okText="Yes"
                cancelText="No">
                <Button
                  size="small"
                  type="primary"
                  danger
                  icon={<Trash2 className="size-3" />}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        </Card>
      ))}

      <Modal
        centered
        width={600}
        open={open}
        footer={null}
        title="Add New Product"
        onCancel={handleClose}>
        <Divider />
        <Form
          form={productForm}
          layout="vertical"
          onFinish={EditId ? updateProduct : createProduct}>
          <Form.Item
            label={<label>Product Title</label>}
            name="title"
            rules={[{ required: true }]}>
            <Input placeholder="Product Title" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={<label>Price</label>}
              name="price"
              rules={[{ required: true }]}>
              <Input placeholder="00.00" />
            </Form.Item>

            <Form.Item label={<label>Discount</label>} name="discount">
              <Input placeholder="0" />
            </Form.Item>
          </div>

          <Form.Item
            label={<label>Category</label>}
            name="category"
            rules={[{ required: true }]}>
            <Select placeholder="Select Category" showSearch>
              {categories.map((category, index) => (
                <Select.Option value={category} key={index}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<label>Product Description</label>}
            name="description"
            rules={[{ required: true }]}>
            <Input.TextArea placeholder="Product Description" rows={4} />
          </Form.Item>

          <Form.Item>
            {EditId ? (
              <Button
                type="primary"
                className="bg-indigo-500"
                htmlType="submit"
                danger>
                Update
              </Button>
            ) : (
              <Button
                type="primary"
                className="bg-indigo-500"
                htmlType="submit">
                Submit
              </Button>
            )}

            <Button
              onClick={handleClose}
              type="primary"
              className="!ml-2 !bg-gray-100 !hover:bg-gray-200 !text-black !shadow-none">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
