import React from "react";
import styles from "../Footer/_footer.module.scss";

// Configuration array for links
const links = [
  { href: "#home", text: "destinations" },
  { href: "#contact", text: "contact" },
  { href: "#stories", text: "stories" },
];

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <ul className={styles.banner_text}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
