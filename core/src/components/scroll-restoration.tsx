import React, { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router';

const ScrollRestoration = ({ children }: { children: React.ReactNode }) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      } catch (e) { }
    }, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  return children;
}

export default ScrollRestoration