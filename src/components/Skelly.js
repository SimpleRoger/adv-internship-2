import React from "react";

export const Skelly = ({ width, height, borderRadius }) => {
  return (
    <div
      className="bg-[#d3dde3]"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};
