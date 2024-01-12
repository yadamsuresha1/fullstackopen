/**
 * This component is used to toggle any react component (array of childs) using a button
 */

import { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";

const Toggable = forwardRef((props, refs) => {
  const [isChildVisible, setIsChildVisible] = useState(false);

  const toggleVisibility = () => {
    setIsChildVisible(!isChildVisible);
  };
  const okButtonStyle = { display: isChildVisible ? "none" : "" };
  const cancelButtonStyle = { display: isChildVisible ? "" : "none" };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={okButtonStyle}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={cancelButtonStyle} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});
Toggable.displayName = "Toggable";
export default Toggable;
