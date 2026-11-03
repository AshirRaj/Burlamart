import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically scrolls window and layout containers to the very top
 * whenever the user navigates to a new page/route.
 */
export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll primary window to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Also reset scroll for document element and body
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // Reset scroll for internal main layout containers (e.g. vendor or admin panels)
    const scrollContainers = document.querySelectorAll('main, .overflow-y-auto');
    scrollContainers.forEach(container => {
      if (container) {
        container.scrollTop = 0;
      }
    });
  }, [pathname, search]);

  return null;
};

