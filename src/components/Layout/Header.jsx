import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';

function Header() {
    return <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <button>Cart</button>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="Table and food" />
        </div>
    </>
}

export default Header;