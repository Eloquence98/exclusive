import aboutImage from "@/public/mart-production.jpg";
import {
  HiOutlineBuildingStorefront,
  HiOutlineChartBarSquare,
  HiOutlineCurrencyDollar,
  HiOutlineWallet,
} from "react-icons/hi2";
import Heading from "../_components/Heading";
import ImageCssBg from "../_components/ImageCssBg";
import InformationPanel from "../_components/InformationPanel";
import LayoutPadding from "../_components/LayoutPadding";
import OurTeam from "../_components/OurTeam";

export const metadata = {
  title: "About",
};

const services = [
  {
    icon: <HiOutlineBuildingStorefront />,
    heading: "10.5k",
    text: "Sallers active our site",
  },
  {
    icon: <HiOutlineCurrencyDollar />,
    heading: "33k",
    text: "Mopnthly Produduct Sale",
  },
  {
    icon: <HiOutlineWallet />,
    heading: "45.5k",
    text: "Customer active in our site",
  },
  {
    icon: <HiOutlineChartBarSquare />,
    heading: "25k",
    text: "Anual gross sale in our site",
  },
];

function page() {
  return (
    <div className="px-layout md:px-layout-md lg:px-layout-lg">
      <div className="mt-15 space-y-15">
        <div className="grid grid-cols-1 grid-rows-[max-content_15rem] items-center justify-center gap-5 md:grid-cols-[0.8fr_1fr] md:grid-rows-[20rem]">
          <div className="item-1 space-y-2 sm:w-4/5 md:w-[unset]">
            <Heading>Our Story</Heading>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, nesciunt. Soluta, eum laudantium. Iusto nobis
              nostrum laboriosam soluta itaque error! Repudiandae.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              necessitatibus.
            </p>
          </div>
          <div className="relative size-full">
            <ImageCssBg src={aboutImage} alt="About hero image" />
          </div>
        </div>
        <InformationPanel
          information={services}
          className="!px-[unset] md:!px-[unset] lg:!px-[unset]"
        />
        <OurTeam />
        <InformationPanel className="!px-[unset] md:!px-[unset] lg:!px-[unset]" />
      </div>
    </div>
  );
}

export default page;
