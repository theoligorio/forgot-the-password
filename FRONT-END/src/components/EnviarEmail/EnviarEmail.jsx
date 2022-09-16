import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

export function Login() {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
    loading: false,
  });

  const valorInput = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const loginSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      loading: true,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    await api
      .put("user/recovery", user, { headers })

      .then((response) => {
        setStatus({
          type: "success",
          mensagem: response.data.mensagem,
        });

        return history.push("/dashboard");
      })
      .catch((err) => {
        setStatus({
          type: "error",
          mensagem: "Erro: tente mais tarde...",
        });
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
            loading: false,
          });
        }
      });
  };
  return (
    <div className="background">
      <Container className="box">
        <h1 className="title">Desafio esqueci a senha</h1>
        <Form onSubmit={loginSubmit} className="borderForm">
          {["success"].map((variant) => (
            <p>
              {status.type == "success" ? (
                <Alert key={variant} variant={variant}>
                  {status.mensagem}
                </Alert>
              ) : (
                ""
              )}
            </p>
          ))}
          {["danger"].map((variant) => (
            <p>
              {status.type == "error" ? (
                <Alert key={variant} variant={variant}>
                  {status.mensagem}
                </Alert>
              ) : (
                ""
              )}
            </p>
          ))}
          {["warning"].map((variant) => (
            <p>
              {status.loading ? (
                <Alert key={variant} variant={variant}>
                  {" "}
                  Validando...{" "}
                </Alert>
              ) : (
                ""
              )}
            </p>
          ))}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Endereço de email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={valorInput}
              placeholder="Insira seu email"
            />
            <Form.Text className="text-muted">
              Insira seu Email para recuperar sua Senha!!!
            </Form.Text>
          </Form.Group>
          {status.loading ? (
            <Button id="button" variant="primary" disabled type="submit">
              Acessando...
            </Button>
          ) : (
            <Button id="button" variant="dark" type="submit">
              Acessar
            </Button>
          )}
        </Form>
      </Container>
    </div>
  );
}
