import React from "react";

interface props {
  mnemonics: string[];
  disable: boolean;
  _setRSP: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function RenderMnemonics({ mnemonics, disable, _setRSP }: props) {
  return (
    <div className="container mnemonics">
      {mnemonics.length > 0 &&
        mnemonics.map((text, index) => (
          <button
            disabled={disable}
            onClick={(e) => _setRSP(e)}
            className="mnemonic"
            key={index}
          >
            {text}
          </button>
        ))}
    </div>
  );
}

export default RenderMnemonics;
