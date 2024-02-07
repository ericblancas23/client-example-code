import { Link } from "react-router-dom";
import { Fragment } from "react";

import { Logo } from "../Logo";
import type { HeaderProps } from "./types";

export function Header({ actions, breadcrumbs }: HeaderProps) {
  return (
    <div className="bg-white border-[#D0D0D0] border-[1px] flex flex-wrap p-4 sticky top-0 w-full">
      <Link className="flex-none" to="/portal/dashboard">
        <Logo fill="black" />
      </Link>
      {breadcrumbs?.map(({ label, to }, index) => {
        const props = {
          children: label,
          className: `text-[#525766] text-2xl inter700`,
        };
        return (
          <Fragment key={index}>
            <span className={`mx-4 text-[#525766] text-2xl inter700`}>/</span>
            {to ? <Link {...props} to={to} /> : <div {...props} />}
          </Fragment>
        );
      })}
      <div className="js-header-actions flex flex-grow">
        <div className="flex flex-grow justify-end">{actions}</div>
      </div>
    </div>
  );
}
