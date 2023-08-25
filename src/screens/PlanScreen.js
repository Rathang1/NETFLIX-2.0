import React, { useEffect, useState } from 'react';
import './PlanScreen.css';
import db from '../firebase';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('products')
        .where('active', "==", true)
        .get().then(querySnapshot => {
            const products = [];
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
        });
        setProducts(products);
    });
}, []);

const loadCheckout = async (priceId) => {
    const docRef = await db
    .collection('customers')
    .doc(user.uid)
    .collection('checkout_sessions')
    .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });
    docRef.onSnapshot(async (snap) => {
        const {error, sessionId} = snap.data();

        if (error) {
            alert(`An error occured: ${error.message}`);
        }

        if (sessionId) {
            const stripe = await loadStripe('pk_test_51KNLPHHdRNktWjdxBPwrEMXJ98lyErPtCoMZfU4yyCJE0KcASZQFWLMnQ6R8GQnTQ1vamRiKYq74zuHBVQ98tKPy00yFGzJGrF');
            stripe.redirectToCheckout({ sessionId });
        }
    });

}

  return (
    <div className='planScreen'>
    {Object.entries(products).map(([productId,  productData]) => {
        return (
            <div className="planScreen__plan">
                <div className="planScreen__info">
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                </div>
                <button onClick={() => loadCheckout(productData.prices.priceId)}> 
                    Subscribe 
                </button> 
            </div>
        );
    })}
    </div>
  )
}

export default PlanScreen