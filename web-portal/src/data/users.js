export const USERS = [
    {
        id: '1',
        email: 'solicitante@mail.com',
        password: '123',
        role: 'SOLICITANTE',
        name: 'Ana Solicitante'
    },
    {
        id: '2',
        email: 'proveedor@mail.com',
        password: '123',
        role: 'PROVEEDOR_SERVICIO',
        name: 'Roberto Servicio'
    },
    {
        id: '3',
        email: 'insumos@mail.com',
        password: '123',
        role: 'PROVEEDOR_INSUMO',
        name: 'Maria Insumos'
    },
];

// Función helper para encontrar un usuario
export const findUser = (email, password) => {
    return USERS.find(u => u.email === email && u.password === password);
};