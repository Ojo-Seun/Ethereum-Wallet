import React, { Component, Suspense } from "react";
import { ethers } from "ethers";
import RenderRSP from "../components/RenderRSP";
import RenderMnemonics from "../components/RenderMnemonics";

interface States {
  wallet: {
    mnemonics: string[];
    address: string;
    privateKey: string;
  };
  renderSubmitBtn: boolean;
  isNotCorrect: boolean;
  RSP: string[];
  disable: boolean;
}

class Wallet extends Component<{}, States> {
  constructor(props: {}) {
    super(props);
    this.state = {
      renderSubmitBtn: false,
      isNotCorrect: true,
      RSP: [],
      disable: false,

      wallet: {
        mnemonics: [],
        address: "",
        privateKey: "",
      },
    };
  }

  createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    const mnemonics = wallet.mnemonic.phrase.split(" ");
    const address = wallet.address;
    const privateKey = wallet.privateKey;
    this.setState({
      ...this.state,
      renderSubmitBtn: true,
      wallet: {
        mnemonics: mnemonics,
        address: address,
        privateKey: privateKey,
      },
    });
  };

  handleSubmit = () => {
    const {
      wallet: { privateKey, address },
    } = this.state;

    console.log({ privateKey, address });
    this.setState({
      ...this.state,
      RSP: [],
      isNotCorrect: true,
      wallet: { mnemonics: [], address: "", privateKey: "" },
    });
  };

  del = (text: string) => {
    const RSPtags = document.getElementsByClassName("RSP");
    let arr: string[] = [];

    for (let i = 0; i < RSPtags.length; i++) {
      const element = RSPtags[i];
      if (element.textContent !== text) {
        arr.push(element.textContent!);
      }
    }

    this.setState({ ...this.state, RSP: arr }, () => {
      this.setState({ ...this.state, disable: false });
    });
  };

  _setRSP = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { textContent } = e.target as HTMLButtonElement;
    const isExist = this.state.RSP.includes(textContent || "");

    if (!isExist) {
      this.setState(
        { ...this.state, RSP: [...this.state.RSP, textContent || ""] },
        () => {
          const RSPtags = document.getElementsByClassName("RSP");

          let removeBtn = document.createElement("span");

          this.state.RSP.forEach((text, index) => {
            let targetTag = RSPtags[index];
            if (this.state.wallet.mnemonics[index] !== text) {
              targetTag.classList.add("error");
              removeBtn.textContent = "X";
              removeBtn.className = "cancel";
              targetTag.append(removeBtn);
              this.setState({ ...this.state, disable: true });
              removeBtn.addEventListener("click", (e) => {
                targetTag.removeChild(removeBtn);
                this.del(targetTag.textContent || "");
              });
            } else if (RSPtags.length === 12) {
              this.setState({ ...this.state, isNotCorrect: false });
            }
          });
        }
      );
    }
  };
  render() {
    const {
      RSP,
      wallet: { mnemonics },
      disable,
      renderSubmitBtn,
      isNotCorrect,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">Etherjs Tutorial</header>
        <main>
          <div>
            <div className="mnemonicWrapper">
              <h2>Security Recovery Phrase</h2>
              <Suspense fallback={<span>Loading...</span>}>
                <RenderRSP RSP={RSP} />

                <RenderMnemonics
                  mnemonics={mnemonics}
                  disable={disable}
                  _setRSP={this._setRSP}
                />
              </Suspense>
            </div>
            <div>
              {renderSubmitBtn ? (
                <button
                  className="btn"
                  disabled={isNotCorrect}
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              ) : (
                <button className="btn" onClick={this.createWallet}>
                  Register
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Wallet;
