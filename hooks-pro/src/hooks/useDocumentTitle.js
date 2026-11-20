
import { useEffect, useRef } from "react";

export function useDocumentTitle(title) {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      document.title = originalTitle.current;
    };
  }, [title]);
}
