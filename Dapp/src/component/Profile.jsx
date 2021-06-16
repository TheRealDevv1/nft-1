import React, { useState } from "react";
import Navbar from "./commonComponents/navbar";
import Footer from "./commonComponents/footer";
import Pagination from "./commonComponents/Pagination";
import ConnectWalletCard from "./commonComponents/ConnectWalletCard";
import dummyData from "../assets/ConnectWalletCardData.json";
import IconLink from "../assets/icon-link.svg";
import IconCopy from "../assets/icon-copy.svg";
import IconArrow from "../assets/icon-arrow.svg";
import Cover from "../assets/cover.png";
import ProfileAvatar from "../assets/profile.png";
import NoArtImg from "../assets/no-art.png";
import Tick from "../assets/tick.svg";
import DropDown from "./commonComponents/DropDown";
import ConnectWalletModal from "./commonComponents/ConnectWalletModal";

const profileAllDropDownData = [
  {
    text: "All",
    checkIcon: Tick,
  },
  {
    text: "InWallet",
    checkIcon: Tick,
  },
  {
    text: "On Sale",
    checkIcon: Tick,
  },
  {
    text: "On Auction",
    checkIcon: Tick,
  },
  {
    text: "Offer mode",
    checkIcon: Tick,
  },
];

const Profile = () => {
  const [theme, setTheme] = useState("dark");
  const [showAllDropDown, setShowAllDropDown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCreated, setIsCreated] = useState(true);

  const toggle = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="sc-bmIgLR hixsnq">
        <div className="sc-iBZwnA ccoJQw">
          <Navbar theme={theme} setTheme={setTheme} onClick={toggle} />
        </div>
        <div className="sc-jCHZzo dXnuYw">
          <div className="sc-hTWHXV kaVtIb" id="BodyContainer">
            <div className="sc-jixVgY kdBtHC">
              <div className="sc-jKJlTe sc-jzgbtB iGMfXE"></div>
              <div height="0" className="sc-gFaPwZ dzDNre">
                <div className="sc-fhYwyz hQHboy"></div>
              </div>
              <div className="sc-eLpfTy ceUCCl">
                <div className="sc-jtEaiv ihEbUE">
                  <img src={Cover} alt="" className="sc-dfRKBO hnoJVb" />
                  <div className="sc-bdVaJa sc-htpNat sc-jiTwWT gvjUsH">
                    <div className="sc-bdVaJa sc-eNQAEJ sc-hMqMXs sc-kxLnmX gooqGl">
                      <div
                        className="sc-bCCsHx jwAujt"
                        style={{
                          background: `url(${ProfileAvatar}) center center / cover`,
                        }}
                      ></div>
                      <div className="sc-bdVaJa sc-eNQAEJ sc-buGlAa dgXyJC">
                        <div className="sc-bdVaJa sc-eNQAEJ sc-hMqMXs sc-flvzOl fxQZlY">
                          <div className="sc-kecUPG fPSGDl css-zcn0yb">
                            BSChain
                          </div>
                          <div
                            className="sc-bdVaJa sc-eNQAEJ sc-kkGfuU fDHnxT"
                            style={{ width: "auto", flexShrink: "0" }}
                          >
                            <a
                              href="https://bschain.fr/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button
                                width="30px"
                                height="30"
                                className="sc-bdVaJa ffKONe sc-gPEVay sc-hzDkRC sc-fJwQoQ dOWUmg"
                              >
                                <img src={IconLink} alt="" />
                              </button>
                            </a>
                          </div>
                        </div>
                        <div className="sc-bdVaJa sc-eNQAEJ sc-hMqMXs sc-flvzOl fxQZlY">
                          <div className="sc-gOCRIc kxKhvf css-vurnku">
                            Creations around pop culture and crypto
                          </div>
                          <div className="sc-jUiVId kHkkVl css-vurnku">
                            Creations around pop culture and crypto
                          </div>
                          <div className="sc-hSdWYo sc-fhiYOA ivWpPz">
                            <div className="css-qw26ho">Address</div>
                            <div className="sc-bdVaJa sc-eNQAEJ fhIakJ">
                              <div className="css-19wipea">
                                0x3BE7Fb13FBc**********71A61641372e590f0
                              </div>
                              <div className="sc-iwsKbI xkrrd">
                                <img src={IconCopy} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sc-dJyloi dAnXPN">
                  <div className="sc-bCMXmc hVZblb">
                    <div
                      className={`sc-iqtXtF eEfXEv ${
                        isCreated ? "ACTIVENAV" : ""
                      }`}
                      onClick={() => setIsCreated(true)}
                    >
                      Created
                    </div>
                    <div
                      className={`sc-iqtXtF eEfXEv ${
                        !isCreated ? "ACTIVENAV" : ""
                      }`}
                      onClick={() => setIsCreated(false)}
                    >
                      Collected
                    </div>
                  </div>
                  <div className="sc-gOhbcK gsFSih">
                    <div
                      className="sc-bdVaJa sc-eNQAEJ sc-lccPpP gvTDZO"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <div height="40" radius="8px" className="sc-BngTV hBtoZQ">
                        <div color="#FFF3E0" className="sc-cqpYsc kRskKF">
                          All
                        </div>
                        <img
                          src={IconArrow}
                          alt="icon"
                          className="sc-dyGzUR dGLyHd"
                        />
                        <input
                          className="sc-bFADNz laDAZV"
                          onClick={() => {
                            setShowAllDropDown(!showAllDropDown);
                          }}
                        />
                        {showAllDropDown && (
                          <DropDown data={profileAllDropDownData} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="sc-eylKsO gNlJNZ">
                    {isCreated ? (
                      <div className="cards-wrap">
                        {dummyData.list.map((item, index) => {
                          return (
                            <ConnectWalletCard
                              key={index}
                              name={item.name}
                              id={item.id}
                              image={item.imageUrl}
                              url={item.author}
                              likesCount={item.votes}
                              bakeCount={item.price}
                              toggle={toggle}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className="sc-iBfVdv dvqSNk">
                        <div className="sc-cCbPEh sc-eklfrZ iOTwvP">
                          There’s no Artwork on sale
                        </div>
                        <img
                          src={NoArtImg}
                          alt="unknown-artwork"
                          className="sc-csSMhA fTPNzE"
                        />
                      </div>
                    )}

                    <Pagination />
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
        <ConnectWalletModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Profile;
