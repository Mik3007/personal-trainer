import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Register = () => {
  const { loginWithRedirect } = useAuth0();

  const handleRegister = () => {
    loginWithRedirect({ screen_hint: 'signup' });
  };

  return (
    <div>
      <h2>Registrazione</h2>
      <button onClick={handleRegister}>Registrati</button>
    </div>
  );
};

export default Register;