import React, {useState, useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { GlobalContext } from '../context/GlobalState';

export const Productos = () => {
    const { productos } = useContext(GlobalContext);

    const [data, setData] = useState(productos);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [form, setForm] = useState({
          id: "",
          nombre: "",
          marca: "",
          fechaVencimiento: "",
          precioUnitario: 0,
          proveedor: "",
        });

    function mostrarModalActualizar(dato) {
    setModalActualizar(true);
    setForm(dato);
    };
    
    function cerrarModalActualizar(){
    setModalActualizar(false);
    };
    
    function mostrarModalInsertar() {
    setModalInsertar(true);
    };
    
    function cerrarModalInsertar(){
    setModalInsertar(false);
    };
    
    function editar(dato) {
    var contador = 0;
    var arreglo = data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].marca = dato.marca;
        arreglo[contador].fechaVencimiento = dato.fechaVencimiento;
        arreglo[contador].precioUnitario = dato.precioUnitario;
        arreglo[contador].proveedor = dato.proveedor;
      }
      contador++;
    });
    setModalActualizar(false);
    setData(arreglo);
    };
    
    function eliminar(dato) {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el producto "+dato.nombre);
    if (opcion === true) {
      var contador = 0;
      var arreglo = [...data];
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      setData(arreglo);
      setModalActualizar(false);
    }
    };
    
    function insertar(){
    var valorNuevo= {...form};
    valorNuevo.id=data.length+1;
    var lista= data;
    lista.push(valorNuevo);
    setModalInsertar(false);
    setData(lista);
    }
    
    function handleChange(e){
    setForm({...form, [e.target.name]:e.target.value });
    };

    return (
      <div>
        <Container>
        <br />
          <Button color="success" onClick={()=>mostrarModalInsertar()}>Agregar</Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>id</th>  
                <th>Nombre</th>
                <th>Marca</th>
                <th>Fecha Venimiento</th>
                <th>Precio Unitario</th>
                <th>Proveedor</th>
              </tr>
            </thead>
    
            <tbody>
              {data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.marca}</td>
                  <td>{dato.fechaVencimiento}</td>
                  <td>{dato.precioUnitario}</td>
                  <td>{dato.proveedor}</td>
                  <td>
                    <Button color="primary" onClick={() => mostrarModalActualizar(dato)}>Editar</Button>{" "}
                    <Button color="danger" onClick={()=> eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
    
        <Modal isOpen={modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Producto</h3></div>
          </ModalHeader>
    
          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
                value={form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label> Marca:</label>
              <input
                className="form-control"
                name="marca"
                type="text"
                onChange={handleChange}
                value={form.marca}
              />
            </FormGroup>
            <FormGroup>
              <label> Fecha Vencimiento:</label>
              <input
                className="form-control"
                name="fechaVencimiento"
                type="text"
                onChange={handleChange}
                value={form.fechaVencimiento}
              />
            </FormGroup>
            <FormGroup>
              <label> Precio Unitario:</label>
              <input
                className="form-control"
                name="precioUnitario"
                type="text"
                onChange={handleChange}
                value={form.precioUnitario}
              />
            </FormGroup>
            <FormGroup>
              <label>Proveedor:</label>
              <input
                className="form-control"
                name="proveedor"
                type="text"
                onChange={handleChange}
                value={form.proveedor}
              />
            </FormGroup>
          </ModalBody>
    
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => editar(form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
    
        <Modal isOpen={modalInsertar}>
          <ModalHeader>
           <div><h3>Agregar Producto</h3></div>
          </ModalHeader>
    
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={data.length+1}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Marca:</label>
              <input
                className="form-control"
                name="marca"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Vencimiento:</label>
              <input
                className="form-control"
                name="fechaVencimiento"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Precio Unitario:</label>
              <input
                className="form-control"
                name="precioUnitario"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Proveedor:</label>
              <input
                className="form-control"
                name="proveedor"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>
    
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => insertar()}
            >
              Agregar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}
