import React from 'react'
import Link from 'next/link'

const HeroBanner = ({ banner }) => {
    return (
        <div className='hero-banner-container'>
            <div>
                <h3>{banner?.saleName}</h3>
                <h1>{banner?.discount}%</h1>
                <p className='beats-solo'>OFF</p>
                <img src={banner?.image} className="hero-banner-image" />
                <div>
                    <Link href={`/product/${banner?.slug}`}>
                        <button type='button'>SHOP NOW</button>
                    </Link>
                    <div className="desc">
                        <h5>Dont miss!</h5>
                        <p>{banner?.timePeriod}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner