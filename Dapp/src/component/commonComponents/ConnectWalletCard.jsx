import CardHeart from "../../assets/CardHeart.svg";
import { formatPrice } from "../../utilities/helper";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ConnectWalletCard = ({
  nft,
  id,
  name,
  image,
  url,
  likesCount,
  bakeCount,
  toggle,
}) => {
    let history = useHistory();
    const checkDetaits = (nft) => {
      history.push('/wallet-detail', nft);
    }
  return (
    <a onClick={()=>checkDetaits(nft)} className="wallet-Card-Main">
      <button className="btn-wallet-approve">Approve Vote</button>
      <div className="wallet-Card-Item">
        <div
          className="Item-1"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div className="Lower-Card">
        <div className="Lower-Card-Item">
          {name}
          <span> — </span>
          <a>{url}</a>
        </div>

        <div className="Card-Like-Wrap">
          <div className="Card-Like">
            <img src={CardHeart} alt="logo" style={{ height: "20px" }} />
            <div className="Count">{likesCount}</div>
          </div>
          <div className="Bake-Count">{formatPrice(bakeCount)} Bake</div>
        </div>
      </div>
      {nft?.offers[0]?.isForSell &&
          <button onClick={checkDetaits} className="Card-Btn">
            {nft.offers[0]?.isForAuction?'Bid now':'Buy now'}
        </button>
      }
      {!nft?.offers[0]?.isForSell &&
          <button onClick={checkDetaits} className="Card-Btn">
            Not for sell
        </button>
      }
      
    </a>
  );
};

export default ConnectWalletCard;
