import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities, cartItems } = useStateContext()
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    return (
        <div className="navbar-container">
            <p className="logo">
                <Link href="/">SCAM SHOP</Link>
            </p>

            <button type="button" className="cart-icon" onClick={() => setShowCart(!showCart)}>
                <AiOutlineShopping />
                <span className="cart-item-qty">{cartItems.length}</span>
            </button>
            {showCart && <Cart />}
        </div>
    )
}

export default Navbar