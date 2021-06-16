import { useState } from "react";
import Nav from "./commonComponents/navbar";
import Category from "./category";
import ConnectWalletCard from "./commonComponents/ConnectWalletCard";
import ConnectWalletCardOwner from "./commonComponents/ConnectWalletCardOwner";
import IconArrow from "../assets/icon-arrow.svg";
import SortIconArrow from "../assets/sort-icon-arrow.svg";
import artImg from "../assets/art.png";
import searchImg from "../assets/search.png";
import Pagination from "./commonComponents/Pagination";
import Footer from "./commonComponents/footer";
import DropDown from "./commonComponents/DropDown";
import { Link } from "react-router-dom";

import dummyData from "../assets/ConnectWalletCardData.json";
import { allDropDownData, votesDropDownData } from "../utilities/constants";

import { useHistory } from "react-router-dom";
import nftService from '../services/nft.service';
import ipfsService from '../services/ipfs.service';
import { useEffect } from 'react';
import { useSelector } from "react-redux";

import ConnectWalletModal from "./commonComponents/ConnectWalletModal";
import Web3 from "web3";

const Home = () => {
  const [theme, setTheme] = useState("dark");
  const [showModal, setShowModal] = useState(false);
  const [showAllDropDown, setShowAllDropDown] = useState(false);
  const [showVotesDropDown, setShowVotesDropDown] = useState(false);
  const [isV2, setIsV2] = useState(true);
  const [isV1, setIsV1] = useState(false);

  // integration
  const [nfts, setNfts] = useState([]);
  const [mynfts, setMyNfts] = useState([]);
  let history = useHistory();
  const viewNFT = (nft) => {
    history.push('/ownerlive', nft);
    
  }
  const web3Object = useSelector((state) => {
    return state.web3.web3object;
  });
  useEffect(() => {
    async function loadNfts(){
      setMyNfts([]);
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
      const accounts = await  window.web3.eth.getAccounts();
      console.log(accounts)
      if( accounts?.length   > 0 ){
      const nftss = await nftService.getNftByAddress(accounts[0])
      for(let item of nftss){
        const hash = item.uri.split('/')[4]
        const metadata = (await ipfsService.getMetaData(hash)).data;
        item.metadata = metadata;
        setMyNfts((nfts) => [...nfts, item]);
      }
      console.log(nfts);
    }
    }
    async function loadMyNfts(){
      setNfts([]);
      const accounts = await window?.web3?.eth?.getAccounts();
      const nftss = await nftService.getNfts();
      if (accounts?.length > 0)
      for(let item of nftss){
        if(item.holder != accounts[0] && item.offers[0]?.isForSell){
          const hash = item.uri.split('/')[3]
          const metadata = (await ipfsService.getMetaData(hash)).data;
          item.metadata = metadata;
          setNfts((nfts) => [...nfts, item]);
        }
      }
    }
    loadNfts();
    loadMyNfts();
  },[])
  const toggle = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <div className={`App ${theme} main-wrapper`}>
      <Nav theme={theme} setTheme={setTheme} onClick={toggle} />
      <div className="body-wrapper">
        <div className="inner-body-wrapper">
          <div className="body-container">
            <div className="d-grid"></div>
            <div height="0" className="d-h">
              <div className="inner-d-h"></div>
            </div>
            <div className="nft-container">
              <div className="nft-heading">NFT Marketplace</div>
              <div className="p-nft">
                A market made for NFT, where everything is special{" "}
                <span role="img" aria-label="smile">
                  😋
                </span>
              </div>
              <div className="btn-switch-container">
                <div
                  className={`btn-switch ${isV2 ? "ACTIVENAV" : ""}`}
                  onClick={() => {
                    setIsV2(true);
                    setIsV1(false);
                  }}
                >
                  V2
                </div>
                <div
                  className={`btn-switch ${isV1 ? "ACTIVENAV" : ""}`}
                  onClick={() => {
                    setIsV1(true);
                    setIsV2(false);
                  }}
                >
                  V1
                </div>
              </div>
            </div>

            <Category />

            <div className="sc-jKAHpi dewaVU">
              <div
                className="sc-khKDHO hINlBC"
                style={{ justifyContent: "flex-start" }}
              >
                <a className="sc-bveJEc fpUdNy" href="#/my-new-artworks">
                  <img src={artImg} alt="" className="sc-jsqbLq gAjnax" />
                  <div className="css-1ppgej9">My Artworks</div>
                </a>
                <Link
                  className="sc-bveJEc jInkuI"
                  bg="#1A110D"
                  color="#D6A485"
                  border="#D6A485"
                  to="/mint-artworks"
                >
                  <div className="css-1ppgej9">Mint Artworks</div>
                </Link>
              </div>
              <div
                className="sc-khKDHO hINlBC"
                style={{ justifyContent: "flex-end" }}
              >
                <div className="eaeziS">
                  <input className="sc-gKLXLV kcuOqq" />
                  <div className="sc-bvCTgw cZSfhD">
                    <img src={searchImg} alt="" />
                  </div>
                </div>
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
                      setShowVotesDropDown(false);
                    }}
                  />
                  {showAllDropDown && <DropDown data={allDropDownData} />}
                </div>
                <div height="40" radius="8px" className="sc-BngTV cRXyHY">
                  <div color="#FFF3E0" className="sc-cqpYsc kRskKF">
                    Votes
                  </div>
                  <img
                    src={SortIconArrow}
                    alt="icon"
                    className="sc-dyGzUR dGLyHd"
                  />
                  <input
                    className="sc-bFADNz laDAZV"
                    onClick={() => {
                      setShowVotesDropDown(!showVotesDropDown);
                      setShowAllDropDown(false);
                    }}
                  />
                  {showVotesDropDown && <DropDown data={votesDropDownData} />}
                </div>
              </div>
            </div>
             {/*        
            <div className="cards-wrap">
              {dummyData.list.map((item, index) => {
                return (
                  <ConnectWalletCard
                    nft={item}
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
            */}
            <h1>Explore</h1>
            <div className="cards-wrap">
              {nfts.map((item, index) => {
                return (
                  <ConnectWalletCard
                    nft={item}
                    key={index}
                    name={item.metadata?.name}
                    id={item?.id}
                    image={item?.metadata?.file}
                    url={''}
                    likesCount={0}
                    bakeCount={''}
                    toggle={toggle}
                  />
                );
              })}
               </div>
              <h1>My NFTS</h1>
            <div className="cards-wrap">
              {mynfts.map((item, index) => {
                return (
                  <ConnectWalletCardOwner
                    nft={item}
                    key={index}
                    name={item.metadata?.name}
                    id={item?.id}
                    image={item?.metadata?.file}
                    url={''}
                    likesCount={0}
                    bakeCount={''}
                    toggle={toggle}
                  />
                );
              })}
            </div>

            <Pagination />

            <Footer />
          </div>
        </div>
      </div>
      <ConnectWalletModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Home;
