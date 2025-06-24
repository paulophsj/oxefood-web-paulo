import InputMask from 'comigo-tech-react-input-mask';
import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from 'axios'
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormCliente() {
    const { state } = useLocation();
    const [cliente, setCliente] = useState({
        id: null,
        nome: null,
        cpf: null,
        dataNascimento: null,
        foneCelular: null,
        foneFixo: null
    })

    const handleChange = (e) => {
        setCliente(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    useEffect(() => {
        if (state !== null && state.id !== null) {
            axios.get("http://localhost:8080/api/cliente/" + state.id)
                .then((response) => {
                    setCliente({
                        id: response.data.id,
                        nome: response.data.nome,
                        cpf: response.data.cpf,
                        dataNascimento: response.data.dataNascimento,
                        foneCelular: response.data.foneCelular,
                        foneFixo: response.data.foneFixo
                    })
                })
        }
    }, [state])

    function salvar() {

        let clienteRequest = {
            nome: cliente.nome,
            cpf: cliente.cpf,
            dataNascimento: cliente.dataNascimento,
            foneCelular: cliente.foneCelular,
            foneFixo: cliente.foneFixo
        }
        if (cliente.id !== null) { //Alteração:
            axios.put("http://localhost:8080/api/cliente/" + cliente.id, clienteRequest)
                .then((response) => { notifySuccess('Cliente alterado com sucesso.') })
                .catch((error) => {
                    if (error.response.data.errors !== undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }

                })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/cliente", clienteRequest)
                .then((response) => { notifySuccess('Cliente cadastrado com sucesso.') })
                .catch((error) => {
                    if (error.response.data.errors !== undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }

                })
        }

    }

    return (

        <div>
            <MenuSistema tela={'cliente'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {cliente.id === null &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {cliente.id !== null &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    name="nome"
                                    maxLength="100"
                                    value={cliente.nome}
                                    onChange={e => handleChange(e)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cliente.cpf}
                                        name="cpf"
                                        onChange={e => handleChange(e)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={cliente.foneCelular}
                                        name="foneCelular"
                                        onChange={e => handleChange(e)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={cliente.foneFixo}
                                        name="foneFixo"
                                        onChange={e => handleChange(e)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        name="dataNascimento"
                                        value={cliente.dataNascimento}
                                        onChange={e => handleChange(e)}
                                    />
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-cliente'}>
                                <Button
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' /> Listar
                                </Button>
                            </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
