import React from 'react';
import Link from 'next/link';


const Product = ({ product: { image, name, slug, price, discount } }) => {
    let discountPrice;
    if (discount && discount !== 0) {
        const percentofprice = (discount / 100) * price;
        discountPrice = price - percentofprice
    }
    return (
        <div>
            <Link href={`/product/${slug}`}>
                <div className="product-card">
                    <img
                        src={image}
                        width={250}
                        height={250}
                        className="product-image"
                    />
                    <p className="product-name">{name}</p>
                    <p className="product-price">Rs.{discountPrice ? <><s>{price}</s> {discountPrice}</> : price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Product