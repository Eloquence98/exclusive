import { cloneElement } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { PiHeadsetFill } from "react-icons/pi";
import LayoutPadding from "./LayoutPadding";

const services = [
  {
    icon: <FaShippingFast className="size-6" />,
    heading: "free and fast delivery",
    text: "free delivery for all orders over $140",
  },
  {
    icon: <PiHeadsetFill className="size-6" />,
    heading: "24/7 customer service",
    text: "Friendly 24/7 customer support",
  },
  {
    icon: <BsShieldFillCheck className="size-6" />,
    heading: "money back guarantee",
    text: "We reurn money within 30 days",
  },
];

function OurServices() {
  return (
    <LayoutPadding>
      <div className="our-services flex flex-wrap items-center justify-center gap-5">
        {services.map((service, i) => (
          <ServiceCard service={service} key={i} />
        ))}
      </div>
    </LayoutPadding>
  );
}

export default OurServices;

export function ServiceCard({
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
