import { useEffect, useCallback } from "react";

export function useHandleClickOutside(ref, callback) {
  // Mémorise la fonction pour éviter les re-rendus inutiles
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleClick = (e) => {
      // Vérifie aussi si l'élément existe et est attaché au DOM
      const clickOutside =
        ref.current &&
        document.contains(ref.current) &&
        !ref.current.contains(e.target);

      if (clickOutside) {
        memoizedCallback();
      }
    };

    // Ajoute l'événement seulement si on a une référence
    if (ref.current) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, memoizedCallback]);
}
