"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeItem, updateQuantity } from "@/redux/slices/cartSlice";

const items = [
  {
    title: "3 pc suite",
    image: "hero-section-img.jpg",
    quantity: 1,
    price: 4000,
  },
];

export default function CustomDrawer({ isOpen, onOpen, onOpenChange, title }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalAmount = cart?.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const router = useRouter();
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };
  return (
    <Drawer size={"lg"} isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex justify-between gap-1 text-black">
              <div>Cart Summary</div>
              <div className="pr-3 text-[15px] font-thin">
                My Items: {cart?.items?.length}
              </div>
            </DrawerHeader>
            <DrawerBody>
              {cart?.items.map((item, index) => (
                <div
                  key={index}
                  className="flex h-36 items-center justify-between rounded border p-4 text-black"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${item?.main_image}`}
                      className="h-[100px] w-[6.25rem] self-center"
                      alt={item.title}
                    />
                    <div className="flex flex-col gap-4">
                      <div>{item?.title}</div>
                      <div>Rs. {item?.price}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.quantity - 1,
                            )
                          }
                          className="rounded border px-2 py-1"
                        >
                          -
                        </button>
                        <div>Quantity: {item?.quantity}</div>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.quantity + 1,
                            )
                          }
                          className="rounded border px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </DrawerBody>
            <DrawerFooter className="items-center justify-between text-black">
              <p className="font-bold">Total: </p>
              <p>Rs. {totalAmount}</p>
              <Button
                className="bg-black text-white"
                onPress={() => router?.push("/checkout")}
              >
                Checkout
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
