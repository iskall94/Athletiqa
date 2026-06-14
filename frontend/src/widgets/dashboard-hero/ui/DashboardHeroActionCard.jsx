import { Link } from "react-router-dom";
import { Button } from "../../../shared/ui/button";

export default function DashboardHeroActionCard({
  label,
  href,
  icon: Icon,
  primary = false,
}) {
  return (
    <Link
      to={href}
      className={[`w-[17rem] h-[5.5 rem] relative py-5 px-8 flex flex-col 
      items-center justify-center  rounded-xl border  leading-6
       no-underline transition-colors duration-500 ease-out  `, primary?  "border-primary bg-primary text-bg hover:bg-primary-light hover:text-primary hover:border-transparent": "border-primary bg-bg text-primary  hover:bg-accent hover:border-transparent"
      ].join('')}>
      {Icon && <Icon className="h-5 w-5 shrink-0" />}
      <span className="text-center mt-">{label}</span>
    </Link>
  );
}
