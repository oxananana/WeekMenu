import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Portal = (props) => {
  const portalElemRef = useRef(document.createElement("div"));

  useEffect(() => {
    const portalElem = portalElemRef.current;
    document.body.appendChild(portalElem);
    return () => {
      portalElem.remove();
    };
  }, []);

  return ReactDOM.createPortal(props.children, portalElemRef.current);
};

export default Portal;
