const social_links = [
  {
    link: "https://web.facebook.com/profile.php?id=61559403995091",
    target: "_blank",
    icon: "fab fa-facebook-f",
    color: "tp-f-fb",
  },
  {
    link: "https://www.instagram.com/sahulatqurbani//",
    target: "_blank",
    icon: "fab fa-instagram",
    color: "tp-f-instagram",
  }
];

const SocialLinks = () => {
  return (
    <>
      {social_links.map((l, i) => (
        <a
          key={i}
          href={l.link}
          className={l.color}
          target={l.target ? l.target : ""}
        >
          <i className={l.icon}></i>
        </a>
      ))}
    </>
  );
};

export default SocialLinks;
