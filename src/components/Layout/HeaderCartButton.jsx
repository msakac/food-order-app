import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

function HeaderCartButton({ onSetShown }) {
    const ctx = useContext(CartContext);

    const numOfCartItems = ctx.items.reduce((currentValue, item) => { 
        return currentValue + item.amount; 
    }, 0);

    return (
        <button className={classes.button} onClick={onSetShown}>
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