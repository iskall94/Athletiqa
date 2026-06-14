const container = "max-w-[120rem] mx-auto";
import { Link } from "react-router-dom";
//Import svg
import footerScallop from "../../../shared/assets/footer-scallop.svg";

const mainLinks = [
  { label: "Om oss", to: "/about-us" },
  { label: "Kontakta oss", to: "/help" },
  { label: "Integritetspolicy", to: "/integritetspolicy" },
];

const bottomLinks = [
  { label: "Användarvillkor", to: "/anvandarvillkor" },
  { label: "Donationsvillkor", to: "/donationsvillkor" },
  { label: "FAQ", to: "/faq" },
];

function FooterLink({ children, to,small = false }) {
  return (
    <Link
     to={to}
      className={` relative w-fit text-gray-700
        transition-colors duration-500 ease-out hover:text-primary
        after:absolute after:left-0 after:-bottom-1
        after:h-[0.125rem] after:w-full after:origin-center after:scale-x-0
        after:bg-primary after:rounded-full
        after:transition-transform after:duration-500 after:ease-out
        hover:after:scale-x-100
        ${small ? "text-sm md:text-base font-normal leading-4" : "text-base font-medium leading-5"}
      `}
    >
      {children}
    </Link>
    
  );
}

export default function Footer() {
  return (
    <div className="px-3 mt-16 md:mt-[10rem]">
      <footer className="relative bg-accent rounded-b-[1.25rem] md:rounded-b-[1.5rem] mb-3">
        {/*Decorative scallop border above the footer.
           The SVG is used as a repeated background and `background-repeat: round`
           adjusts the repeat count/spacing so the pattern fills the footer width
           without being cut off at the edges. */}
        <div
          aria-hidden="true"
          className="
             absolute left-0 right-0
             -top-[5rem] h-[5.75rem]
             md:-top-[4.25rem] md:h-[5rem]
              xl:-top-[4.25rem] md:h-[6.625rem]
              bg-left-top

               [--scallop-count:3]
               md:[--scallop-count:8]
              xl:[--scallop-count:18]
              "
          style={{
            backgroundImage: `url("${footerScallop}")`,
            backgroundSize: "calc(100% / var(--scallop-count)) 100%",
            backgroundRepeat: "repeat-x",
          }}
        />
        <div
          className={`${container} px-5 pt-3 pb-5 md:px-10 md:py-5 flex flex-col  gap-10 md:gap-7`}
        >
          <div className="flex flex-col-reverse md:flex-row justify-between items-end md:items-start gap-6">
            <h2 className="text-primary text-6xl md:text-8xl font-bold leading-none">
              Athletiqa
            </h2>
            <nav className="flex flex-col items-end gap-4 md:gap-6 font-sans">
              {mainLinks.map((link) => (
                <FooterLink key={link.label} to={link.to}> {link.label}</FooterLink>
              ))}
            </nav>
          </div>
          <div className="bg-bg rounded-2xl p-5 md:px-10 md:py-5 flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-6">
            <span className="text-gray-700 text-sm md:text-base font-medium leading-4 font-heading">
              © Athletiqa 2026
            </span>
            <div className="w-full md:w-auto flex justify-between md:justify-start items-center gap-4 md:gap-6">
              {bottomLinks.map((link) => (
                <FooterLink key={link.label} to={link.to} small>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
