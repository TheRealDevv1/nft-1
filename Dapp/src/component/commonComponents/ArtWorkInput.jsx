import React, { useState } from "react";

const ArtWorkInput = ({
  label,
  value,
  placeholder,
  error,
  onChange,
  image,
}) => {
  return (
    <>
      <div className="jCCrnv">
        <div className="fhIakJ">
          <div className="css-1bj1mt4">{label}</div>
          {image && (
            <button width="30px" height="30" className="icFYDZ">
              <img src={image} alt="" />
            </button>
          )}
        </div>
        <input placeholder={placeholder} onChange = {(e)=>onChange(e.target.value)} className="jnOeAi" value={value} />
        <div className="ejQeTB">
          <div className="kHKvdR">{error}</div>
        </div>
      </div>
    </>
  );
};

export default ArtWorkInput;
