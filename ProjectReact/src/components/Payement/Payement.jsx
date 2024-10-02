import React, { useEffect } from 'react';
import { loadScript } from '@paypal/paypal-js';

function Payment() {
    useEffect(() => {
        const script = loadScript({ 'client-id': 'AV1Ca15_zDrbXNwGEsO-9nfiH89O3hYI_xWpbCQVW-EBBJ94mH3YmEFbCoMyyyMmX4dS7wUEC_wRF4Ah&currency=CAD' });
        script
            .then(() => {
                paypal.Buttons({
                    style: {
                        color: 'blue' // Définit la couleur du bouton sur bleu
                    },
                    createOrder: function (data, actions) {
                        // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton PayPal
                        // Elle crée la commande avec le montant spécifié (100,10 dollar dans ce cas)
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '100.10'
                                }
                            }]
                        })
                    },
                    onApprove: function (data, actions) {
                        // Cette fonction est appelée lorsque l'utilisateur approuve la transaction PayPal
                        // Elle capture les fonds de la transaction et redirige vers la page "success.html"
                        return actions.order.capture().then(function (details) {
                            console.log(details); // Affiche les détails de la transaction dans la console
                            window.location.replace("success.html"); // Redirige vers la page "success.html"
                        })
                    }
                }).render('#paypal-payment-button'); // Affiche le bouton PayPal dans l'élément avec l'ID 'paypal-payment-button'

                // Initialisez ici le bouton PayPal ou effectuez d'autres actions nécessaires
                console.log('PayPal script loaded successfully');
            })
            .catch((err) => {
                console.error('Failed to load PayPal script:', err);
            });
    }, []);

    return (
        <section>
            <h1>Payment</h1>
            <div id="paypal-payment-button"></div>
        </section>
    );
}

export default Payment;
