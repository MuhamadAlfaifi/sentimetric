'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children, className, ...rest }: { href: string, className: (isActive: boolean) => string, children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href} className={className(isActive)} {...rest}>
      {children}
    </Link>
  );
}