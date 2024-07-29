import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchProductos, createProducto, updateProducto, deleteProducto } from '@/lib/api';

export default function ProductoForm() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [selectedProducto, setSelectedProducto] = useState(null);

  const { data: productos, refetch } = useQuery(['productos'], fetchProductos);

  const createMutation = useMutation(createProducto, {
    onSuccess: () => {
      refetch();
      setNombre('');
      setPrecio('');
    },
  });

  const updateMutation = useMutation((id) => updateProducto(id, { nombre, precio }), {
    onSuccess: () => {
      refetch();
      setNombre('');
      setPrecio('');
    },
  });

  const deleteMutation = useMutation(deleteProducto, {
    onSuccess: () => refetch(),
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createMutation.mutate({ nombre, precio });
  };

  const handleUpdate = (id) => {
    updateMutation.mutate(id);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <h1>Productos</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Precio</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <button type="submit" disabled={createMutation.isLoading}>Crear Producto</button>
      </form>
      <ul>
        {productos?.map((producto) => (
          <li key={producto._id}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => handleUpdate(producto._id)}>Actualizar</button>
            <button onClick={() => handleDelete(producto._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
