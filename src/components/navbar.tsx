"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="font-bold text-xl">
            Better Auth Demo
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Show user email if logged in */}
            {session && (
              <span className="text-sm text-gray-500">
                {session.user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}