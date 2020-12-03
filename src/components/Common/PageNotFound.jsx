import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const PageNotFound = () => {
  useDocumentTitle("Страница не найдена");

  return <div>Страница не найдена.</div>;
};

export default PageNotFound;
