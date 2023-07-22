'use client';

import NavLink from './navlink';

export default function Navigation({ navLinks }: { navLinks: { name: string, href: string }[] }) {
  return (
    <div className="flex space-x-reverse space-x-4">
      {navLinks.map(link => 
        <NavLink
          key={link.href} 
          href={link.href}
          className={isActive => `inline-block text-gray-900 hover:text-gray-700 py-2 px-6 ${isActive ? 'bg-gray-200' : ''}`}
        >
          {link.name}
        </NavLink>)}
    </div>
  );
}