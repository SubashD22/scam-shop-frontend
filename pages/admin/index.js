import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link'

const bannerForm = ({products}) => {
  const [formData,setFormData] = useState({
    saleName:'',
    discount:'',
    timePeriod:'',
    image:'',
    slug:''
  })
  const onToggleCheck=(e)=>{
    setFormData((pdata)=>({
      ...pdata,
      [e.target.name]:e.target.value
     }))
  }
  const{saleName,discount,timePeriod,image} = formData;

   const onInputChange = (e,type)=>{
      console.log(e.target.files)
     const value = type==='img'? e.target.files[0]: e.target.value
     setFormData((pdata)=>({
      ...pdata,
      [e.target.name]:value
     }))
    };
    let disable = false
    const submit = async(e)=>{
        e.preventDefault();
        disable = true
        const Data = new FormData;
        for(let key in formData){
         Data.append(key, formData[key])
        }
        const response = await axios.post('http://localhost:5000/api/banner',Data);
        if (response){
         setFormData({
            saleName:'',
            discount:'',
            timePeriod:'',
            image:''
         })
         disable = false
         toast.success('Banner updated')
        }
     }
     const [hydrated, setHydrated] = React.useState(false);
     React.useEffect(() => {
         setHydrated(true);
     }, []);
     if (!hydrated) {
         return null;
     }
  return (
    <div> <Link style={{margin:'0 auto',
    color:'gray'}} href='/admin/newproduct'>Add New Product ?</Link> 
    <div className="container">
     
    
      <form onSubmit={submit}>
    <div className="row">
      <div className="col-25">
        <label for="saleName">Sale Name</label>
      </div>
      <div className="col-75">
        <input type="text" id="saleName" name="saleName" value={saleName} onChange={(e)=>onInputChange(e,'text')} required disabled={disable}/>
      </div>
    </div>
    <div className="row">
      <div className="col-25">
        <label for="discount">Discount</label>
      </div>
      <div className="col-75">
        <input type="number" id="discount" name="discount" value={discount} max={90} min={10} onChange={(e)=>onInputChange(e,'text')} required disabled={disable}/>
      </div>
    </div>
    <div className="row">
      <div className="col-25">
        <label for="timePeriod">Time Period</label>
      </div>
      <div className="col-75">
        <input type="text" id="timePeriod" name="timePeriod" value={timePeriod} onChange={(e)=>onInputChange(e,'text')} required disabled={disable}/>
      </div>
    </div>
    <div className="row">
      <div className="col-25">
        <label className='uploadButton' for="image">Upload</label>
      </div>
      <div className="col-75">
        <img style={{width:'200px',height:'200px'}}src={image !== '' ? URL.createObjectURL(image) : null} alt="" />
        <input type='file' id="image" name="image" onChange={(e)=>onInputChange(e,'img')} style={{display:"none"}} required disabled={disable}/>
      </div>
    </div>
    <div>
      <ul>
      {products.map((product,i)=>{
        return(<li key={i} style={{listStyle:'none'}}>
          <input type='radio' id={product.name} name='slug' value={product.slug} onChange={onToggleCheck} disabled={disable}/>
          <label for={product.name}><img style={{width:'150px',height:'150px'}} src={product.image} alt={product.name}/>{product.name}</label>
        </li>)
      })}
      </ul>
    </div>
    <div className="row">
      <button className='bannerButton' type='submit' disabled={disable}>SUBMIT</button>
     </div>
    </form>
</div> 
</div>
)
}
export const getServerSideProps = async()=>{
  const domain = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_PROD_URL
  const products = await axios.get(`${domain}/api/products`)
  return{props:{
    products:products.data
  }}
}  

export default bannerForm