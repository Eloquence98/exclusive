import { BsShieldFillCheck } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { PiHeadsetFill } from "react-icons/pi";
import InformationCard from "./InformationCard";
import LayoutPadding from "./LayoutPadding";

const defaultInformation = [
  {
    icon: <FaShippingFast />,
    heading: "free and fast delivery",
    text: "free delivery for all orders over $140",
  },
  {
    icon: <PiHeadsetFill />,
    heading: "24/7 customer service",
    text: "Friendly 24/7 customer support",
  },
  {
    icon: <BsShieldFillCheck />,
    heading: "money back guarantee",
    text: "We return money within 30 days",
  },
];

function InformationPanel({ className, information = defaultInformation }) {
  if (!information || information.length === 0) {
    return (
      <LayoutPadding>
        <div className={`${className} guide`}>
          <h3>Developer Guide:</h3>
          <p>
            Please provide an array of information objects as a prop. Each
            object should have the following structure:
          </p>
          <div className="rounded-lg bg-gray-900 p-4 font-mono text-green-400 shadow-lg">
            <pre className="whitespace-pre-wrap text-xs">
              <code>
                {`{
                  icon: <FaShippingFast />,                     // JSX icon component
                  heading: "Title here",                        // Heading text
                  text: "Description here"                      // Description text
                }`}
              </code>
            </pre>
          </div>
        </div>
      </LayoutPadding>
    );
  }

  return (
    <LayoutPadding>
      <div
        className={`${className} our-services flex flex-wrap items-center justify-center gap-5`}
      >
        {information.map((service, i) => (
          <InformationCard service={service} key={i} />
        ))}
      </div>
    </LayoutPadding>
  );
}

export default InformationPanel;
