import React from "react";

const DropDown = ({ data }) => {
  console.log("data", data);
  return (
    <>
      <div className="sc-drKuOJ jsxLsw">
        <ul className="sc-gRnDUn kMPAcf">
          {data.map((item, index) => {
            return (
              <li
                key={index}
                className={`sc-cmjSyW bTwXNg ${index === 0 ? "CURSELEST" : ""}`}
              >
                <div className="sc-kkGfuU lfjrKV">
                  <img
                    style={{ visibility: index === 0 ? "visible" : "hidden" }}
                    src={item.checkIcon}
                    alt=""
                    className="sc-sdtwF cesPaB"
                  />
                  <div className="sc-cTjmhe khqXDl">{item.text}</div>
                </div>
                {item.sortIcon && (
                  <img
                    src={item.sortIcon}
                    alt=""
                    className="sc-cHSUfg ilUffP"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
