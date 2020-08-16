import React from 'react';
import './App.css';
import Nav from './Nav';
import { Clientes } from './components/Clientes';
import { Productos } from './components/Productos';
import { Empleados } from './components/Empleados';
import { Ventas } from './components/Ventas';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';

const data = [
  { id: 1, 
    cantidad: 1,
    nombre: "Mirinda Manzana", 
    marca: "Coca Cola",
    fechaVencimiento: "01-01-1989",
    precioUnitario: 1.5,
    proveedor: "00001"
   },
];

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <Nav/>
          <Switch>
            <Route path="/" exact component={Clientes} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/empleados" component={Empleados} />
            <Route path="/productos" component={Productos} />
            <Route path="/ventas" component={Ventas}/>
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
