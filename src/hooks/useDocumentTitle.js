import { useEffect } from "react";

const useDocumentTitle = (title) => {
  const defaultTitle = "WeekMenu — меню на неделю";

  useEffect(() => {
    document.title = title || defaultTitle;
  }, [title]);
};

export default useDocumentTitle;
