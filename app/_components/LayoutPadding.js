import { cloneElement } from "react";

function LayoutPadding({ children }) {
  return cloneElement(children, {
    className: `${
      children.props.className ? children.props.className + " " : ""
    }px-layout md:px-layout-md lg:px-layout-lg`,
  });
}

export default LayoutPadding;
