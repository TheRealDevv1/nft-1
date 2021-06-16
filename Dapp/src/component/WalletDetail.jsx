import React, { useEffect, useState } from "react";
import IconBake from "../assets/icon-bake.svg";
import IconNothingBid from "../assets/icon-nothing-bid.svg";
import IconArrow from "../assets/icon-arrow.svg";
import SortIconArrow from "../assets/sort-icon-arrow.svg";
import IconHeart from "../assets/icon-heart.svg";
import IconLink from "../assets/icon-link.svg";
import { allDropDownData, votesDropDownData } from "../utilities/constants";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Category from "./category";
import Navbar from "./commonComponents/navbar";
import dummyData from "../assets/ConnectWalletCardData.json";
import Footer from "./commonComponents/footer";
import Pagination from "./commonComponents/Pagination";
import ConnectWalletCard from "./commonComponents/ConnectWalletCard";
import ConnectWalletModal from "./commonComponents/ConnectWalletModal";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ERC721Exchanger from "../common/ERC721/erc721Exchanger";
import ERC20Exchanger from '../common/ERC20/erc20Exchanger';

import { tokens } from '../data/tokens';

import BidService from "../services/bid.service"
import { ERC721_EXCHANGER_ADDRESS } from '../config';

import NftService from "../services/nft.service";
import OfferService from "../services/offer.service";
import { ERC721_ADDRESS } from '../config';
import offerService from '../services/offer.service';
import ERC721Minter from '../common/ERC721/erc721Minter';
import { sliceStr } from "../common/utils";

