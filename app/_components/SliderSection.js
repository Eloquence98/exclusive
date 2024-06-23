import Countdown from "@/app/_components/CountDown";
import { Inter } from "next/font/google";
import PropTypes from "prop-types";
import Button from "./Button";
import LayoutPadding from "./LayoutPadding";
import Swiper from "./Swiper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function SliderSection({
  subHeading,
  heading,
  countDown,
  navigateButtons,
  sliderProps,
  data,
  render,
}) {
  return (
    <LayoutPadding>
      <section className="mb-15 mt-35">
        <div className="section-stats mb-10 flex min-h-25 gap-22">
          <div className="headings flex flex-col justify-between">
            <h3 className="text-regular relative pl-9 font-semibold leading-9 text-primary">
              <span className="absolute left-0 top-0 inline-block h-full w-5 rounded bg-primary"></span>
              {subHeading}
            </h3>
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
                <Swiper.Prev />
                <Swiper.Next />
              </>
            ) : (
              <Button as="link" href="/">
                View All
              </Button>
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

        {navigateButtons ? (
          <div className="mt-14 inline-flex w-full items-center justify-center">
            <Button as="link" href="/">
              View All Products
            </Button>
          </div>
        ) : null}
      </section>
    </LayoutPadding>
  );
}

SliderSection.defaultProps = {
  subHeading: "Today's",
  heading: "Flash Sales",
  countDown: { isNeeded: false, props: null },
  navigateButtons: false,
  sliderProps: {},
  data: [],
  render: (e) => console.log(e),
};

SliderSection.propTypes = {
  subHeading: PropTypes.string,
  heading: PropTypes.string,
  countDown: PropTypes.shape({
    isNeeded: PropTypes.bool,
    props: PropTypes.object,
  }),
  navigateButtons: PropTypes.bool,
  sliderProps: PropTypes.object,
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

export default SliderSection;
