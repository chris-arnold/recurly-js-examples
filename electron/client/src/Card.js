import React from 'react';

import {
  CardElement,
  Elements,
  RecurlyProvider,
  useRecurly
} from '@recurly/react-recurly';

export function Card () {
  return (
    <div className="DemoSection">
      <RecurlyProvider publicKey={process.env.REACT_APP_RECURLY_PUBLIC_KEY}>
        <Elements>
          <CardForm fontSize={`${fontSize}px`} />
        </Elements>
      </RecurlyProvider>
    </div>
  );
}

function CardForm (props) {
  const recurly = useRecurly();
  const formRef = React.useRef();

  const handleSubmit = event => {
    if (event.preventDefault) event.preventDefault();

    recurly.token(formRef.current, async (err, token) => {
      if (err) {
        throw err;
      } else {
        const body = JSON.stringify({ 'recurly-token': token.id });
        const headers = { 'Content-Type': 'application/json' }
        const url = `${process.env.API_URL || 'http://localhost:9001'}/api/subscriptions/new`

        const options = {
          method: 'POST',
          body,
          headers
        }

        fetch(url, options);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div>
        <input
          data-recurly="first_name"
          placeholder="First Name"
          defaultValue="John"
        />
        <input
          data-recurly="last_name"
          placeholder="Last Name"
          defaultValue="Rambo"
        />
        <input
          data-recurly="postal_code"
          placeholder="Postal Code"
          defaultValue="94117"
        />
      </div>
      <CardElement />
      <div>
        <button>Pay</button>
      </div>
    </form>
  );
}
