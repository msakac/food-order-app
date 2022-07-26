import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.length !== 5;


const Checkout = (props) => {
    const [formInputsValiditiy, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostal = postalRef.current.value;
        const enteredCity = cityRef.current.value;

        const nameValid = !isEmpty(enteredName)
        const cityValid = !isEmpty(enteredCity)
        const streetValid = !isEmpty(enteredStreet)
        const postalValid = !isNotFiveChars(enteredPostal)

        setFormInputsValidity({
            name: nameValid,
            street: streetValid,
            city: cityValid,
            postalCode: postalValid
        })

        console.log('dela')
    };

    const postalControlClasses = `${classes.control} ${formInputsValiditiy.postalCode ? '' : classes.invalid}`;
    const nameControlClasses = `${classes.control} ${formInputsValiditiy.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValiditiy.street ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValiditiy.city ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameRef} type='text' id='name' />
                {!formInputsValiditiy.name && <p>Name is not valid</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input ref={streetRef} type='text' id='street' />
                {!formInputsValiditiy.street && <p>Street is not valid</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalRef} type='text' id='postal' />
                {!formInputsValiditiy.postalCode && <p>Postal is not valid</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input ref={cityRef} type='text' id='city' />
                {!formInputsValiditiy.city && <p>City is not valid</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
