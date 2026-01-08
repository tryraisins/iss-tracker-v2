'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isTrivia = pathname === '/trivia';

    const links = [
        { href: '/', label: 'Observatory' },
        { href: '/trivia', label: 'Mission Quiz' },
    ];

    return (
        <nav
            className="glass-nav"
            style={{
                position: 'fixed',
                top: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999
            }}
        >
            {/* Back Button - shown on trivia page */}
            {isTrivia && (
                <Link href="/" className="nav-back">
                    <span>←</span>
                    <span>Back</span>
                </Link>
            )}

            {/* Brand */}
            <Link href="/" className="nav-brand">
                <span className="nav-brand-marker" />
                <span>ISS Tracker</span>
            </Link>

            {/* Links */}
            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Mobile hamburger */}
            <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
                style={{ marginLeft: 'auto' }}
            >
                <span
                    style={{
                        width: '20px',
                        height: '2px',
                        background: 'var(--text-primary)',
                        transition: 'transform 0.3s',
                        transform: isOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                    }}
                />
                <span
                    style={{
                        width: '20px',
                        height: '2px',
                        background: 'var(--text-primary)',
                        transition: 'opacity 0.3s',
                        opacity: isOpen ? 0 : 1,
                    }}
                />
                <span
                    style={{
                        width: '20px',
                        height: '2px',
                        background: 'var(--text-primary)',
                        transition: 'transform 0.3s',
                        transform: isOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                    }}
                />
            </button>
        </nav>
    );
}
