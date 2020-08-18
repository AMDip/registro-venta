import React, { useState, useEffect, useRef, useContext } from "react";
import Select from "react-select";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { GlobalContext } from "../context/GlobalState";
import printJS from "print-js";
import NumericInput from "react-numeric-input";

export const Ventas = () => {
  const { productos, clientes, empleados } = useContext(GlobalContext);

  const [cantidades, setCantidades] = useState();

  const [modalCliente, setModalCliente] = useState(false);
  const [modalVendedor, setModalVendedor] = useState(false);
  const [modalProductos, setModalProductos] = useState(false);

  const [listaProd, setListaProd] = useState();
  const [vendedor, setVendedor] = useState();
  const [cliente, setCliente] = useState();

  const listaDeProductos = [];
  const listaClientes = [];
  const listaEmpleados = [];

  clientes.map((cliente) =>
    listaClientes.push({ value: cliente.id, label: cliente.nombre })
  );
  empleados.map((empleado) =>
    listaEmpleados.push({ value: empleado.id, label: empleado.nombre })
  );
  productos.map((prod) =>
    listaDeProductos.push({ value: prod.id, label: prod.nombre })
  );
  const date = new Date();
  const fechaHoy =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

  function mostrarModalCliente() {
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
      var arreglo = [...listaProd];
      arreglo.map((registro) => {
        if (prod.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      setListaProd(arreglo);
    }
  }

  function handleSelectProductos(options) {
    if (typeof options !== "undefined" && options != null) {
      const aux = [];
      for (let i = 0; i < options.length; i++) {
        aux.push(productos.find((prod) => prod.nombre === options[i].label));
      }
      setListaProd(aux);
    } else {
      setListaProd(null);
    }
  }

  function handleSelectVendedor(options) {
    if (typeof options !== "undefined" && options != null) {
      const vendedor = empleados.find(
        (empleado) => empleado.nombre === options.label
      );
      setVendedor(vendedor);
    }
  }

  function handleSelectCliente(options) {
    if (typeof options !== "undefined" && options != null) {
      const cliente = clientes.find(
        (cliente) => cliente.nombre === options.label
      );
      setCliente(cliente);
    }
  }

  function calcularTotalVenta() {
    let aux = 0;
    for (let i = 0; i < listaProd.length; i++) {
      aux += listaProd[i].precioUnitario * listaProd[i].cantidad;
    }
    return aux;
  }

  function onChangeCantidad(id, value) {
    let aux = listaProd.slice();
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].id === id) {
        aux[i].cantidad = value;
      }
    }
    setListaProd(aux);
  }

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    }
  });

  return (
    <div>
      <div className="ventas-container">
        <Container>
          <Button color="info" onClick={() => mostrarModalVendedor()}>
            Elegir/Cambiar Vendedor
          </Button>{" "}
          <span />
          <Button color="info" onClick={() => mostrarModalCliente()}>
            Elegir/Cambiar Cliente
          </Button>{" "}
          <span />
          <div id="print" className="container-datos-venta">
            <div className="" style={{ display: "flex", margin: "5px" }}>
              {typeof vendedor !== "undefined" && vendedor != null ? (
                <Card
                  id="card-vendedor"
                  style={{ width: "30%", margin: "5px" }}
                >
                  <CardBody>
                    <CardTitle>
                      NOMBRE VENDEDOR:{" "}
                      {vendedor.nombre + " " + vendedor.apellido}
                    </CardTitle>
                    <CardText>LEGAJO VENDEDOR: {vendedor.legajo}</CardText>
                  </CardBody>
                </Card>
              ) : null}
              {typeof cliente !== "undefined" && cliente != null ? (
                <Card id="card-cliente" style={{ width: "30%", margin: "5px" }}>
                  <CardBody>
                    <CardTitle>
                      CLIENTE: {cliente.nombre + " " + cliente.apellido}
                    </CardTitle>
                  </CardBody>
                </Card>
              ) : null}
            </div>
            <div className="container-venta" id="lista-productos">
              <h3>Lista Productos</h3>
              <ul className="list">
                {typeof listaProd !== "undefined" &&
                listaProd != null &&
                listaProd.length > 0
                  ? listaProd.map((prod, i) => (
                      <li key={i.toString()}>
                        <div >
                          <span>
                            cantidad:{" "}
                            <NumericInput
                              key={i}
                              onChange={(value) =>
                                onChangeCantidad(prod.id, value)
                              }
                              style={{
                                input: { height: "30px", width: "45px"},
                              }}
                              min={1}
                              max={100}
                              value={prod.cantidad}
                            ></NumericInput>
                          </span>
                          <span style={{marginLeft: "5px"}}>Producto: {prod.nombre}{" | "}</span>
                          <span>Marca: {prod.marca} {" | "}</span>
                          <span>Precio Unitario: {prod.precioUnitario} {" | "}</span>
                          <span>
                            Total: {prod.precioUnitario * prod.cantidad} {" | "}
                          </span>
                          <Button
                            color="danger"
                            onClick={() => eliminar(prod)}
                            className="delete-btn"
                            style={{
                              position: "relative"
                            }}
                          >
                            X
                          </Button>
                        </div>
                      </li>
                    ))
                  : null}
                <div>
                  {typeof listaProd !== "undefined" &&
                  listaProd != null &&
                  listaProd.length > 0 ? (
                    <>
                      <span style={{ float: "left", fontSize: "25px" }}>
                        Fecha: {fechaHoy}
                      </span>
                      <span style={{ float: "right", fontSize: "25px" }}>
                        Total Venta: {calcularTotalVenta()}
                      </span>
                    </>
                  ) : null}
                </div>
              </ul>
            </div>
          </div>
          <Button color="success" onClick={() => mostrarModalProductos()}>
            Agregar Producto
          </Button>{" "}
          <span />
          {typeof listaProd !== "undefined" &&
          listaProd != null &&
          listaProd.length > 0 ? (
            <Button
              color="success"
              onClick={() =>
                printJS({
                  printable: "print",
                  type: "html",
                })
              }
            >
              Imprimir Factura
            </Button>
          ) : null}
          <br />
        </Container>
        <Modal isOpen={modalProductos}>
          <ModalHeader>
            <div>
              <h3>Agregar Productos</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Select
              isMulti
              options={listaDeProductos}
              onChange={handleSelectProductos}
              autoFocus
              placeholder="Buscar productos"
              noOptionsMessage={() => "No exiten mas productos..."}
            />
            <ModalFooter>
              <Button color="danger" onClick={() => cerrarModalProductos()}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalVendedor}>
          <ModalHeader>
            <div>
              <h3>Seleccionar Vendedor</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Select
              options={listaEmpleados}
              onChange={handleSelectVendedor}
              autoFocus
              placeholder="Buscar Vendedor"
              noOptionsMessage={() => "No exiten mas vendedores..."}
            />
            <ModalFooter>
              <Button color="danger" onClick={cerrarModalVendedor}>
                OK
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalCliente}>
          <ModalHeader>
            <div>
              <h3>Seleccionar Cliente</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Select
              options={listaClientes}
              onChange={handleSelectCliente}
              autoFocus
              placeholder="Buscar Cliente"
              noOptionsMessage={() => "No exiten mas Clientes..."}
            />
            <ModalFooter>
              <Button color="danger" onClick={cerrarModalCliente}>
                OK
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
