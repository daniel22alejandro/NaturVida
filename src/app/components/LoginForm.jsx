import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/lib/auth';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const mutation = useMutation(authenticateUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      router.push('/clientes');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ usuario, password });
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={mutation.isLoading}>Iniciar sesión</button>
      </form>
    </div>
  );
}
