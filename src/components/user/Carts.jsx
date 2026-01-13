import { Button, Card } from "antd";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import React from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../lib/fetcher";
import Error from "../shared/Error";
import Loader from "../shared/Loader";
import ButtonGroup from "antd/es/button/button-group";
import { httpRequest } from "../../lib/http-request";
import { toast } from "react-toastify";

const UserCarts = () => {
  const { data, error, isLoading } = useSWR("cart", fetcher);

  console.log(data);

  const handleCart = async (id, qnt) => {
    try {
      const { data } = await httpRequest.put(`/cart/${id}`, { qnt: qnt });
      mutate("cart");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteCart = async (id) => {
    try {
      const { data } = await httpRequest.delete(`/cart/${id}`);
      mutate("cart");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (error) return <Error message={error.message} />;

  if (isLoading) return <Loader />;

  return (
    <div>
      <Card className="shadow-lg">
        <Card.Meta
          title={
            <div className="flex items-center gap-2">
              <ShoppingCart />
              <h1>Shopping Carts</h1>
            </div>
          }
        />

        <div className="mt-8">
          {data.length === 0 && <h1 className="text-center">No Cart Found</h1>}
          {data.map((cart, index) => (
            <Card key={index} className="!mb-4" hoverable>
              <div className="flex justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={
                      cart.product.image || "/images/product-placeholder.webp"
                    }
                    className="w-34 rounded-lg"
                  />
                  <div>
                    <h1 className="capitalize font-semibold text-lg">
                      {cart.product.title}
                    </h1>
                    <p className="text-gray-500">
                      {cart.product.description.slice(0, 100)}...
                    </p>
                    <div className="flex items-center gap-2">
                      <label className="font-medium text-gray-600">
                        ₹
                        {cart.product.price -
                          (cart.product.price * cart.product.discount) / 100}
                      </label>
                      <del className="text-rose-500">{cart.product.price}</del>
                      <label>{cart.product.discount}% off</label>
                    </div>

                    <Button
                      className="mt-6"
                      type="primary"
                      danger
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => deleteCart(cart._id)}>
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="flex items-start">
                  <Card title="Quantity">
                    <ButtonGroup>
                      <Button
                        onClick={() => handleCart(cart._id, cart.qnt - 1)}
                        icon={<Minus className="w-4 h-4" />}
                      />
                      <Button>{cart.qnt}</Button>
                      <Button
                        onClick={() => handleCart(cart._id, cart.qnt + 1)}
                        icon={<Plus className="w-4 h-4" />}
                      />
                    </ButtonGroup>
                  </Card>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserCarts;
