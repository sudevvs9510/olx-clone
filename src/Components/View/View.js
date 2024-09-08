import React from 'react';

import './View.css';
function View({ product }) {
  console.log(product, "this is view its perfect");
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={product?.Image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product?.Price} </p>
          <span>{product?.Title}</span>
          <p>{product?.Description}</p>
          <span>{product?.Date}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Seller Name : {product?.name}</p>
          <p>Seller email: {product?.email}</p>
          <p>Seller Phone Number : {product?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
