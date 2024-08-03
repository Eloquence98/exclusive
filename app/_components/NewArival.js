"use client";
import SliderSection from "./SliderSection";

function NewArival() {
  return (
    <SliderSection
      subHeading="featured"
      heading="new arival"
      data={[{ item: 1, title: "nigga" }]}
      render={(item) => <h1> {item.title} Test this one here</h1>}
    />
  );
}

export default NewArival;
