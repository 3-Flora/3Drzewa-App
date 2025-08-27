import { useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigationHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyRef = useRef<string[]>([]);

  // Add current location to history when it changes
  const addToHistory = useCallback((path: string) => {
    if (historyRef.current[historyRef.current.length - 1] !== path) {
      historyRef.current.push(path);
    }
  }, []);

  // Get the previous path
  const getPreviousPath = useCallback(() => {
    if (historyRef.current.length > 1) {
      return historyRef.current[historyRef.current.length - 2];
    }
    return '/'; // Default fallback
  }, []);

  // Navigate back to previous page
  const goBack = useCallback(() => {
    const previousPath = getPreviousPath();
    if (previousPath) {
      // Remove current and previous from history
      historyRef.current.pop(); // Remove current
      historyRef.current.pop(); // Remove previous
      navigate(previousPath);
    } else {
      navigate('/');
    }
  }, [navigate, getPreviousPath]);

  // Navigate to a new page and add to history
  const navigateWithHistory = useCallback((path: string) => {
    addToHistory(location.pathname);
    navigate(path);
  }, [navigate, location.pathname, addToHistory]);

  // Initialize history with current location
  if (historyRef.current.length === 0) {
    historyRef.current.push(location.pathname);
  }

  return {
    goBack,
    navigateWithHistory,
    getPreviousPath,
    currentPath: location.pathname,
    history: historyRef.current
  };
};
