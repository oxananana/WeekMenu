import { useEffect } from "react";

const useDocumentTitle = (title) => {
  const defaultTitle = "Week Menu";

  useEffect(() => {
    document.title = title || defaultTitle;
  }, [title]);
};

export default useDocumentTitle;
