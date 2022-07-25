import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

function Header({onSetShown}) {
    return <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onSetShown={onSetShown}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="Table and food" />
        </div>
    </>
}

export default Header;