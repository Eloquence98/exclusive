"use client";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import Image from "next/image";
import { useState } from "react";
import { HiHeart, HiMinus, HiPlus } from "react-icons/hi2";

export default function ProductDetails({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div
                className="grid grid-cols-4 gap-6"
                aria-orientation="horizontal"
                role="tablist"
              >
                {product.colors.map((color) => (
                  <Button
                    key={color.name}
                    aria-controls={`tabs-${color.name}-panel`}
                    role="tab"
                    onClick={() => setSelectedColor(color)}
                    className={`hover:bg-background relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-foreground focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                      selectedColor.name === color.name
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <span className="sr-only">{color.name}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <Image
                        src={product.images[color.name] || "/placeholder.svg"}
                        alt=""
                        className="h-full w-full object-cover object-center"
                        width={200}
                        height={200}
                      />
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="aspect-h-1 aspect-w-1 w-full">
              <div
                id={`tabs-${selectedColor.name}-panel`}
                aria-labelledby={`tabs-${selectedColor.name}-tab`}
                role="tabpanel"
                tabIndex={0}
              >
                <Image
                  src={product.images[selectedColor.name] || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover object-center sm:rounded-lg"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-foreground">
                ${product.price}
              </p>
            </div>

            {/* Reviews and Stock Status */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={`${
                      product.rating > rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } h-5 w-5 flex-shrink-0`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <Button
                href="#"
                variant="light"
                className="ml-3 text-sm font-medium text-primary"
              >
                {product.reviewCount} reviews
              </Button>
              <Divider orientation="vertical" className="mx-2 h-4" />
              <Chip
                color={product.inStock ? "success" : "danger"}
                variant="flat"
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Chip>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-foreground">{product.description}</p>
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-foreground">Color</h3>
                <RadioGroup
                  orientation="horizontal"
                  value={selectedColor.name}
                  onValueChange={(value) =>
                    setSelectedColor(
                      product.colors.find((c) => c.name === value),
                    )
                  }
                  className="mt-2 gap-3"
                >
                  {product.colors.map((color) => (
                    <Radio
                      key={color.name}
                      value={color.name}
                      className="group p-0"
                      classNames={{
                        base: "m-0",
                        wrapper: "hidden",
                      }}
                    >
                      <div className="relative h-8 w-8 cursor-pointer rounded-full p-0.5">
                        <span
                          className={`block h-full w-full rounded-full ${color.class} shadow-sm group-hover:ring-2 group-hover:ring-primary/50 ${selectedColor.name === color.name ? "ring-2 ring-primary" : "ring-1 ring-gray-200"} `}
                        />
                        <span className="sr-only">{color.name}</span>
                      </div>
                      <span className="mt-1 block text-center text-xs text-gray-600">
                        {color.name}
                      </span>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">Size</h3>
                  <Button
                    href="#"
                    variant="light"
                    className="text-sm font-medium text-primary"
                  >
                    Size guide
                  </Button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      variant={selectedSize === size ? "solid" : "bordered"}
                      onPress={() => setSelectedSize(size)}
                      className={`group relative flex h-10 w-10 items-center justify-center border text-xs font-medium uppercase focus:outline-none ${
                        selectedSize === size
                          ? "bg-primary text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <span>{size}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center">
                <div className="mr-4 flex items-center">
                  <Button
                    size="sm"
                    isIconOnly
                    onPress={decreaseQuantity}
                    variant="bordered"
                  >
                    <HiMinus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="text"
                    value={quantity}
                    readOnly
                    className="mx-2 w-16 appearance-none text-center"
                    style={{ textAlign: "center" }}
                  />
                  <Button
                    size="sm"
                    isIconOnly
                    onPress={increaseQuantity}
                    variant="bordered"
                  >
                    <HiPlus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Buy now button */}
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="flex-1"
                >
                  Buy now
                </Button>

                {/* Updated Add to favorite button */}
                <Button
                  type="button"
                  variant="bordered"
                  size="lg"
                  isIconOnly
                  className="ml-4"
                  aria-label="Add to favorites"
                >
                  <HiHeart className="size-8" />
                </Button>
              </div>
            </form>

            {/* Delivery and return policy */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-foreground">
                Delivery Policy
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Free shipping on orders over $100. Delivery within 3-5 business
                days.
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-foreground">
                Return Policy
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Easy returns within 30 days of purchase. See our full return
                policy for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
