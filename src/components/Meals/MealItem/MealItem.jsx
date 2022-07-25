import MealItemForm from '../MealItemForm/MealItemForm';
import classes from './MealItem.module.css';
import {useContext} from 'react';
import CartContext from '../../../store/cart-context';


function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);
    const price =`$${meal.price.toFixed(2)}`

    const onAddToCart = amount => {cartCtx.addItem({...meal, amount:amount})};

    return (
        <li className={classes.meal}>
            <div>
                <h3>{meal.name}</h3>
                <div className={classes.description}>{meal.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm mealId={meal.id} onAddToCart={onAddToCart}/>
            </div>
        </li >
    );
}

export default MealItem;