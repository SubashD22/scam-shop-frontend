import React from "react";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import getStripe from "../../Lib/getStripe";
import { toast } from "react-hot-toast";
import axios from "axios";
const ProductDetails = ({ product }) => {
  const { image, name, description, price, discount } = product;
  let discountPrice;
  if (discount && discount !== 0) {
    const percentofprice = (discount / 100) * price;
    discountPrice = price - percentofprice;
  }
  const { qty, incQty, decQty, onAdd } = useStateContext();
  const handleBuyNow = async () => {
    const stripe = await getStripe();
    const response = await axios.post("/api/stripe", [
      {
        name: product.name,
        price: discountPrice ? discountPrice : product.price,
        quantity: qty,
      },
    ]);
    if (response.statusCode === 500) return;
    const data = response.data;
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={image} alt="" className="product-detail-image" />
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
          </div>
          <h4>Details:</h4>
          <p>{description}</p>
          <p className="price">
            Rs.
            {discountPrice ? (
              <>
                <s>{price}</s> {discountPrice}
              </>
            ) : (
              price
            )}
          </p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const domain =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_URL
      : process.env.NEXT_PUBLIC_PROD_URL;
  const product = await axios.get(`${domain}/api/products/${id}`);

  return {
    props: {
      product: product.data,
    },
  };
};

export default ProductDetails;
