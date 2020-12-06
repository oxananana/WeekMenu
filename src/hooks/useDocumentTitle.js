import { useEffect } from "react";

const useDocumentTitle = (title = "WeekMenu — меню на неделю") => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;
