import React, { useState, useRef, useEffect } from "react";
import Navbar from "./commonComponents/navbar";
import Footer from "./commonComponents/footer";
import Icon from "../assets/icon-artwork.svg";
import Icondrop from "../assets/icon-artworkdrop.svg";
import ArtworkImage from "../assets/artwork_image.png";
import ArtworkImageCover from "../assets/artwork-image-cover.png";
import ArtworkGif from "../assets/artwork-gif.svg";
import ArtworkVideo from "../assets/artwork-video.svg";
import IconBake from "../assets/icon-bake.svg";
import tick from "../assets/tick.svg";
import IconPencil from "../assets/icon-pencil.svg";
import ArtWorkInput from "./commonComponents/ArtWorkInput";
import ConnectWalletModal from "./commonComponents/ConnectWalletModal";

// Dynamic tasks
import { useSelector, useDispatch } from 'react-redux';
import ERC721Minter from "../common/ERC721/erc721Minter";
import ERC721Exchanger from "../common/ERC721/erc721Exchanger";

import IpfsService from "../services/ipfs.service";
import NftService from "../services/nft.service";
import userService from '../services/user.service';


let delay = 0;

const ArtWork = () => {
  const [theme, setTheme] = useState("dark");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isArtType, setIsArtType] = useState(1);

  const [width, setWidth] = useState(0);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [artistName, setArtistName] = useState('');

  const web3Connected = useSelector((state) => {
    console.log(state.web3.web3connected, 'connected value');
    return state.web3.web3connected;
  });
  const web3Object = useSelector((state) => {
    console.log(state.web3.web3object, 'web3object value');
    return state.web3.web3object;
  });

  useEffect(() => {
    if (isImageUploading) {
      const interval = setInterval(() => {
        delay = delay + 20;
        setWidth(delay);
        if (delay === 100) {
          clearInterval(interval);
          delay = 0;
        }
      }, 500);
    }
  }, [isImageUploading]);

  useEffect(() => {
    if (width === 100) setIsImageUploading(false);
  }, [width]);

  const onChange = (e) => { };

  const toggle = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const onUploadImageClick = () => inputFile.current.click();

  const handleFileUpload = (e) => {
    setIsImageUploading(true);
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const mintToken = async () => {
    const web3 = web3Object;
    // Init erc721 smart contract invoke service
    const erc721Minter = new ERC721Minter(web3);
    var accounts = await web3.eth.getAccounts();
    const minter = accounts[0];
    // save data in ipfs
    const uri = await IpfsService.saveMetaData(name, description, imagePreviewUrl);
    const user = {
      address: minter,
      firstname: "steph",
      lastname: "sabates;",
      email: "steph@sbb.com",
      username: "string;"
    }
    const userExists = await userService.getUser(minter);
    console.log(userExists)
    if (!userExists) {
      console.log((await userService.saveUser(user)));
    }
    // get user created nfts
    let newUser = await userService.getUser(minter);
    newUser.nftCount = newUser.nftCount + 1;
    await userService.updateUser(newUser);
    const getToken = (size) => {
      let assetId = "b00000000000000000000000";
      assetId = assetId.substr(0, assetId.length - size.toString().length);
      return assetId + size.toString()
    }
    const tokenId = minter + getToken((newUser.nftCount));
    console.log(tokenId);
    const tokenURI = uri;
    let fees = [];    // mint new nft
    const receipt = await erc721Minter.mintERC721(tokenId, tokenURI, [minter], fees, minter);
    const nftId = receipt.events.Transfer.returnValues.tokenId;

    // save nft logs on database
    const nftObj = {};
    nftObj.assetId = nftId
    nftObj.uri = uri;
    nftObj.contractType = "ERC721";
    nftObj.holder = minter;
    nftObj.price = 0;
    nftObj.lockedData = '';
    const nftDb = await NftService.saveNFT(nftObj);
    console.log(nftDb);
  }

  const handleCheck = (value) => {
    setIsArtType(value);
    setIsDropDownOpen(false);
  }
  return (
    <>
      <div className="hixsnq">
        <Navbar theme={theme} setTheme={setTheme} onClick={toggle} />
        <div className="dXnuYw">
          <div className="kaVtIb" id="BodyContainer">
            <div className="kdBtHC">
              <div className="iGMfXE"></div>
              <div height="0" className="dzDNre">
                <div className="hQHboy"></div>
              </div>
              <div className="cmZvMt">
                <div className="hZkTUW css-bef6zp">BSC Artists</div>
              </div>
              <div className="gHDKa">
                <div className="jLZfGp css-m47n9">1. Artwork information</div>
                <div width="213px" className="guPPJa">
                  <div className="css-1f2zgbm">Artwork Type</div>
                  <div height="54" radius="8px" className="cExwyg">
                    <div color="#FFF3E0" className=" kxOgMT">
                      {isArtType == 1 && <div><img src={Icon} alt="" /> Picture</div>}
                      {isArtType == 2 && <div><img src={ArtworkGif} alt="" /> GIF</div>}
                      {isArtType == 3 && <div><img src={ArtworkVideo} alt="" /> Video</div>}
                      {isArtType == 4 && <div><img src={ArtworkVideo} alt="" /> Audio</div>}
                    </div>
                    <img src={Icondrop} alt="icon" className="dGLyHd" />
                    <input
                      className="laDAZV"
                      onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                    />
                    {isDropDownOpen && (
                      <div className="jYSgCr">
                        <ul className="dropdown-artwork">
                          <li className={`btMzJa ${isArtType == 1 && "CURSELEST"}`} onClick={() => handleCheck(1)}>
                            <div className="kHiJEL">
                              <img
                                d="[object Object]"
                                src={Icon}
                                alt=""
                                className="sc-iYUSvU caGkBb"
                              />
                              <div
                                d="[object Object]"
                                className="sc-cTjmhe sc-cugefK jlBsK"
                              >
                                Picture
                              </div>
                              {isArtType == 1 && <img
                                d="[object Object]"
                                src={tick}
                                alt=""
                                className="sc-sdtwF dmCvbD"
                              />
                              }
                            </div>
                          </li>
                          <li className={`btMzJa ${isArtType == 2 && "CURSELEST"}`} onClick={() => handleCheck(2)}>
                            <div className="kHiJEL">
                              <img
                                d="[object Object]"
                                src={ArtworkGif}
                                alt=""
                                className="caGkBb"
                              />
                              <div d="[object Object]" className="jlBsK">
                                GIF
                              </div>
                              {isArtType == 2 && <img
                                d="[object Object]"
                                src={tick}
                                alt=""
                                className="sc-sdtwF dmCvbD"
                              />
                              }
                            </div>
                          </li>
                          <li className={`btMzJa ${isArtType == 3 && "CURSELEST"}`} onClick={() => handleCheck(3)}>
                            <div className="kHiJEL">
                              <img
                                d="[object Object]"
                                src={ArtworkVideo}
                                alt=""
                                className="caGkBb"
                              />
                              <div d="[object Object]" className="jlBsK">
                                Video
                              </div>
                              {isArtType == 3 && 
                              <img
                                d="[object Object]"
                                src={tick}
                                alt=""
                                className="sc-sdtwF dmCvbD"
                              />
                              }
                            </div>
                          </li>
                          <li className={`btMzJa ${isArtType == 4 && "CURSELEST"}`} onClick={() => handleCheck(4)}>
                            <div className="kHiJEL">
                              <img
                                d="[object Object]"
                                src={ArtworkVideo}
                                alt=""
                                className="caGkBb"
                              />
                              <div d="[object Object]" className="jlBsK">
                                Audio
                              </div>
                              {isArtType == 4 && 
                              <img
                                d="[object Object]"
                                src={tick}
                                alt=""
                                className="sc-sdtwF dmCvbD"
                              />
                              }
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <ArtWorkInput
                  label={"Artwork Name"}
                  value={name}
                  placeholder={"Enter the artwork name"}
                  error={"Enter the artwork name"}
                  onChange={setName}
                />
                <ArtWorkInput
                  label={"Artist Name"}
                  value={artistName}
                  placeholder={"Enter the artist name"}
                  error={"Enter the artist name"}
                  onChange={setArtistName}
                  image={IconPencil}
                />
                <ArtWorkInput
                  label={"Social Media/Portfolio link"}
                  value={""}
                  placeholder={"Personal website, Instagram, Twitter, etc."}
                  error={"Invalid profile link"}
                  onChange={onChange}
                />

                <div height="191px" className="jjoLuU">
                  <div className="fhIakJ">
                    <div className="css-1bj1mt4">Brief Introduction</div>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the brief introduction"
                    className="dIRvWL"
                  ></textarea>
                  <div className="ejQeTB">
                    <div className="kHKvdR">Enter the brief introduction</div>
                  </div>
                </div>
                <div
                  className="jLZfGp css-rmrvr7"
                  style={{
                    padding: "40px 0px 24px",
                    borderTop: "1px solid rgb(91, 74, 56)",
                  }}
                >
                  2. Upload artwork image
                </div>
                <div height="auto" className="fGEyFU">
                  <div className="cGlqHf">
                    <div className="iSnqgL">
                      <div className="hKUVbE iFoCkr">
                        <img
                          src={imagePreviewUrl ? imagePreviewUrl : ArtworkImage}
                          style={{ backgroundImage: "url" }}
                          alt=""
                          className={`kaAOSM`}
                          onClick={onUploadImageClick}
                        />
                        {imagePreviewUrl && (
                          <div
                            class="sc-iVmwPn fequjA cover"
                            onClick={onUploadImageClick}
                          ></div>
                        )}
                        <div className="ejQeTB">
                          <div className="kHKvdR"></div>
                        </div>
                      </div>
                      {imagePreviewUrl && (
                        <div class="sc-fmWklf eiAKnM">
                          <div class="progress-outer">
                            <div
                              class="progress-inner"
                              style={{ width: `${width}%` }}
                            ></div>
                            <img class="progress-img" src={IconBake} alt="" />
                          </div>
                          <img
                            class="progress-num"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMUSURBVHgB7ZhNUhpBFMff64FUUpVKkRuMm4QyVoUbiDeAwFhmpZwgegLxBIknUFcxDgZuAJ4gLCxDVTaTG7Aw0QLnvXSjIAPz0TMMWflfADP99ePfj35vAHhSuBASyK7mi2BgQRC+Z+QcMOTuJ0OHEH4DUcdq9DqQQNpAX7fypuHirkDclpc5jSF9CdoaDungY6vngKYigY5KZu7Vsxf7DLgLScVwrAsWCnRmrRYEclN2M2FhscPEtaitFEEN3yv5bYHQTgdGCU0Uom1X34Y67evQvTPwA5Yk4dLOh/PeCegAqeDNEqbojI8Y+gTDjU37V3e2aW7Lsi4eLRVGCSEnMNP0a/IAnVn5HUAswn8RmvZmvg5hQPKM2YcUxcAnxuDvayTe82tHFp/UseJhGH+wq2vFNLdKBqeTGdzslltOv9L4+SWgU+5l5nnBFwiRSpAaDPbFgDYUjLo+r64GOi9QbPsCyVnWISUR0UH54VT+VnlTYgH1oL4MUPIHAihAGjDMh9bDFo3yn2F8Dh0gt61ZypseoObW443AcTIfkYCaio3gucHJDm/q4+uMi1ppZ5h1J4GdUS93dxl5rFPooIp9VVPvEr5DJNrSatMLo+LG9cQNo57raBgToJFDjNSPGqRym3ovn/YcIWhj1qk4cROmEVDWiAYiQxwHQcWOmyggtYBOZz8ouXUXSeJmWte3t5OcNkmujc1Vld219jwoW4/iJu5WyURbta9eT+aeargATU07NVbSuJHpxbPuBIhZtCCGpqEWiRsB6FnXUw81rHdteeAUIZZYTjiqEHQKf5hZ3KmcXa2AB3B6asYDiC0sJYG5XxDm1purGJO5FF9+7ijNVYyG4ar0EHkuLSpVDfjen72hzheZGsqwRCFTrRzwjOb7GGQ1Ljtq0DKcks9mexW7dxzUHvqgqKoAv0SaRCr5ksCydXrZCesnwhrH6UH+Gg5hERhZuojBn5UomFFf0JRyyyWsy2+6ruOYcoSZTtgwWjogj+MSyN5aKwrmglywIP+EMB8nYwdRdAmxm7m97o5royelqX8n91ocZJiD/gAAAABJRU5ErkJggg=="
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={inputFile}
                      // accept=".jpg, .png, .jpeg"
                      id="imgFile"
                      className="inputFile"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </div>
                </div>
                <div height="auto" className="sc-bUyWVT fGEyFU">
                  <div className="ehrUrB">
                    <input
                      name="checkbox"
                      type="checkbox"
                      className="tui-checkbox"
                      value="Item 1"
                    />
                    <label>
                      I declare that this is an original artwork. I understand
                      that no plagiarism is allowed, and that the artwork can be
                      removed anytime if detected.
                    </label>
                  </div>
                </div>
                <div className="jLZfGp css-1ugs632">
                  Mint an NFT charges 0.01BNB, please do not upload any
                  sensitive content.
                </div>
                <div>
                  <button className="btn-art-wallet" onClick={() => mintToken()}>
                    Mint
                  </button>
                </div>
              </div>
              <div className="iHUqlg"></div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtWork;
