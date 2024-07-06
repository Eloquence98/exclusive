"use client";
import SliderSection from "./SliderSection";

function NewArival() {
  return (
    <SliderSection
      subHeading="Featured"
      heading="New Arival"
      data={[{ item: 1, title: "item" }]}
      render={(item) => <h1>Test this one here</h1>}
    />
  );
}

export default NewArival;
