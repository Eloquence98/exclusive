import { useRouter, useSearchParams } from "next/navigation";

export function NavSection({ title, items, activeTab, onTabChange }) {
  return (
    <>
      <h3 className="mb-4 text-base font-medium">{title}</h3>
      <div className="mb-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            className={`block w-full text-left font-normal ${
              activeTab === item.id ? "text-primary" : "text-discount"
            }`}
            onClick={() => onTabChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
