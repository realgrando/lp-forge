"use client";

import React from "react";

interface ScrollLinkProps {
  to?: string;
  smooth?: boolean;
  duration?: number;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function Link({
  to,
  offset = 0,
  className,
  style,
  children,
  onClick,
}: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    if (!to) return;
    const cleanId = to.replace(/^#/, "");
    const el = document.getElementById(cleanId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <a
      href={to ? `#${to.replace(/^#/, "")}` : "#"}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
