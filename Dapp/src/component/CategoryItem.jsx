import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ name, url, image, activeNav }) => {
  let counter = 0;
  return (
    <>
      <Link
        className={`cat-items ${activeNav}`}
        activeclass="ACTIVENAV"
        to="/profile"
      >
        {useState}
        {name}
        {image && <img src={image} width="24" className="sc-jMtzgO hZyyre" />}
      </Link>
    </>
  );
};

export default CategoryItem;
