import React from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop(): void {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
}
