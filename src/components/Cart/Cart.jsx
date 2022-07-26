import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout';
function Cart({ onSetShown }) {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const ctx = useContext(CartContext);
    const total = `$${ctx.totalAmount.toFixed(2)}`
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        ctx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmiting(true);
        await fetch('https://react-daf75-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: ctx.items
            })
        });
        setIsSubmiting(false);
        setDidSubmit(true);
        ctx.clearCart();
    };

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onSetShown}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>;


    const cartModalContent = <><ul className={classes['cart-items']}>
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
        {isCheckout ? <Checkout onConfirm={submitOrderHandler} onClose={onSetShown} /> : modalActions} </>;

    const isSubmitingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = <>
        <p>Your order was ordered</p>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onSetShown}>Close</button>
        </div>
    </>
    return <>
        <Modal onClick={onSetShown}>
            {!isSubmiting && !didSubmit && cartModalContent}
            {isSubmiting && isSubmitingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    </>
}

export default Cart;