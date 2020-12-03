import React from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const CheckPathContainer = (props) => {
  const { controlList, slug, children } = props;
  const currentSlug = useParams()[slug];

  if (controlList[currentSlug]) {
    return children;
  }

  return <PageNotFound />;
};

export default CheckPathContainer;
