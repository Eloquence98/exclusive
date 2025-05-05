import { Radio, RadioGroup } from "@heroui/radio";

export default function ProductColors({
  product,
  selectedColor,
  setSelectedColor,
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">Color</h3>
      <RadioGroup
        orientation="horizontal"
        value={selectedColor.name}
        onValueChange={(value) =>
          setSelectedColor(product.colors.find((c) => c.name === value))
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
  );
}
