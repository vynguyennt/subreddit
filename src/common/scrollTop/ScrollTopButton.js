import React, { useState } from "react";
import { useScrollPosition } from "../utils/positionUtils";
import "./ScrollTopButton.css";

export default function ScrollTopButton() {
  const [isHidden, updateIsHidden] = useState(true);
  useScrollPosition(({ currPos }) => {
    if (currPos.y < -100) {
      updateIsHidden(false);
    } else {
      updateIsHidden(true);
    }
  }, []);

  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <button
      className={"scroll-top-btn" + (isHidden ? " hidden" : "")}
      onClick={scrollToTop}
    >
      <i className="material-icons">expand_less</i>
    </button>
  );
}
