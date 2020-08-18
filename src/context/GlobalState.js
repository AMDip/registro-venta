import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  productos: [{
    id: 1, 
    nombre: "Mirinda Manzana", 
    marca: "Coca Cola",
    fechaVencimiento: "01-01-1989",
    precioUnitario: 55.5,
    proveedor: "10001",
    cantidad: 1
   },{
    id: 2, 
    nombre: "Seven Up", 
    marca: "Pepsi",
    fechaVencimiento: "01-01-1989",
    precioUnitario: 60,
    proveedor: "10002",
    cantidad: 1
   }],
   clientes: [{
    id: 1, 
    nombre: "Franz", 
    apellido: "Liszt",
    dni: "35196000",
    fechaNacimiento: "22-10-1811",
    edad: "31",
    tarjetaCredito: "1111222233334444"
   }],
   empleados: [{
    id: 1, 
    nombre: "Frederic", 
    apellido: "Chopin",
    dni: "35196000",
    fechaNacimiento: "17-10-1849",
    edad: "31",
    idEmpleado: "0000041",
    legajo: "0000041"
   }]
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (<GlobalContext.Provider value={{
    productos: state.productos,
    clientes: state.clientes,
    empleados: state.empleados,
  }}>
    {children}
  </GlobalContext.Provider>);
}