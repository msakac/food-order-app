import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
function Cart({ onSetShown }) {

    const ctx = useContext(CartContext);
    const total = `$${ctx.totalAmount.toFixed(2)}`
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id => { 
        ctx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        ctx.addItem({...item, amount:1});
     };

    return <>
        <Modal onClick={onSetShown}>
            <ul className={classes['cart-items']}>
                {ctx.items.map(item => {
                    return <CartItem
                        key={item.id}
                        item={item}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                    />
                })}
            </ul>
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{total}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={onSetShown}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    </>
}

export default Cart;