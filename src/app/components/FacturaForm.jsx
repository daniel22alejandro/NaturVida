import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchFacturas, createFactura, updateFactura, deleteFactura } from '@/lib/api';

export default function FacturaForm() {
  const [codigo, setCodigo] = useState('');
  const [valor, setValor] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [vendedorId, setVendedorId] = useState('');

  const { data: facturas, refetch } = useQuery(['facturas'], fetchFacturas);

  const createMutation = useMutation(createFactura, {
    onSuccess: () => {
      refetch();
      setCodigo('');
      setValor('');
      setClienteId('');
      setVendedorId('');
    },
  });

  const updateMutation = useMutation((id) => updateFactura(id, { codigo, valor, clienteId, vendedorId }), {
    onSuccess: () => {
      refetch();
      setCodigo('');
      setValor('');
      setClienteId('');
      setVendedorId('');
    },
  });

  const deleteMutation = useMutation(deleteFactura, {
    onSuccess: () => refetch(),
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createMutation.mutate({ codigo, valor, clienteId, vendedorId });
  };

  const handleUpdate = (id) => {
    updateMutation.mutate(id);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <h1>Facturas</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label>Código</label>
          <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
        </div>
        <div>
          <label>Valor</label>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
        </div>
        <div>
          <label>ID Cliente</label>
          <input type="text" value={clienteId} onChange={(e) => setClienteId(e.target.value)} required />
        </div>
        <div>
          <label>ID Vendedor</label>
          <input type="text" value={vendedorId} onChange={(e) => setVendedorId(e.target.value)} required />
        </div>
        <button type="submit" disabled={createMutation.isLoading}>Crear Factura</button>
      </form>
      <ul>
        {facturas?.map((factura) => (
          <li key={factura._id}>
            {factura.codigo} - ${factura.valor}
            <button onClick={() => handleUpdate(factura._id)}>Actualizar</button>
            <button onClick={() => handleDelete(factura._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
