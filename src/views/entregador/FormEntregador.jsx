import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormEntregador() {

    const {state} = useLocation()
    const [entregador, setEntregador] = useState({
        id: null,
        nome: null,
        cpf: null,
        rg: null,
        dataNascimento: null,
        foneCelular: null,
        foneFixo: null,
        qtdEntregasRealizadas: null,
        valorFrete: null,
        enderecoBairro: null,
        enderecoCep: null,
        enderecoCidade: null,
        enderecoComplemento: null,
        enderecoNumero: null,
        enderecoRua: null,
        enderecoUf: null,
        ativo: null
    })

    const handleChange = (e) => {
        setEntregador(prev => ({
            ...prev,[e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (state !== null && state.id !== null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setEntregador({
                        id: response.data.id,
                        nome: response.data.nome,
                        cpf: response.data.cpf,
                        rg: response.data.rg,
                        dataNascimento: response.data.dataNascimento,
                        foneCelular: response.data.foneCelular,
                        foneFixo: response.data.foneFixo,
                        qtdEntregasRealizadas: response.data.qtdEntregasRealizadas,
                        valorFrete: response.data.valorFrete,
                        enderecoBairro: response.data.enderecoBairro,
                        enderecoCep: response.data.enderecoCep,
                        enderecoCidade: response.data.enderecoCidade,
                        enderecoComplemento: response.data.enderecoComplemento,
                        enderecoNumero: response.data.enderecoNumero,
                        enderecoRua: response.data.enderecoRua,
                        enderecoUf: response.data.enderecoUf,
                        ativo: response.data.ativo
                    })
                })
        }
    }, [state])

    function salvar() { //Função cria um objeto e coloca na variavel clientRequest(backend)

        let EntregadorRequest = { //Como se fosse o Json (com os dados do cliente)
            nome: entregador.nome,
            cpf: entregador.cpf,
            rg: entregador.rg,
            dataNascimento: entregador.dataNascimento,
            foneCelular: entregador.foneCelular,
            foneFixo: entregador.foneFixo,
            qtdEntregasRealizadas: entregador.qtdEntregasRealizadas,
            valorFrete: entregador.valorFrete,
            enderecoRua: entregador.enderecoRua,
            enderecoNumero: entregador.enderecoNumero,
            enderecoComplemento: entregador.enderecoComplemento,
            enderecoBairro: entregador.enderecoBairro,
            enderecoCep: entregador.enderecoCep,
            enderecoUf: entregador.enderecoUf
        }

        if (entregador.id !== null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + entregador.id, EntregadorRequest)
                .then((response) => { console.log('entregador alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", EntregadorRequest)
                .then((response) => { console.log('entregador cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o entregador.') })
        }
    }

    return (

        <div>

            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    width={10}
                                    name="nome"
                                    value={entregador.nome}
                                    onChange={e => handleChange(e)}

                                />

                                <Form.Input
                                    required
                                    width={3}
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={entregador.cpf}
                                        name="cpf"
                                        onChange={e => handleChange(e)}

                                    />

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={4}
                                    value={entregador.rg}
                                    name="rg"
                                    onChange={e => handleChange(e)}

                                />

                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={4}>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={entregador.dataNascimento}
                                        name="dataNascimento"
                                        onChange={e => handleChange(e)}

                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={entregador.foneCelular}
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
                                        value={entregador.foneFixo}
                                        name="foneFixo"
                                        onChange={e => handleChange(e)}

                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={6}
                                    value={entregador.qtdEntregasRealizadas}
                                    name="qtdEntregasRealizadas"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6}
                                    value={entregador.valorFrete}
                                    name="valorFrete"
                                    onChange={e => handleChange(e)}>
                                </Form.Input>

                            </Form.Group>
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={14}
                                    value={entregador.enderecoRua}
                                    name="enderecoRua"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={3}
                                    value={entregador.enderecoNumero}
                                    name="enderecoNumero"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={12}
                                    value={entregador.enderecoBairro}
                                    name="enderecoBairro"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={13}
                                    value={entregador.enderecoCidade}
                                    name="enderecoCidade"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={4}
                                    value={entregador.enderecoCep}
                                    name="enderecoCep"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Input
                                fluid
                                label='UF'
                                width={60}
                                value={entregador.enderecoUf}
                                name="enderecoUf"
                                onChange={e => handleChange(e)}
                            >
                            </Form.Input>

                            <Form.Input
                                fluid
                                label='Complemento'
                                width={60}
                                value={entregador.enderecoComplemento}
                                name="enderecoComplemento"
                                onChange={e => handleChange(e)}
                            >
                            </Form.Input>


                            <Form.Group>
                                <label>Ativo:</label>

                                <Form.Radio
                                    label='sim:'
                                    value='Sim'
                                    checked={entregador.ativo === true}
                                    name="ativo"
                                    onChange={() => setEntregador({ativo: true})}
                                />
                                <Form.Radio
                                    label='não'
                                    value='Não'
                                    name="ativo"
                                    checked={entregador.ativo === false || entregador.ativo === null}
                                    onChange={() => setEntregador({ativo: false})}
                                />

                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-entregador'}>
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