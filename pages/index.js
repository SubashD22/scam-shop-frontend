import axios from 'axios';
import HeroBanner from'../components/HeroBanner';
import Product from '../components/Product';

export default function Home({products,banner}) {
  return (
    <div>
      <HeroBanner banner={banner}/>
      <div className='products-heading'>
       <h2>Best looking banner</h2>
       <p>Shirts of many colors</p>
      </div>
      <div className='products-container'>
        {products?.map(p=> <Product key={p._id} product={p}/>)}
      </div>
    </div>
  )
}
export const getServerSideProps = async()=>{
  const products = await axios.get('http://localhost:5000/api/products')
  const banner = await axios.get('http://localhost:5000/api/banner')
  return{props:{
    products:products.data,banner:banner.data
  }}
}  