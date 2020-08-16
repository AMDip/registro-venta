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

export const Empleados = () => {
    const {empleados} = useContext(GlobalContext);

    const [data, setData] = useState(empleados);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [form, setForm] = useState({
          id: "",
          nombre: "",
          apellido: "",
          dni: "",
          fechaNacimiento: "",
          edad: "",
          idEmpleado: "",
          legajo: "",
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
        arreglo[contador].apellido = dato.apellido;
        arreglo[contador].dni = dato.dni;
        arreglo[contador].fechaNacimiento = dato.fechaNacimiento;
        arreglo[contador].edad = dato.edad;
        arreglo[contador].idEmpleado = dato.idEmpleado;
        arreglo[contador].legajo = dato.legajo;
      }
      contador++;
    });
    setModalActualizar(false);
    setData(arreglo);
    };
    
    function eliminar(dato) {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = data;
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
          <Button color="success" onClick={()=>mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>id</th>  
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>FechaNacimiento</th>
                <th>Edad</th>
                <th>ID Empleado</th>
                <th>Legajo</th>
              </tr>
            </thead>

            <tbody>
              {data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.dni}</td>
                  <td>{dato.fechaNacimiento}</td>
                  <td>{dato.edad}</td>
                  <td>{dato.idEmpleado}</td>
                  <td>{dato.legajo}</td>
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
           <div><h3>Editar Empleado</h3></div>
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
              <label> Apellido:</label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={handleChange}
                value={form.apellido}
              />
            </FormGroup>
            <FormGroup>
              <label> DNI:</label>
              <input
                className="form-control"
                name="dni"
                type="text"
                onChange={handleChange}
                value={form.dni}
              />
            </FormGroup>
            <FormGroup>
              <label> Fecha Nacimiento:</label>
              <input
                className="form-control"
                name="fechaNacimiento"
                type="text"
                onChange={handleChange}
                value={form.fechaNacimiento}
              />
            </FormGroup>
            <FormGroup>
              <label> Edad:</label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={handleChange}
                value={form.edad}
              />
            </FormGroup>
            <FormGroup>
              <label> ID Empleado:</label>
              <input
                className="form-control"
                name="idEmpleado"
                type="text"
                onChange={handleChange}
                value={form.idEmpleado}
              />
            </FormGroup>
            <FormGroup>
              <label> Legajo:</label>
              <input
                className="form-control"
                name="legajo"
                type="text"
                onChange={handleChange}
                value={form.legajo}
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
           <div><h3>Agregar Empleado</h3></div>
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
              <label>Apelido:</label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>DNI:</label>
              <input
                className="form-control"
                name="dni"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Nacimiento:</label>
              <input
                className="form-control"
                name="fechaNacimiento"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Edad:</label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>ID Empleado:</label>
              <input
                className="form-control"
                name="idEmpleado"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Legajo:</label>
              <input
                className="form-control"
                name="legajo"
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