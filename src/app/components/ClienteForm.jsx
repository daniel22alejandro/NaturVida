import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchClientes, createCliente, updateCliente, deleteCliente } from '@/lib/api';

export default function ClienteForm() {
  const [nombre, setNombre] = useState('');
  const [selectedCliente, setSelectedCliente] = useState(null);

  const { data: clientes, refetch } = useQuery(['clientes'], fetchClientes);

  const createMutation = useMutation(createCliente, {
    onSuccess: () => {
      refetch();
      setNombre('');
    },
  });

  const updateMutation = useMutation((id) => updateCliente(id, { nombre }), {
    onSuccess: () => {
      refetch();
      setNombre('');
    },
  });

  const deleteMutation = useMutation(deleteCliente, {
    onSuccess: () => refetch(),
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createMutation.mutate({ nombre });
  };

  const handleUpdate = (id) => {
    updateMutation.mutate(id);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <h1>Clientes</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <button type="submit" disabled={createMutation.isLoading}>Crear Cliente</button>
      </form>
      <ul>
        {clientes?.map((cliente) => (
          <li key={cliente._id}>
            {cliente.nombre}
            <button onClick={() => handleUpdate(cliente._id)}>Actualizar</button>
            <button onClick={() => handleDelete(cliente._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
