import { useState } from "react";
import IconHotLight from "../assets/iconHotLight.svg";
import IconNewLight from "../assets/iconNewLight.svg";
import ImgMore from "../assets/more.svg";
import CategoryItem from "./CategoryItem";

const featuredArtists = [
  {
    name: "SWOG",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "CoralCorp",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Cookie Munster",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "srnArtGallery",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "srnArtGallery",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Chiara Magni",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Hamid",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Muwasha iProjects",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Irene Cerezo",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "TSA Collections",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Mr Anderson",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Manzo",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "ELINE",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Aightek",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "ernkurtel",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Nude Robot",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Theblacksea_NFT",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "ToyBoy",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Gerz",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
  {
    name: "Heuckendorff",
    url: "#/usercenter/0x25d199B6f9EFe9b29d2e71FA72CFFaB24F9d6B51/CREATED",
  },
];

const gamificationNft = [
  {
    name: "Rare Car",
    url: "#/exchange",
    image: IconNewLight,
  },
  {
    name: "Bakery Combos",
    url: "#/exchange/bakeryCombos",
  },
  {
    name: "BakerySoccer",
    url: "#/exchange/bakerySoccer",
  },
  {
    name: "Battle Pets",
    url: "#/exchange/pets",
  },
  {
    name: "Weapons",
    url: "#/exchange/weapons",
  },
  {
    name: "Pet Eggs",
    url: "#/exchange/pet-eggs",
  },
];

const digitalArtworks = [
  {
    name: "BSC Artists",
    url: "#/exchange/new-artworks",
    image: IconHotLight,
  },
  {
    name: "SafeNFT",
    url: "#/exchange/sfpNft",
  },
  {
    name: "Musk&Doge",
    url: "#/exchange/musk-doge",
  },
  {
    name: "1inch&BAKE",
    url: "#/exchange/oneInch",
  },
  {
    name: "BTC Artworks",
    url: "#/exchange/digital-artworks",
  },
  {
    name: "Seascape",
    url: "#/exchange/seascape",
  },
  {
    name: "Binance NFT",
    url: "#/exchange/binance-nft",
  },
  {
    name: "TKO NFT",
    url: "#/exchange/tko-nft",
  },
];

const Category = () => {
  const [showAllFeaturedArtists, setShowAllFeaturedArtists] = useState(false);

  return (
    <div className="category-container">
      <div className="inner-category-container">
        <div className="cat-heading">Featured Artists:</div>
        <div className="cat-items-wrapper">
          {featuredArtists.map((item, index) => {
            return (
              <div key={index}>
                {!showAllFeaturedArtists && index < 11 && (
                  <CategoryItem key={index} name={item.name} url={item.url} />
                )}
                {showAllFeaturedArtists && (
                  <CategoryItem key={index} name={item.name} url={item.url} />
                )}
              </div>
            );
          })}
        </div>
        <span
          className={`img-more ${showAllFeaturedArtists ? "ACTIVESCROLL" : ""}`}
          onClick={() => setShowAllFeaturedArtists(!showAllFeaturedArtists)}
        >
          More
          <img src={ImgMore} alt="" />
        </span>
      </div>
      <div className="inner-category-container">
        <div className="cat-heading">Digital Artworks:</div>
        <div className="digi-art-wrapper">
          {digitalArtworks.map((item, index) => {
            return (
              <CategoryItem
                key={index}
                activeNav={index === 0 ? "ACTIVENAV" : ""}
                name={item.name}
                url={item.url}
                image={item.image ? item.image : null}
              />
            );
          })}
        </div>
      </div>
      <div className="inner-category-container">
        <div className="cat-heading">Gamification NFT:</div>
        {gamificationNft.map((item, index) => {
          return (
            <CategoryItem
              key={index}
              name={item.name}
              url={item.url}
              image={item.image ? item.image : null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
