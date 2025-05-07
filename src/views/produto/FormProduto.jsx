import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormProduto() {

    const {state} = useLocation()
    const [produto, setProduto] = useState({
        id: null,
        titulo: null,
        codigo: null,
        descricao: null,
        valorUnitario: null,
        tempoEntregaMaximo: null,
        tempoEntregaMinimo: null
    })

    const handleChange = (e) => {
        setProduto(prev => ({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    useEffect(() => {
        if (state !== null && state.id !== null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
                    setProduto({
                        id: response.data.id,
                        titulo: response.data.titulo,
                        codigo: response.data.codigo,
                        descricao: response.data.descricao,
                        valorUnitario: response.data.valorUnitario,
                        tempoEntregaMaximo: response.data.tempoEntregaMaximo,
                        tempoEntregaMinimo: response.data.tempoEntregaMinimo
                    })
                })
        }
    }, [state])

    function salvar() {

        let ProdutoRequest = {
            titulo: produto.titulo,
            codigo: produto.codigo,
            descricao: produto.descricao,
            valorUnitario: produto.valorUnitario,
            tempoEntregaMinimo: produto.tempoEntregaMinimo,
            tempoEntregaMaximo: produto.tempoEntregaMaximo
        }

        if (produto.id !== null) { //Alteração:
            axios.put("http://localhost:8080/api/produto/" + produto.id, ProdutoRequest)
                .then((response) => { console.log('produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/produto", ProdutoRequest)
                .then((response) => { console.log('produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
    }


    return (

        <div>

            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    maxLength="100"
                                    placeholder="Informe o titulo do produto"
                                    value={produto.titulo}
                                    name="titulo"
                                    onChange={e => handleChange(e)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    placeholder="Informe o código do produto"
                                    label='Código do Produto'
                                    value={produto.codigo}
                                    name="codigo"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                            </Form.Group>
                            <Form.TextArea
                                label='Descrição'
                                placeholder="Informe a descrição do produto"
                                maxLength="10000"
                                value={produto.descricao}
                                name="descricao"
                                onChange={e => handleChange(e)}

                            />
                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}
                                    value={produto.valorUnitario}
                                    name="valorUnitario"
                                    onChange={e => handleChange(e)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder="30"
                                    width={6}
                                    value={produto.tempoEntregaMinimo}
                                    name="tempoEntregaMinimo"
                                    onChange={e => handleChange(e)}

                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder="40"
                                    width={6}
                                    value={produto.tempoEntregaMaximo}
                                    name="tempoEntregaMaximo"
                                    onChange={e => handleChange(e)}

                                >
                                </Form.Input>
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-produto'}>
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