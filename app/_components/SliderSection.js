import Button from "@/app/_components/Button";
import Countdown from "@/app/_components/CountDown";
import LayoutPadding from "@/app/_components/LayoutPadding";
import Swiper from "@/app/_components/Swiper";
import { Inter } from "next/font/google";
import PropTypes from "prop-types";
import SectionLabel from "./SectionLabel";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function SliderSection({
  className = "",
  subHeading = "Today's",
  heading = "Flash Sales",
  countDown = { isNeeded: false, props: null },
  category = false,
  navigateButtons = false,
  sliderProps = {},
  href = "",
  data = [],
  render = (e) => console.log(e),
}) {
  return (
    <LayoutPadding>
      <div className={`${className} reuse-slider-section`}>
        <div className="section-stats mb-10 flex min-h-25 gap-22">
          <div className="headings flex flex-col justify-between capitalize">
            <SectionLabel> {subHeading} </SectionLabel>
            <h2
              className={`${inter.className} text-nowrap text-4xl font-semibold`}
            >
              {heading}
            </h2>
          </div>
          <div className="mt-auto">
            {countDown.isNeeded ? <Countdown {...countDown.props} /> : null}
          </div>
          <div className="ml-auto mt-auto flex items-center justify-center gap-2">
            {navigateButtons ? (
              <>
                <Swiper.Prev
                  className={`${sliderProps.navigation?.prevEl.replace(".", "")}`}
                />
                <Swiper.Next
                  className={`${sliderProps.navigation?.nextEl.replace(".", "")}`}
                />
              </>
            ) : (
              <DoINeedViewAllButton href={href} />
            )}
          </div>
        </div>

        <div className="section-slider flex gap-7 overflow-x-visible">
          <Swiper
            {...sliderProps}
            className="h-full max-h-full w-full max-w-full"
          >
            {data.map(render)}
          </Swiper>
        </div>

        {!category && navigateButtons ? (
          <div className="mt-14 inline-flex w-full items-center justify-center">
            <Button as="link" href={href}>
              View All Products
            </Button>
          </div>
        ) : null}
      </div>
    </LayoutPadding>
  );
}

SliderSection.propTypes = {
  subHeading: PropTypes.string,
  heading: PropTypes.string,
  href: PropTypes.string,
  countDown: PropTypes.shape({
    isNeeded: PropTypes.bool,
    props: PropTypes.object,
  }),
  category: PropTypes.bool,
  navigateButtons: PropTypes.bool,
  sliderProps: PropTypes.object,
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

export default SliderSection;

function DoINeedViewAllButton({ href }) {
  if (!href) return null;

  return (
    <Button as="link" href={href}>
      View All
    </Button>
  );
}
