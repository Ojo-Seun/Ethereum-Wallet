import React from "react";

type props = {
  RSP: string[];
};

function RenderRSP({ RSP }: props) {
  return (
    <div className="container RSPs">
      {RSP.length > 0 &&
        RSP.map((text, index) => (
          <button className="btn RSP" key={index}>
            {text}
          </button>
        ))}
    </div>
  );
}

export default RenderRSP;
