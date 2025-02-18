import LayoutPadding from "./LayoutPadding";

function Hr() {
  return (
    <LayoutPadding>
      <div className="hr">
        <hr className="my-15 h-[0.5px] border-0 bg-border" />
      </div>
    </LayoutPadding>
  );
}

export default Hr;
