import React, {useEffect, useState} from 'react';
import './PlansScreen.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, update} from "../features/userSlice";

const PlansScreen = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    const subscribePlan = (productId) => {
        dispatch(update({planId: productId}));
    }

    const unsubscribePlan = () => {
        console.log("UNSUB");
        dispatch(update({planId: null}));
    }

    const mapProducts = products.map(product => (
        <div className="plansScreen__plan">
            <div className="plansScreen__info">
                <h5>{product.name}</h5>
                <h6>{product.description}</h6>
            </div>
            {
                product.id === user.planId ?
                    <button onClick={() => unsubscribePlan} className="plansScreen__subscribed">Subscribed</button>
                    :
                    <button onClick={() => subscribePlan(product.id)}>Subscribe</button>
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