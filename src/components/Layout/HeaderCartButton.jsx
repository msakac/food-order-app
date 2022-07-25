import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

function HeaderCartButton({ onSetShown }) {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const ctx = useContext(CartContext);

    const numOfCartItems = ctx.items.reduce((currentValue, item) => { 
        return currentValue + item.amount; 
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

    const {items} = ctx;

    useEffect(()=>{
        if(items.length === 0 ){
            return;
        }
        setBtnIsHighlighted(true);
        
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={onSetShown}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numOfCartItems}
            </span>
        </button>
    )

}

export default HeaderCartButton;