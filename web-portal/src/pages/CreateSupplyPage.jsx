import { useState } from 'react';
import { useSupplies } from '../context/SupplyContext';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

export default function CreateSupplyPage(){
    //obtener funciones y datos globales
    const {user}= useAuth();
    const {createSupply}=useSupplies();
    const navigate = useNavigate();
    //estados locales para el formulario
    const [name, setName] =useState('');
    const [description, setDescription]= useState('');
    //nuevos estados para los datos numericos
    const [price, setPrice] = useState('');
    const [stock, setStock] =useState('');

    const handleSubmit = (e) => {
        //prevenir la recarga de la pagina
        e.preventDefault();
        //construir el objeto supplyData con todos los estados y la informacion del usuario (user.id,user.name)
        const supplyData = {
            name: name,
            description: description,
            price: price,
            stock: stock,
            //datos del proveedor que se vincularan al insumo 
            authorId: user.id,
            authorName: user.name,
        };

        //llamada a createSupply
        createSupply(supplyData);

        //redirigir al Dashboard
        navigate('/');

    };

    return (
        <div style={{padding:'20px',maxWidth : '600px',margin: '0 auto'}}>
            <h2>Crear Nuevo Insumo</h2>
            <p>Proveedor: {user.name}</p>
            {/*...( formulario) */}
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column',gap:'15px'}}>
                {/*campo nombre */}
                <div>
                    <label htmlFor='name'>Nombre del Insumo</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange ={(e)=> setName(e.target.value)}
                        required
                        style={{padding: '8px', width: '100%', boxSizing : 'border-box'}}
                    />
                </div>
                {/* campo de descripcion */}
                <div>
                    <label htmlFor='description'>Descripción</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.tarfet.value)}
                        required
                        style={{padding: '8px', width: '100%', boxSizing: 'border-box'}}
                    />
                </div>
                {/*campo precio */}
                <div>
                    <label htmlFor='price'>Precio (por unidad) </label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e)=> setPrice(e.target.value)}
                        required
                        style={{padding: '8px', width: '100%', boxSizing: 'border-box'}}
                    />
                </div>
                {/*campo stock */}
                <div>
                    <label htmlFor='stock'>Stock Disponible</label>
                    <input
                        id="stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Publicar Insumo
                </button>
            </form>
        </div>
    );
}