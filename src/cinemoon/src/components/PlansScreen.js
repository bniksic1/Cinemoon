import React, {useEffect, useState} from 'react';
import './PlansScreen.css';
import axios from "axios";

const PlansScreen = ({user}) => {
    const [products, setProducts] = useState([]);

    console.log(user);

    const subscribePlan = () => {

    }

    const unsubscribePlan = () => {

    }

    const mapProducts = products.map(product => (
        <div className="plansScreen__plan">
            <div className="plansScreen__info">
                <h5>{product.name}</h5>
                <h6>{product.description}</h6>
            </div>
            {
                product.id === user.planId ?
                    <button onClick={() => unsubscribePlan}>Unsubscribe</button>
                    :
                    <button onClick={() => subscribePlan}>Subscribe</button>
            }
        </div>
    ))

    useEffect(() => {
        axios.get("http://localhost:8080/api/plan")
            .then(res => res.data)
            .then(plans => setProducts(plans))
            .catch(err => alert(err.message))
    }, []);

    return (
        <div className="plansScreen">
            {mapProducts}
        </div>
    );
};

export default PlansScreen;