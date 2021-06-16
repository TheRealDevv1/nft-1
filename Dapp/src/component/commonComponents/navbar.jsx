import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import logoWhite from "../../assets/logo-white.svg";
import { useSelector } from "react-redux";

const Navbar = ({ theme, setTheme, onClick }) => {
  const [isDropdownSettingsOn, setIsDropdownSettingsOn] = useState(false);
  const isWeb3Connected = useSelector((state) => state.web3.web3connected);
  return (
    <>
      <div className="header-container">
        <div id="header_id" className="header">
          <div className="inner-header" style={{ alignItems: "center" }}>
            <div className="logo-container">
              <a href="." className="inner-logo-container">
                <div className="donut">
                  <img src={logoWhite} alt="logo" style={{ height: "32px" }} />
                </div>
                <div className="brandLogo">
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      marginLeft: "5px",
                      marginTop: "0px",
                      height: "20px",
                    }}
                  />
                </div>
              </a>
            </div>
            <div className="setting-container">
              <div className="left-setting">
                <div className="bsc-container">
                  <div className="bsc">BSC</div>
                </div>
                <div
                  className="wallet-connect"
                  style={{ pointerEvents: "auto" }}
                >
                  <button
                    id="connect-wallet"
                    className="btn-wallet"
                    onClick={onClick}
                  >
                    <p className="txt-wallet">{!isWeb3Connected?'Connect to a wallet':'Diconnect wallet'}</p>
                  </button>
                </div>
              </div>
              <div className="settings">
                <div className="settings-div">
                  <button
                    className="btn-settings"
                    id="open-settings-dialog-button"
                    onClick={() =>
                      setIsDropdownSettingsOn(!isDropdownSettingsOn)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sc-fAjcbJ dOzvrY"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </button>
                </div>

                {isDropdownSettingsOn && (
                  <span className="settings-dropdown-container">
                    <div
                      className="settings-dropdown-inner"
                      style={{ padding: "1rem" }}
                    >
                      <div className="h-dropdown">Transaction Settings</div>
                      <div className="settings-dropdown-inners">
                        <div className="settings-dropdown-meta">
                          <div className="bwckzD">
                            <div className="sc-kpOJdX jLZfGp css-12a3kkh">
                              Slippage tolerance
                            </div>
                            <span style={{ marginLeft: "4px" }}>
                              <div className="sc-iwsKbI xkrrd">
                                <div className="sc-jTzLTM elhbpi">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                    <line
                                      x1="12"
                                      y1="17"
                                      x2="12.01"
                                      y2="17"
                                    ></line>
                                  </svg>
                                </div>
                              </div>
                            </span>
                          </div>
                          <div className="sc-hMqMXs bcpqQH">
                            <button className="sc-eHgmQL sc-cvbbAY eThVKV">
                              0.1%
                            </button>
                            <button className="sc-eHgmQL sc-cvbbAY jTcVwV">
                              0.5%
                            </button>
                            <button className="sc-eHgmQL sc-cvbbAY eThVKV">
                              1%
                            </button>
                            <button
                              tabIndex="-1"
                              className="sc-eHgmQL sc-brqgnP hxdjfw"
                            >
                              <div className="sc-hMqMXs bcpqQH">
                                <input
                                  placeholder="0.50"
                                  color=""
                                  className="sc-jWBwVP ewBnSk"
                                  value=""
                                />
                                %
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="settings-dropdown-meta">
                          <div className="bwckzD">
                            <div className="sc-kpOJdX jLZfGp css-12a3kkh">
                              Transaction deadline
                            </div>
                            <span style={{ marginLeft: "4px" }}>
                              <div className="sc-iwsKbI xkrrd">
                                <div className="sc-jTzLTM elhbpi">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                    <line
                                      x1="12"
                                      y1="17"
                                      x2="12.01"
                                      y2="17"
                                    ></line>
                                  </svg>
                                </div>
                              </div>
                            </span>
                          </div>
                          <div className="bwckzD">
                            <button
                              tabIndex="-1"
                              className="sc-eHgmQL sc-brqgnP hxdjfw"
                              style={{ width: "80px" }}
                            >
                              <input
                                placeholder="20"
                                className="sc-jWBwVP ewBnSk"
                                value=""
                              />
                            </button>
                            <div
                              className="sc-kpOJdX ifRfWx css-1ecm0so"
                              style={{ paddingLeft: "8px" }}
                            >
                              minutes
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-dropdown">Interface Settings</div>
                      <div className="sc-hMqMXs bcpqQH">
                        <div className="bwckzD">
                          <div className="sc-kpOJdX jLZfGp css-12a3kkh">
                            Toggle Expert Mode
                          </div>
                          <span style={{ marginLeft: "4px" }}>
                            <div className="sc-iwsKbI xkrrd">
                              <div className="sc-jTzLTM elhbpi">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                  <line
                                    x1="12"
                                    y1="17"
                                    x2="12.01"
                                    y2="17"
                                  ></line>
                                </svg>
                              </div>
                            </div>
                          </span>
                        </div>
                        <button
                          id="toggle-expert-mode-button"
                          className="sc-jDwBTQ kvBeEB"
                        >
                          <span className="sc-jAaTju ySk">On</span>
                          <span className="sc-jAaTju iBFFqG">Off</span>
                        </button>
                      </div>
                      <div className="sc-hMqMXs bcpqQH">
                        <div className="bwckzD">
                          <div className="sc-kpOJdX jLZfGp css-12a3kkh">
                            Toggle Dark Mode
                          </div>
                        </div>
                        <button className="sc-jDwBTQ iYZfQI">
                          <span className="sc-jAaTju dWkLCZ">On</span>
                          <span className="sc-jAaTju ySk">Off</span>
                        </button>
                      </div>
                    </div>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
