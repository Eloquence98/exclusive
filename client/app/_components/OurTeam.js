import OurTeamCard from "./OurTeamCard";
import { CiInstagram, CiLinkedin, CiTwitter } from "react-icons/ci";

const teamMembers = [
  {
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    role: "Lead Developer",
    links: [
      {
        href: "https://twitter.com/",
        icon: <CiTwitter />,
      },
      {
        href: "https://www.instagram.com/",
        icon: <CiInstagram />,
      },
      {
        href: "https://www.linkedin.com/",
        icon: <CiLinkedin />,
      },
    ],
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Jane Smith",
    role: "Project Manager",
    links: [
      {
        href: "https://twitter.com/",
        icon: <CiTwitter />,
      },
      {
        href: "https://www.instagram.com/",
        icon: <CiInstagram />,
      },
      {
        href: "https://www.linkedin.com/",
        icon: <CiLinkedin />,
      },
    ],
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Mike Johnson",
    role: "UI/UX Designer",
    links: [
      {
        href: "https://twitter.com/",
        icon: <CiTwitter />,
      },
      {
        href: "https://www.instagram.com/",
        icon: <CiInstagram />,
      },
      {
        href: "https://www.linkedin.com/",
        icon: <CiLinkedin />,
      },
    ],
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Emily Davis",
    role: "Marketing Specialist",
    links: [
      {
        href: "https://twitter.com/",
        icon: <CiTwitter />,
      },
      {
        href: "https://www.instagram.com/",
        icon: <CiInstagram />,
      },
      {
        href: "https://www.linkedin.com/",
        icon: <CiLinkedin />,
      },
    ],
  },
];

function OurTeam() {
  return (
    <div className="our-services grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-start gap-4">
      {teamMembers.map((member, i) => (
        <OurTeamCard member={member} key={i} />
      ))}
    </div>
  );
}

export default OurTeam;
