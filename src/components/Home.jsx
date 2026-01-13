import React from "react";
import { fetcher } from "../lib/fetcher";
import useSWR from "swr";
import Error from "./shared/Error";
import Loader from "./shared/Loader";
import { Button, Card, Popconfirm, Tag, Tooltip } from "antd";
import { Edit2, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { httpRequest } from "../lib/http-request";
import { useAuth } from "../zustand/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, error, isLoading } = useSWR("products", fetcher);
  const { user } = useAuth();
  const navigate = useNavigate();

  const addToCart = async (id) => {
    try {
      if (!user || user.role !== "user") {
        navigate("/login");
        return;
      }
      const { data } = await httpRequest.post("/cart", { product: id });
      console.log(data);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (error) return <Error message={error.message} />;

  if (isLoading) return <Loader />;

  return (
    <div className="w-9/12 mx-auto py-16 grid grid-cols-4 gap-4">
      {data.map((product, index) => (
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
          <div className="mt-4 ">
            <Button
              onClick={() => addToCart(product._id)}
              type="primary"
              className="w-full"
              icon={<ShoppingCart className="w-4 h-4" />}>
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
