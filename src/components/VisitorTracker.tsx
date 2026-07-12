'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Invisible component that fires a visitor tracking ping on every page mount.
 * Only tracks public pages — skips /admin routes.
 */
export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin page visits
    if (pathname.startsWith('/admin')) return;

    fetch('/api/visitors/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {
      // Silently ignore — tracking failures should never affect UX
    });
  }, [pathname]);

  return null;
}
