
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; // note: unused with Next.js, included for API compatibility
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, activeClassName, pendingClassName, ...props }, ref) => {
    const pathname = usePathname();
    let isActive = false;

    if (typeof href === "string") {
      // mark active when path matches or is a subpath
      isActive =
        pathname === href ||
        (href !== "/" && pathname?.startsWith(href + "/"));
    }

    return (
      <Link
        href={href}
        ref={ref}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
