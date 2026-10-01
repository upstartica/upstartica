'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './Navbar.css';

const Navbar = () => {
  const pathname = usePathname();

  // Hide Navbar on learner and mentor dashboard pages
  if (pathname && (pathname.startsWith('/learner') || pathname.startsWith('/mentor') || pathname.startsWith('/mentor-login') || pathname.startsWith('/admin'))) {
    return null;
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-left">
        <Link href="/" className="brand">
          Powerpreneurs
        </Link>
      </div>



      <div className="navbar-right">
        <Link href="/courses" className="nav-link">Courses</Link>
        <Link href="/articles" className="nav-link">Articles</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
        <Link href="/login" className="nav-link">Log in</Link>
        <Link href="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
