import React, { useState, createRef } from "react";
import Bubble from "./Bubble";
import AnimateBubbles from "./AnimateBubbles";
import initialImages from "./initialImages";
import shuffleArray from "./helpers/shuffleArray";
import "./styles.css";

export default function App() {
  const [follows, setFollows] = useState(initialImages);

  const reorder = () => {
    const shuffledImages = shuffleArray(follows);
    setFollows(shuffledImages);
  };

  return (
    <div>
      <AnimateBubbles>
        {follows.map(({ id, text }) => (
          <Bubble key={id} id={id} text={text} ref={createRef()} />
        ))}
      </AnimateBubbles>

      <div className="button-wrapper">
        <button className="button" onClick={reorder}>
          Re-order images
        </button>
      </div>
    </div>
  );
}
