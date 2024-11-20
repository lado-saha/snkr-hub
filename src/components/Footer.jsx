import { copyrightSign } from "../assets/icons";
import { footerLogo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
  return (
    <footer className="max-container py-12 bg-primary dark:bg-gray-800 p-8">
      <div className="flex justify-between items-start gap-12 flex-wrap max-lg:flex-col">
        {/* Brand Section */}
        <section className="flex flex-col items-start">
          <a href="/" aria-label="Home">
            <img
              src={footerLogo}
              alt="Logo"
              width={150}
              height={46}
              className="m-0"
            />
          </a>
          <p className="mt-6 text-base leading-7 font-montserrat text-gray-600 dark:text-gray-300 sm:max-w-sm">
            Get shoes ready for the new term at your nearest Nike store. Find
            your perfect size in store. Get rewards.
          </p>
          <nav
            className="flex items-center gap-5 mt-8"
            aria-label="Social Media Links"
          >
            {socialMedia.map((icon) => (
              <a
                href={icon.link}
                key={icon.alt}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.alt}
                className="flex justify-center items-center w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform"
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </a>
            ))}
          </nav>
        </section>

        {/* Footer Links */}
        <section className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-montserrat text-lg font-medium mb-6 text-gray-800 dark:text-white">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    key={link.name}
                    className="mt-3 font-montserrat text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      {/* Footer Bottom */}
      <div className="flex justify-between items-center mt-12 max-sm:flex-col gap-4 text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2 font-montserrat">
          <img
            src={copyrightSign}
            alt="Copyright Sign"
            width={20}
            height={20}
            className="rounded-full m-0"
          />
          <p>Copyright © {new Date().getFullYear()}. All rights reserved.</p>
        </div>
        <a
          href="/terms"
          className="font-montserrat text-sm hover:underline hover:text-blue-600 dark:hover:text-blue-400"
        >
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
