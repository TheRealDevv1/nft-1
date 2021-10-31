import Modal from "./Modal";
import binanceImg from "../../assets/binance.png";
import { INFURA_ID } from "../../config";

import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

import Web3 from "web3";
import Web3Modal from "web3modal";
import { Web3Object } from "../../redux/actions/web3action";
import { web3Connected } from "../../redux/actions/web3action";

const ConnectWalletModal = ({ showModal, setShowModal }) => {
  const providerOptions = {};
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const isWeb3Connected = useSelector((state) => state.web3.Web3connected);
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    dispatch(web3Connected(false));
    setShowModal(!setShowModal)
  };
  const connectWallet = async () => {
    let provider = await web3Modal.connect();
    // Subscribe to accounts change
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    dispatch(Web3Object(web3));
    dispatch(web3Connected(true));
    await web3Modal.toggleModal();
    setShowModal(!setShowModal)
  }
  useEffect(()=>{
    connectWallet()
  },[])
  return (
    <Modal show={showModal} showModal={setShowModal}>
      <div className="connect-modal">
        <div className="close-icon" onClick={() => setShowModal(!setShowModal)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sc-RefOD iPxXGe"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        <div className="head-modal">Connect to a wallet</div>

        <div className="lower-modal">
          <div className="inner-modal">
            <a href="#" className="modal-btn1">
              <button className="btn1-modal">
                <div className="btn1-sec1">Install Binance Chain Wallet</div>
                <div>
                  <img
                    className="btn2-sec2"
                    src={binanceImg}
                    alt="Icon"
                    width="24px"
                    height="24px"
                  />
                </div>
              </button>
            </a>
            { !isWeb3Connected &&
              <a onClick={()=>connectWallet()} className="modal-btn1">
                <button className="btn1-modal">
                  <div  className="btn1-sec1">connect Metamask</div>
                  <div>
                    <img
                      className="btn2-sec2"
                      src="https://www.bakeryswap.org/static/media/metamask.023762b6.png"
                      alt="Icon"
                      width="24px"
                      height="24px"
                    />
                  </div>
                </button>
              </a>
            }
            { isWeb3Connected &&
              <a onClick={()=>disconnectWallet()} className="modal-btn1">
                <button className="btn1-modal">
                  <div  className="btn1-sec1">disconnect Metamask</div>
                  <div>
                    <img
                      className="btn2-sec2"
                      src="https://www.bakeryswap.org/static/media/metamask.023762b6.png"
                      alt="Icon"
                      width="24px"
                      height="24px"
                    />
                  </div>
                </button>
              </a>
            }
            <a href="#" className="modal-btn1">
              <button className="btn1-modal">
                <div className="btn1-sec1">Wallet Connect</div>
                <div>
                  <img
                    className="btn2-sec2"
                    src="https://www.bakeryswap.org/static/media/walletConnectIcon.8215855c.svg"
                    alt="Icon"
                    width="24px"
                    height="24px"
                  />
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
