import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import ContactForm from "@/components/ContactForm";
import HeadingSmall from "@/components/HeadingSmall";
import LayoutPadding from "@/components/LayoutPadding";
import StyledIcon from "@/components/StyledIcon";

export const metadata = {
  title: "Contact",
};
function page() {
  return (
    <LayoutPadding>
      <div className="mt-15 grid grid-cols-1 grid-rows-[max-content_1fr] lg:grid-cols-[20rem_1fr] lg:grid-rows-1">
        <div className="detail grid grid-cols-[unset] grid-rows-[max-content_max-content] gap-y-6 p-6 shadow-sm md:grid-cols-2 md:grid-rows-[unset] md:gap-x-6 md:gap-y-0 lg:block lg:space-y-6">
          <div className="call min-w-min space-y-3">
            <StyledIcon className="mr-3 inline-flex">
              <HiOutlinePhone className="size-6" />
            </StyledIcon>
            <HeadingSmall className="inline-flex">Call to us</HeadingSmall>
            <p>We are available 24 hours a day, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <div className="email min-w-min space-y-3">
            <StyledIcon className="mr-3 inline-flex">
              <HiOutlineEnvelope className="size-6" />
            </StyledIcon>
            <HeadingSmall className="inline-flex">Write to us</HeadingSmall>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: customer@exclusive.com</p>
          </div>
        </div>

        <ContactForm className="form p-6 shadow-sm" />
      </div>
    </LayoutPadding>
  );
}

export default page;
