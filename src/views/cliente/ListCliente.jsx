import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Image, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCliente() {

    const [lista, setLista] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(false)

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/cliente")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Link to={'/form-cliente'}>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' /> Voltar
                            </Button>
                        </Link>

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(cliente => (
                                    <React.Fragment>
                                        <Table.Row key={cliente.id}>
                                            <Table.Cell>{cliente.nome}</Table.Cell>
                                            <Table.Cell>{cliente.cpf}</Table.Cell>
                                            <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                            <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                            <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste cliente'
                                                    icon>
                                                    <Icon name='edit' />
                                                </Button> &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este cliente'
                                                    icon>
                                                    <Icon name='trash' />
                                                </Button> &nbsp;
                                                <Modal
                                                    onClose={() => setClienteSelecionado(null)}
                                                    onOpen={() => setClienteSelecionado(cliente)}
                                                    open={clienteSelecionado?.id === cliente.id}
                                                    trigger={                                                <Button
                                                        inverted
                                                        circular
                                                        color='blue'
                                                        title='Clique aqui para visualizar mais detalhes'
                                                        icon>
                                                        <Icon name='plus circle' />
                                                    </Button>}
                                                >
                                                    <ModalHeader>Detalhes do cliente</ModalHeader>
                                                    <ModalContent>
                                                        <ModalDescription>
                                                            <Header>{cliente.nome}</Header>
                                                            <p>
                                                                CPF: {cliente.cpf}
                                                            </p>
                                                            <p>Telefone celular: {cliente.foneCelular}</p>
                                                            <p>
                                                                Telefone fixo: {cliente.foneFixo}
                                                            </p>
                                                            <p>
                                                                Data nascimento: {
                                                                new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}
                                                            </p>
                                                        </ModalDescription>
                                                    </ModalContent>
                                                    <ModalActions>
                                                        <Button color='black' onClick={() => setClienteSelecionado(null)}>
                                                            Nope
                                                        </Button>
                                                        <Button
                                                            content="Yep, that's me"
                                                            labelPosition='right'
                                                            icon='checkmark'
                                                            onClick={() => setClienteSelecionado(null)}
                                                            positive
                                                        />
                                                    </ModalActions>
                                                </Modal>

                                            </Table.Cell>
                                        </Table.Row>
                                    </React.Fragment>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

        </div>
    )
}
