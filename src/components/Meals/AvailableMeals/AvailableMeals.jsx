import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

function AvailableMeals() {

    const [isLoading, setIsLoading] = useState(true);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-daf75-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
            const responseData = await response.json();
            const loadedMeals = [];
            for(const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        }
        fetchMeals()
    }, [])

    if(isLoading){
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }

    const mealsList = meals.map(meal => <MealItem key={meal.id} meal={meal} />);

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>

}

export default AvailableMeals;