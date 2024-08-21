import { cloneElement } from "react";

function InformationCard({
  service = { icon: <></>, heading: "heading", text: "text" },
}) {
  const { icon, heading, text } = service;
  return (
    <div className="group flex min-w-max flex-1 flex-col items-center justify-center gap-1 rounded-md border border-border p-4 transition-colors duration-300 hover:bg-primary">
      <div className="group-hover:text-black: text- mb-2 rounded-full border-[10px] border-border bg-black p-5 text-white group-hover:bg-white group-hover:text-black">
        {cloneElement(icon, { className: "size-9" })}
      </div>
      <h2 className="text-xl font-semibold uppercase group-hover:text-white">
        {" "}
        {heading}{" "}
      </h2>
      <p className="capitalize group-hover:text-white"> {text} </p>
    </div>
  );
}

export default InformationCard;
