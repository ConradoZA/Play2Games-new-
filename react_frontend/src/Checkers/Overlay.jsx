import React from "react";
import "./checkers.css";

const Overlay = ({ color }) => {
  return (
    <div
      style={{
        position: "relative",
        bottom: "8vmin",
        height: "100%",
        width: "100%",
        zIndex: 10,
        opacity: 0.5,
      }}
      className={color}
    />
  );
};
export default Overlay;
