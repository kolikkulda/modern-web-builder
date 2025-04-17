import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert('Chyba při zpracování platby: ' + error.message);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      alert(`Platba za ${product.name} (${product.price}$) byla úspěšná!`);
      // Zde byste normálně odeslali paymentMethod.id na váš backend pro zpracování
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <CardElement className="border rounded p-2 mb-2" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Zaplatit ${product.price}
      </button>
    </form>
  );
};

export default CheckoutForm;