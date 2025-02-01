import React, { ChangeEvent, useEffect, useState } from 'react'
import { appsettings } from '../settings/appsettings'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Swal from 'sweetalert2'

const initialTask = {
  idTarea : 0,
  titulo : "",
  descripcion : "",
  estado:"pending",
  fecha : "2025-02-01",
}
export const Create = () => {
  useEffect(() => {
 
  }, [])

  const save = async() => {
    try{
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          titulo: tarea.titulo,
          descripcion: tarea.descripcion,
          estado: tarea.estado,
          fecha: tarea.fecha
        })
      }
      await fetch(`${appsettings.apiUrl}/tarea/create`,options);
      navigate("/");
    }
    catch{
      Swal.fire({
        title : 'error',
        icon : 'warning'
      })
    }
  
  }

  const [tarea, settarea] = useState(initialTask);
  const navigate = useNavigate();

  const inputChangeValue = (event : ChangeEvent<HTMLInputElement>)=>{
    const inputName = event.target.name;
    const inputValue = event.target.value;

    settarea({...tarea , [inputName] : inputValue});
  }
  return (
    <Container>
      <Row>
          <Col>
            <h2>Crear tarea</h2>
         
          <Form>
            <FormGroup>
              <Label>Titulo</Label>
              <Input type='text' name='titulo' onChange={inputChangeValue} value={tarea.titulo}></Input>
              </FormGroup>
              <FormGroup>
              <Label>descripcion</Label>
              <Input type='text' name='descripcion' onChange={inputChangeValue} value={tarea.descripcion}></Input>
              </FormGroup>
              <Label>Estado</Label>
              <FormGroup>
              <Input type="text" name='estado' onChange={inputChangeValue} value={tarea.estado}></Input>
              </FormGroup>
              <Label>Fecha</Label>
              <FormGroup>
              <Input type="date" name='fecha' onChange={inputChangeValue} value={tarea.fecha}></Input>
              </FormGroup>
              <Row>
              <Button color ="primary" onClick={() => {save()}}>Crear</Button>
              </Row>
              <Row>
              <Link to={"/"}><Button color ="secondary" className='mt-4' onClick={() => {save()}}>Volver</Button></Link>
              </Row>
          </Form>
          </Col>
      </Row>
    </Container>
  )
}
