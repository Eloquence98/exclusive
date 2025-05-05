import { Button } from "@heroui/button";
import Image from "next/image";

export default function ProductImages({ product, selectedColor, setSelectedColor }) {
  return (
    <div className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
          {product.colors.map((color) => (
            <Button
              key={color.name}
              aria-controls={`tabs-${color.name}-panel`}
              role="tab"
              onClick={() => setSelectedColor(color)}
              className={`hover:bg-background relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-foreground focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                selectedColor.name === color.name ? "ring-2 ring-primary" : ""
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
  );
}
