import { Button } from "@heroui/button";

export default function ProductSizes({ product, selectedSize, setSelectedSize }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Size</h3>
        <Button href="#" variant="light" className="text-sm font-medium text-primary">
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
              selectedSize === size ? "bg-primary text-white" : "bg-white text-black"
            }`}
          >
            <span>{size}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