const WalletDetail = (props) => {
  const { history ,location: { state } } = useHistory();
  const [showAllDropDown, setShowAllDropDown] = useState(false);
  const [showVotesDropDown, setShowVotesDropDown] = useState(false);
  const [isV2, setIsV2] = useState(true);
  const [isV1, setIsV1] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showModal, setShowModal] = useState(false);
  const [nft, setNFT] = useState(props.location.state);
  let nftt = props.location.state;
  console.log(props.location);
 

  const toggle = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };
  const [bids, setBids] = useState([]);
  const [price, setPrice] = useState(0)
  const [token, setToken] = useState();
  const [isBidPlaced, setIsBidPlaced] =  useState(false);
  const [isSettingOfferPrice, setIsSettingOfferPrice] = useState(false)
  const defaultOption = tokens[0];
  const themeStore = useSelector((state) => state.theme.theme_color);
  const web3Object = useSelector((state) => {
      console.log(state.web3.web3object, 'web3object value');
      return state.web3.web3object;
    });
  const deleteOffer = async (id) =>{
      const resD = await OfferService.deleteOffer(id);
      console.log(resD);
  }
  const cancelBid = async (bid) => {
      const acccouts = await web3Object?.eth?.getAccounts();
      const bidder =  acccouts[0];
      const erc721Exchanger = new ERC721Exchanger(web3Object);
      const data = await erc721Exchanger.cancelBid(ERC721_ADDRESS, nft.assetId, bid.bidder);
      const res = await BidService.deleteBid(bid.id);
      console.log(res);
      loadNfts();
      setIsBidPlaced(false);
  }
  const placeBid = async (nft) => {
      const acccouts = await web3Object?.eth?.getAccounts();
      const bidder =  acccouts[0];
      const erc721Exchanger = new ERC721Exchanger(web3Object);
      const erc20Exchanger = new ERC20Exchanger(web3Object, token);
      const expiresAt = Math.round(new Date().getTime()/1000);
      console.log(token);
      let approve =  await erc20Exchanger.approve(bidder, ERC721_EXCHANGER_ADDRESS, price);
      const data = await erc721Exchanger.placeBid(bidder, ERC721_ADDRESS, nft.assetId,token, price, expiresAt);
      const bid = {
          bidder:bidder,
          price:price,
          token:token,
          offer_id:nft.offers[0].id,
          expiresAt:expiresAt
      }
      alert(JSON.stringify(bid))
      console.log(bid)
      const dbBid = await BidService.saveBid(bid);
      setBids((bids) => [...bids, dbBid]);

  }
  /*
  const updateBidPrice = async (bid) =>{
      const acccouts = await web3Object?.eth?.getAccounts();
      const bidder =  acccouts[0];
      const erc721Exchanger = new ERC721Exchanger(web3Object);
      const expiresAt = Math.round(new Date().getTime()/1000);
      console.log(token);
      let approve =  await erc20Exchanger.approve(bidder, ERC721_EXCHANGER_ADDRESS, price);
      const data = await erc721Exchanger.placeBid(bidder, ERC721_ADDRESS, nft.assetId,token, price, expiresAt);
      const bid = {
          bidder:bidder,
          price:price,
          token:token,
          offer_id:nft.offers[0].id,
          expiresAt:expiresAt
      }
      const dbBid = await BidService.saveBid(bid);
      setBids((bids) => [...bids, dbBid]);
  }
  */
  const buyNFT = async (nft) => {
      const acccouts = await web3Object.eth.getAccounts();
      const newHolder =  acccouts[0];
      nft.holder = newHolder;
      const erc721Exchanger = new ERC721Exchanger(web3Object);
      const data = await erc721Exchanger.buyOffer(newHolder, ERC721_ADDRESS, nft.assetId, nft.offers[0].price);
      const newNFT = {
          id:nft.id,
          holder: newHolder
      }
      console.log(data);
      const dbUpdate = await NftService.updateNFT(newNFT);
      await deleteOffer(nft.offers[0].id);
      console.log(dbUpdate);
  }
  async function loadNfts(){
      const acccouts = await web3Object.eth.getAccounts();
      const currentUser =  acccouts[0];
      const offer = await offerService.getOffersByNFT(nft.id)
      if(offer?.length > 0){
        for(let bid of offer[0]?.bids){
            if(bid.bidder == currentUser)
            setIsBidPlaced(true);
        }
        setBids(offer[0]?.bids);
      }
     
  }
  useEffect(() => {
     
      loadNfts();
    },[])
    return (
      <div className={`App ${theme} main-wrapper`}>
        <Navbar theme={theme} setTheme={setTheme} onClick={toggle} />
        <div className="jmdjgN">
          <div className="w-100">
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
          </div>
  
          <Category />
  
          <div className="cBBzMW">
            <div className="cWseDY">
              <img
                src={nft?.metadata?.file}
                alt=""
                className="dCxnlS"
              />
            </div>
            <div className="eOceSu">
              <div className="hYGOnD">
                <div className="gnPdqq">
                  <div className="css-h4hmwt" style={{ fontSize: 28 }}>
                    {nft?.metadata?.name}
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSePTf_IgOIVKj5vqoJbysHj1YQXU-IjoBd5XPUcZ3MuTd62xQ/viewform?usp=pp_url&amp;entry.925770343=https://www.bakeryswap.org/%23/exchange/new-artworks/artworkInfo/1007/0/1"
                    target="_blank"
                    className="fKIGLJ"
                  >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAhCAYAAABTERJSAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN/SURBVHgBzVddchJBEO6eXRAttTgCeVGCPpATCCcQCjbqU5ITACeAnAA8AeQpyo8hJwjegFRZEZ+y3oAqq1K6hGlnFlh2l58diFG/h8BMema/7fm+ngbhDqhnYtGneqRAiClAjAGRyQEuxyOqvesOTNgQCFviUy5+wDVWE1+jSzfmvJJrD45hA2xF5mPuWUbT9LOgOOLjktH+VgNFMNgCmqZVvTN4KR59It7M9MyiVpZHCYrQYUN08okyAcRmYwJ+bDQHldm4tZ+oCFLlCRuIPg4/lN9LKntvdEynb+OxEGfXrsVmrnm144/r7CeuPYQ5TxvtQQ8CsNEx6RwrngmCpQLlnB25x4hYBgUoZ6aVf5lCxi/mPKBvNK/2VsW3jRcXgJRy4hWyo5wZZOO6e6xbPLsuXtPG3uwwrAeJWYlM04gfiu1izsYEjWxAUct+GJgie65jxNjjcKQIdyEjRctcZy5Fy0ZcqZjpVrgm4ofOWmKFddkJJBPmWHBnhQM/8WelaSSS0tKnmXjMPZ/t9ofAaU5cWP1J6FF11bPWCljFymeZZHQctmRMVKh6+GN0s3PUNYfuGFUxr82MipVv9dskzO4nWeQikaQ/hgg961ZZfSUZKVoEPJhvCOe51lUDtoDR/tITWe262KQmplAkw3zs9RFf64QgMMZLbjEzYFW/mJeS6eR3i5taOQjS6qLXee9M2PeW1+oLZKRoiUFhvkbdykGYWt109hZWdztwgcxEtOgESNGuywohH4IibKu7TSCyEwphfSkZmRW3aG0rB4g2NAqbs7eVn/pPb0/jh70fYW9OCFOtfDy1QCY01jz3zy1QYB8i31bWHmIszaybPRVt+a0uLq6qh4xtNVdhkqJ90/zaBUXQ+Ncw6yt2qyCtLjtD51kIyVb+edHp9PxWVhXtpErjhdRZe3/XHFmUVvlloFkPijxsvaZpwZQtqp0Z/60sW0lVKwsiyflajOk6ZlTWyeP1W90mw0DziFa3oAGKIK55jkZkWNldfqvbZIjR/PIj6G1S4OxST3Ak3uKcOJU2uTJkduQ145CDP4ApgQZsAUKK4rR5mLiJQ9/5J0DG35fcFyZ1DV7NxjYlf7Mt+xLxt0sI3+GeQERRoS+p1aiHjIS/AfrbsO/A2UAbhWS334d/AYI+s3h6oe3sGIlDjnDoPsv74wCfxUdP/P6qwP+G3yK7emVltcLFAAAAAElFTkSuQmCC"
                      alt=""
                    />
                    <div className="css-1v8u5e3">Report</div>
                  </a>
                </div>
                <div className="iMufGK">
                  <div color="#885034" size="20" className="eGZMCw">
                    <span
                      style={{ color: "rgb(119, 109, 99)", marginRight: "5px" }}
                    >
                      Artist:{" "}
                    </span>
                    <Link to="/profile" className="name">
                      fa2p productions
                    </Link>
                    <a
                      href="https://www.eyeem.com/u/29755901"
                      target="_blank"
                      className="sc-fVHxE ekhmpZ"
                    >
                      <img src={IconLink} alt="" />
                    </a>
                  </div>
                </div>
                <div className="sc-jvjHmY htdYUC">
                  {nft?.metadata?.description}
                </div>
                <div className="hZDPML">
                  <div className="jtZWSG">
                    <img
                      src={IconBake}
                      width="27"
                      height="27"
                      alt=""
                      style={{ marginRight: "5px" }}
                    />
                    <div className="css-bzqoma">{nft.offers[0]?.price}</div>
                  </div>
                  <div className="jnYHDa">
                    <img width="32" src={IconHeart} alt="" />
                    <div className="css-5py86v">0</div>
                  </div>
                </div>
                <div className="iKQNHq">
                  <button  onClick={()=>buyNFT(nft)} className="elnsAn">but NFT</button>
                </div>
              </div>
              <div className="cteZTW">
                <div width="330px" className="jMXpOo">
                  <div className="item">
                    <div className="css-2otet">NFT Contract ID :</div>
                    <div className="css-1h6a0y4">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://bscscan.com/token/undefined"
                        className="dpcCFx"
                        style={{ color: "rgb(214, 164, 133)" }}
                      >
                        {sliceStr(ERC721_ADDRESS)}
                      </a>
                    </div>
                  </div>
                  <div className="item">
                    <div className="css-2otet">Token ID :</div>
                    <div className="css-1h6a0y4">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://bscscan.com/token/undefined?a=1007"
                        className="dpcCFx"
                      >
                        {sliceStr(nft.assetId)}
                      </a>
                    </div>
                  </div>
                </div>
                <div width="330px" className="jMXpOo">
                  <div className="item">
                    <div className="css-2otet">Creator's Address :</div>
                    <div className="css-1h6a0y4">
                      <a
                        className="bejTuu"
                        href="#/usercenter/0xaee2F487c7952fcB7Fa932d894E7Ce7a68Fa7f4b?type=CREATED"
                      >
                       {sliceStr(nft.holder)}
                      </a>
                    </div>
                  </div>
                  <div className="item">
                    <div className="css-2otet">Owner's Address :</div>
                    <div className="css-1h6a0y4">
                      <a
                        className="bejTuu"
                        href="#/usercenter/0xaee2F487c7952fcB7Fa932d894E7Ce7a68Fa7f4b?type=COLLECTED"
                      >
                        {sliceStr(nft.holder)}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="kLTmXs">
            <div className="dVEfLL">
            {nft.offers[0]?.isForSell &&
                              <div className="profile-card-container-main">
                                  <div className="live-right-buttons-box">
                                      <div className="css-h4hmwt">NFT For sell</div>
                                  </div>
                                  {nft.offers[0]?.isForAuction &&
                                          <div className="css-h4hmwt">NFT in Auction</div>
                                       }
                              </div>
                      }
                    
              <div className="css-h4hmwt">Bidding</div>
              <table>
                <thead>
                  <tr>
                    <td>
                      <div className="css-1m61rcj">Address</div>
                    </td>
                    <td >
                      <div className="css-1m61rcj">Price</div>
                    </td>
                    <td >
                      <div className="css-1m61rcj">action</div>
                    </td>
                  </tr>
                </thead>
              </table>
              <div className="hwzSGe">
                <table>
                  <tbody>
                  {bids?.length == 0 &&
                    <tr className="nothing">
                      
                      <td colSpan="3">
                        <img src={IconNothingBid} alt="" />
                        <div className="css-n3xmru">
                          No one is currently bidding here
                        </div>
          
                      </td>
                    </tr>
                    }
                     {bids?.map((bid)=>{
                        return <tr>
                        <td className="css-1i7ssjz"> {sliceStr(bid.bidder)}</td>
                        <td className="css-1i7ssjz"cut strinh> {bid.price}</td>
                        <td> <button onClick={()=> cancelBid(bid)} className="elnsAn">Cancel</button></td>
                      </tr>
                        })
                      }
                  </tbody>
                </table>
                <div className="live-right-buttons-box">
                                     {nft.offers[0]?.isForAuction &&
                                     <div>
                                         {!isBidPlaced &&
                                         <div>
                                        <input className="jnOeAi" value={price} onChange={e=>setPrice(e.target.value)}  type="number" />
                                        <Dropdown options={tokens} value={token} onChange={(e)=>setToken(e.value)} placeholder="Select an option" />
                                        <button onClick={()=> placeBid(nft)} className="elnsAn">Place a Bid</button>
                                        </div>
                                         }
                                      </div>  
                                     }
                                </div>
              </div>
            </div>
            <div className="kSrrRk">
              <div className="css-h4hmwt">Trading History</div>
              <table>
                <thead>
                  <tr>
                    <td className="first">
                      <div className="css-1m61rcj">Event</div>
                    </td>
                    <td className="second">
                      <div className="css-1m61rcj">Price</div>
                    </td>
                    <td className="third">
                      <div className="css-1m61rcj">From</div>
                    </td>
                    <td className="four">
                      <div className="css-1m61rcj">To</div>
                    </td>
                    <td>
                      <div className="css-1m61rcj">Date</div>
                    </td>
                  </tr>
                </thead>
              </table>
              <div id="box" className="iWKiUE">
                <div
                  style={{
                    width: "689px",
                    maxHeight: "280px",
                    overflowY: "auto",
                  }}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td className="first">
                          <div className="css-13m028r">List</div>
                        </td>
                        <td className="second">
                          <div className="css-1i7ssjz">
                            <img
                              src={IconBake}
                              width="19"
                              height="19"
                              alt=""
                              style={{ marginRight: "5px", marginBottom: "-5px" }}
                            />
                            {nft.offers[0]?.price}
                          </div>
                        </td>
                        <td className="third">
                          <div className="css-1i7ssjz">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://bscscan.com/address/0xaee2F487c7952fcB7Fa932d894E7Ce7a68Fa7f4b"
                              className="eHORUR hTbIcy"
                            >
                              0xaee2F4...68Fa7f4b
                            </a>
                          </div>
                        </td>
                        <td className="four">
                          <div className="css-1i7ssjz">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://bscscan.com/address/0x26b82ab8269b2ad48fbdbbc9a08c78df7d68e814"
                              className="eHORUR hTbIcy"
                            >
                              0x26b82a...7d68e814
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="css-1i7ssjz">3 months ago</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="first">
                          <div className="css-13m028r">List</div>
                        </td>
                        <td className="second">
                          <div className="css-1i7ssjz">
                            <img
                              src={IconBake}
                              width="19"
                              height="19"
                              alt=""
                              style={{ marginRight: "5px", marginBottom: "-5px" }}
                            />
                            70
                          </div>
                        </td>
                        <td className="third">
                          <div className="css-1i7ssjz">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://bscscan.com/address/0xaee2F487c7952fcB7Fa932d894E7Ce7a68Fa7f4b"
                              className="eHORUR hTbIcy"
                            >
                              0xaee2F4...68Fa7f4b
                            </a>
                          </div>
                        </td>
                        <td className="four">
                          <div className="css-1i7ssjz">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://bscscan.com/address/0x26b82ab8269b2ad48fbdbbc9a08c78df7d68e814"
                              className="eHORUR hTbIcy"
                            >
                              0x26b82a...7d68e814
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="css-1i7ssjz">3 months ago</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
        
  
  
          <Footer />
        </div>
        <ConnectWalletModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    );
  };
  
  export default WalletDetail;
  