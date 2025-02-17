import ImageCssBg from "./ImageCssBg";

function OurTeamCard({
  member = {
    image: "image",
    name: "name",
    role: "role",
    links: [{ href: "href", icon: "icon" }],
  },
}) {
  const { image, name, role, links } = member;
  return (
    <div className="member w-full">
      <div className="image image relative h-60 bg-secondary">
        <ImageCssBg alt="Team member avatar" src={image} />
      </div>
      <p className="name text-sm"> {name} </p>
      <p className="role -mt-1 text-sm"> {role} </p>
      <ul className="links inline-flex items-start justify-start gap-2 !text-sm">
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OurTeamCard;
