import React, {useState,useEffect,useContext,createContext}from 'react'
import {toast} from 'react-hot-toast'
const Context = createContext()
export const StateContext = ({children}) => {
  let Cart;
  let total;
  if(typeof window !== 'undefined'){
    Cart = JSON.parse(localStorage.getItem('cart'));
    
    total = Cart?.map((i)=> { 
      let discountPrice;
        if (i.discount && i.discount !== 0) {
        const percentofprice = (i.discount / 100) * i.price;
        discountPrice = i.price - percentofprice
        }
        const price = discountPrice ? discountPrice * i.quantity : i.price * i.quantity
      return price}).reduce((a,c)=> a+c,0)
  };

    const[showCart,setShowCart] = useState(false);
    const[cartItems,setCartItems] = useState(Cart||[]);
    const [totalPrice,setTotalPrice] = useState(total||0);
    const[totalQuantities,setTotalQuantities] = useState(0);
    const [qty,setQty]= useState(1);

    useEffect(()=>{
      localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems])
    
    const onAdd = (product,quantity)=>{
        const checkProductInCart = cartItems.find((item)=> item._id === product._id);
        let discountPrice;
        if (product.discount && product.discount !== 0) {
        const percentofprice = (product.discount / 100) * product.price;
        discountPrice = product.price - percentofprice
        }
        const price = discountPrice ? discountPrice * quantity : product.price * quantity
        setTotalPrice((prevPrice)=> prevPrice + price);
        console.log(totalPrice)
        setTotalQuantities(prevQty => prevQty + quantity);
        if(checkProductInCart){
            const updatedCartItems = cartItems.map(cp=> {
                if(cp._id === product._id) return {
                    ...cp,
                    quantity: cp.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
            
        }else{
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        let discountPrice;
        if (foundProduct.discount && foundProduct.discount !== 0) {
        const percentofprice = (foundProduct.discount / 100) * foundProduct.price;
        discountPrice = foundProduct.price - percentofprice
        }
        const price = discountPrice ? discountPrice * foundProduct.quantity : foundProduct.price * foundProduct.quantity
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice - price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
      }
    let foundProduct
    let index
    const toggleCartItemQuantity = (id,value)=>{
         index = cartItems.findIndex(product => product._id === id);
         const newCartItems = cartItems.filter((item) => item._id !== id);
         
    if(value === 'inc') {
        setCartItems(cartItems.map(item =>  item._id === id 
          ? {...item, quantity : item.quantity + 1} 
          : item ));
          foundProduct = cartItems.find(item=> item._id === id);
          let discountPrice;
          if (foundProduct.discount && foundProduct.discount !== 0) {
            const percentofprice = (foundProduct.discount / 100) * foundProduct.price;
            discountPrice = foundProduct.price - percentofprice
            }
            const price = discountPrice ? discountPrice : foundProduct.price;
        setTotalPrice((prevTotalPrice) => prevTotalPrice + price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if(value === 'dec') {
        foundProduct = cartItems.find(item=> item._id === id);
        if (foundProduct.quantity > 1) {
          setCartItems(cartItems.map(item =>  item._id === id 
            ? {...item, quantity : item.quantity - 1} 
            : item ));
          foundProduct = cartItems.find(item=> item._id === id);
          let discountPrice;
          if (foundProduct.discount && foundProduct.discount !== 0) {
            const percentofprice = (foundProduct.discount / 100) * foundProduct.price;
            discountPrice = foundProduct.price - percentofprice
            }
            const price = discountPrice ? discountPrice : foundProduct.price;
           setTotalPrice((prevTotalPrice) => prevTotalPrice - price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
      }
    }
    const incQty = ()=>{
        setQty((prev)=> prev + 1);
    }
    const decQty = () =>{
        setQty((prev)=>{
            if(prev - 1 < 1) return 1;
            return prev - 1
        })
    }

  return (
   <Context.Provider value={{
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    setShowCart,
    qty,
    incQty,
    decQty,
    onAdd,
    onRemove,
    toggleCartItemQuantity,
    setCartItems,
    setTotalPrice,
    setTotalQuantities}}>
    {children}
   </Context.Provider>
  )
}
export const useStateContext = ()=> useContext(Context)