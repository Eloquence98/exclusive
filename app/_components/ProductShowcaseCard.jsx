import ImageCssBg from "./ImageCssBg";
import StyledLink from "./StyledLink";

const ProductShowcaseCard = ({ className, product }) => {
  const { title, description, id, image } = product;
  return (
    <div className={`${className} group relative overflow-hidden`}>
      <ImageCssBg className="transition-transform duration-500 group-hover:scale-105" src={image} />
      <div
        className="content textShadow-sm absolute bottom-8 left-8 text-white"
        // style={{ textShadow: "#FC0 1px 0 10px" }}
        style={{
          textShadow:
            "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="text-2xl"> {title} </h2>
        <p className="text-xl"> {description} </p>
        <StyledLink item={{ href: `products/${id}`, name: "Shop Now" }} />
      </div>
    </div>
  );
};

export default ProductShowcaseCard;
