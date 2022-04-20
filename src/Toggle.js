import React from "react";

export default function Toggle(props) {
  const { toggleText, dark, handleDark } = props;

  return (
    <div
      className={dark ? "toggle toggle-dark" : "toggle"}
      onClick={handleDark}
    >
      {toggleText}
    </div>
  );
}
