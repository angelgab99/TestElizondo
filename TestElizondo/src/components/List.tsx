import React, { useEffect, useState } from 'react'
import { appsettings } from '../settings/appsettings'
import Swal from 'sweetalert2'
import { Button, Col, Container, Row, Table } from 'reactstrap'
import { Link } from 'react-router-dom'

const initialTask = {
  idTarea : 0,
  titulo : "",
  descripcion : "",
  estado:"pending",
  fecha : "2025-02-01",
}
export const List = () => {
  
  const [task, settask] = useState([initialTask])
  useEffect(() => {
    loadList()
  }, [])
  
  const loadList = async() => {
    const resp = await fetch(`${appsettings.apiUrl}/Tarea/getTasks`);
    const data = await resp.json();
    settask(data);
  }
  
  const eliminar = async(id:number) =>{
    Swal.fire({
      title: "seguro quieres borrar",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "si",
      denyButtonText: `Don't save`
    }).then(async(result) => {
      if (result.isConfirmed) {
        await fetch(`${appsettings.apiUrl}/Tarea/delete/${id}` , {method: "DELETE"});
      await   loadList()
          
      }
    });
  }
   
  return (
    <Container className="mt-5">
    <Row>
         <Col >
              <h4>Lista de Tareas</h4>
              <hr />
              <Link className="btn btn-success mb-3" to="/crear" >Nuevo Tarea</Link>

              <Table bordered>
                   <thead>
                        <tr>
                             <th>titulo</th>
                             <th>descripcion</th>
                             <th>Estado</th>
                             <th>Fecha</th>
                             <th></th>
                        </tr>
                   </thead>
                   <tbody>
                        {
                             task.map((item) => (
                                  <tr key={item.idTarea}>
                                       <td>{item.titulo}</td>
                                       <td>{item.descripcion}</td>
                                       <td>{item.estado}</td>
                                       <td>{item.fecha}</td>
                                       <td>
                                            <Link className="btn btn-primary me-2" to={`/update/${item.idTarea}`} >Editar</Link>
                                            <Button color="danger" onClick={() => { eliminar(item.idTarea!) }}>
                                                 Eliminar
                                            </Button>
                                       </td>
                                  </tr>
                             ))
                        }
                   </tbody>
              </Table>
         </Col>
    </Row>
</Container>
  )
}
