'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  name: string;
  icon: ReactNode;
}

const ActiveLink = ({ href, name, icon }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href}>
      <div
        className={`hover:underline rounded-md transition-opacity underline-offset-4  flex items-center gap-3 ${
          isActive && 'underline '
        }`}
      >
        {icon} <span>{name}</span>
      </div>
    </Link>
  );
};
export default ActiveLink;
