import Alert from 'react-bootstrap/Alert';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import "./styles.css";

export const UsuariosForm = (props) => {
  
    const history = useHistory();

    const [user, setUser] = useState({
      email: '',
      password: '',
      verificationCode: ''
    })

    const [acao, setAcao] = useState('Novo');
    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
        loading: false
    })

    const valorInput = e => setUser({
        ... user,
        [e.target.name]: e.target.value
    })

    const formSubmit = async e => {
        e.preventDefault();
        setStatus({ loading: true });
 
        await api.post("/user/updatepassword", user)
            .then( (response) => {
                    console.log(response);
                    setStatus({loading: false});
                }).catch( (err) => {
                    if(err.response){
                        setStatus({
                            type: 'error',
                            mensagem: err.response.data.mensagem,
                            loading: false
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            mensagem: 'Erro Update: tente mais tarde...',
                            loading: false
                        })                
                    }  
                })
              }

    return(
        <div className="background">    
            <Container className="box">
            <h1 className="title">Desafio esqueci a senha</h1>
              <Form onSubmit={formSubmit} className="borderForm">

                {['success',].map((variant) => (
                  <p>
                    {status.type == 'success' ? 
                    <Alert key={variant} variant={variant}>{status.mensagem}</Alert>: ""}
                  </p>
                ))}
          
                {['danger',].map((variant) => (
                  <p>
                    {status.type == 'error' ? 
                    <Alert key={variant} variant={variant}>{status.mensagem}</Alert>: ""}
                  </p>
                ))}
          
                {['warning'].map((variant) => (
                  <p>
                    {status.loading ?
                  <Alert key={variant} variant={variant}> Enviando... </Alert> : ""}
                  </p>
                ))}
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de email</Form.Label>
                  <Form.Control type="email" name="email" value={user.email} onChange={valorInput} placeholder="Insira seu Email" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCode">
                  <Form.Label>Codigo de Verificação</Form.Label>
                  <Form.Control type="text" name="verificationCode" value={user.verificationCode} onChange={valorInput} placeholder="Insira o token" required/>
                </Form.Group>  
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" name="password2" onChange={valorInput} placeholder="Senha" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirme sua senha</Form.Label>
                  <Form.Control type="password" name="confirmpassword" onChange={valorInput} placeholder="Confirme sua senha" />
                </Form.Group>
                {status.loading ? <Button id="button" variant="primary" disabled type="submit" >Enviando...</Button>
                                : <Button id="button" variant="primary" type="submit" >Enviar</Button>}
              </Form>
          </Container>
        </div>
    )
}