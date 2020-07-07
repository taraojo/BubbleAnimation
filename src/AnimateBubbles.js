import React, { useState, useLayoutEffect } from "react";
import usePrevious from "./hooks/usePrevious";
import calculateBoundingBoxes from "./helpers/calculateBoundingBoxes";

const AnimateBubbles = ({ children }) => {
  const [boundingBox, setBoundingBox] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren]);

  useLayoutEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const oldBox = prevBoundingBox[child.key];
        const newBox = boundingBox[child.key];
        const deltaX = oldBox.left - newBox.left;

        if (deltaX) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert to old position
            domNode.style.transform = `translateX(${deltaX}px)`;
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              // After the previous frame, remove the transistion
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return (
    <div className="bubbles-wrapper">
      <div className="bubbles-group">{children}</div>
    </div>
  );
};

export default AnimateBubbles;
