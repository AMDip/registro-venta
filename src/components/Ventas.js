import React, { useState, useContext } from "react";
import Select from "react-select";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, 
         Card, Collapse, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { GlobalContext } from "../context/GlobalState";
import NumericInput from 'react-numeric-input';

export const Ventas = () => {
  const { productos, clientes, empleados } = useContext(GlobalContext);

  const [cantidad, setCantidad] = useState(1);
  const [data, setData] = useState(productos);
  const [modalCliente, setModalCliente] = useState(false);
  const [cardCliente, setCardCliente] = useState(false);
  const [modalVendedor, setModalVendedor] = useState(false);
  const [cardVendedor, setCardVendedor] = useState(false);
  const [modalProductos, setModalProductos] = useState(false);

  const [listaProd, setListaProd] = useState();
  const [vendedor, setVendedor] = useState();
  const [cliente, setCliente] = useState();

  const listaDeProductos=[];
  const listaClientes=[];
  const listaEmpleados=[];

  clientes.map( (cliente) => listaClientes.push( {value: cliente.id, label:cliente.nombre}) );
  empleados.map( (empleado) => listaEmpleados.push( {value: empleado.id, label:empleado.nombre}) );
  productos.map( (prod) => listaDeProductos.push( {value: prod.id, label:prod.nombre}) );

  function mostrarModalCliente(dato) {
    setModalCliente(true);
  }
  function cerrarModalCliente() {
    setModalCliente(false);
  }
  function mostrarModalVendedor() {
    setModalVendedor(true);
  }
  function cerrarModalVendedor() {
    setModalVendedor(false);
  }
  function mostrarModalProductos() {
    setModalProductos(true);
  }
  function cerrarModalProductos() {
    setModalProductos(false);
  }

  function eliminar(prod) {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + prod.nombre
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = listaProd;
      arreglo.map((registro) => {
        if (prod.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      setListaProd(arreglo);
      setModalCliente(false);
    }
  }

  function handleSelectProductos(options) {
    if (typeof options !== 'undefined' && options != null){
      const aux=[];
      for(let i=0 ; i < options.length; i++){
        aux.push( productos.find( prod => prod.nombre === options[i].label) );
      }
      setListaProd(aux);
    }else{ setListaProd(null); }
  }

  function handleSelectVendedor(options) {
    if (typeof options !== 'undefined' && options != null){
      const vendedor= empleados.find( empleado => empleado.nombre === options.label) ;
      setVendedor(vendedor);
      console.log(vendedor);
    }
  }
  function handleSelectCliente(options) {
    if (typeof options !== 'undefined' && options != null){
      const cliente= clientes.find( cliente => cliente.nombre === options.label) ;
      setCliente(cliente);
      console.log(cliente);
    }
  }

  return (
    <div>
      <div className="ventas-container">
        <Container>
        <Button color="info" onClick={mostrarModalVendedor} >Elegir/Cambiar Vendedor</Button> <span/>
        <Button color="info" onClick={mostrarModalCliente} >Elegir/Cambiar Cliente</Button> <span/>
          <div className="container-datos-venta">
            <div className="" style={{ display: "flex", margin: "5px"}}>
                {typeof vendedor !== 'undefined' && vendedor != null
                ?<Card style={ {width: "40%", margin: "5px"}}>
                  <CardBody>
                      <CardTitle>Nombre Vendedor</CardTitle>
                      <CardSubtitle>{vendedor.nombre + " " + vendedor.apellido}</CardSubtitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button>Cambiar Vendedor</Button>
                  </CardBody>
                 </Card>
                : null }
                {typeof cliente !== 'undefined' && cliente != null
                ? <Card style={ {width: "40%" , margin: "5px"} }>
                    <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardSubtitle>{cliente.nombre + " " + cliente.apellido}</CardSubtitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button>Cambiar Cliente</Button>
                    </CardBody>
                  </Card>
                : null }
            </div>
          </div>
          <div className="container-venta">
            <h2>Lista Productos</h2>
            <ul className="list">
                {typeof listaProd !== 'undefined' && listaProd != null
                ? listaProd.map(prod => (
                  <li key={prod.id}>
                    <span>cantidad: <NumericInput onChange={value => setCantidad(value)} style={{ input: {height: '30px',width: '50px'} }} min={1} max={100} value={cantidad} /></span>
                    <span>Producto: {prod.nombre}</span>
                    <span>Marca: {prod.marca}</span>
                    <span>Precio Unitario: {prod.precioUnitario}</span>
                    <span>Total: {prod.precioUnitario * cantidad}</span>
                  <Button color="danger" onClick={() => eliminar(prod)} className="delete-btn">x</Button>
                  </li>))
                : null}
            </ul>
          </div>
          <Button color="success" onClick={mostrarModalProductos}>Agregar Producto</Button> <span/>
          <Button color="success">Imprimir Factura</Button> <span/>
          <br />
        </Container>
          <Modal isOpen={modalProductos}>
          <ModalHeader>
           <div><h3>Agregar Productos</h3></div>
          </ModalHeader>
          <ModalBody>
            <Select
              isMulti
              options={listaDeProductos}
              onChange={handleSelectProductos}
              autoFocus
              placeholder="Buscar productos"
              noOptionsMessage={()=>'No exiten mas productos...'}
            />
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => cerrarModalProductos()}
              >Cerrar</Button>
            </ModalFooter>
            </ModalBody>
          </Modal>
          <Modal isOpen={modalVendedor}>
          <ModalHeader>
           <div><h3>Seleccionar Vendedor</h3></div>
          </ModalHeader>
          <ModalBody>
            <Select
              options={listaEmpleados}
              onChange={handleSelectVendedor}
              autoFocus
              placeholder="Buscar Vendedor"
              noOptionsMessage={()=>'No exiten mas vendedores...'}
            />
            <ModalFooter>
              <Button
                color="danger"
                onClick={cerrarModalVendedor}
              >OK</Button>
            </ModalFooter>
            </ModalBody>
            </Modal>
            <Modal isOpen={modalCliente}>
          <ModalHeader>
           <div><h3>Seleccionar Cliente</h3></div>
          </ModalHeader>
          <ModalBody>
            <Select
              options={listaClientes}
              onChange={handleSelectCliente}
              autoFocus
              placeholder="Buscar Cliente"
              noOptionsMessage={()=>'No exiten mas Clientes...'}
            />
            <ModalFooter>
              <Button
                color="danger"
                onClick={cerrarModalCliente}
              >OK</Button>
            </ModalFooter>
            </ModalBody>
            </Modal>
      </div>
    </div>
  );
};
