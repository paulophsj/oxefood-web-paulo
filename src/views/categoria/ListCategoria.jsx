import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListCategoria() {
    const [categoria, setCategoria] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/categoria_produto/' + idRemover)
            .then((response) => {

                console.log('Categoria removido com sucesso.')

                axios.get("http://localhost:8080/api/categoria_produto")
                    .then((response) => {
                        setCategoria(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover uma categoria.')
            })
        setOpenModal(false)
    }

    useEffect(() => {
        CarregarList()
    }, [])

    async function CarregarList() {
        await axios.get("http://localhost:8080/api/categoria_produto")
            .then((response) => {
                setCategoria(response.data)
            })
    }

    return (
        <div>
            <MenuSistema tela={'categoria'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Categoria </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Link to={'/form-categoria'}>
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
                                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                                </Table.Row>
                                <Table.Body>
                                    {categoria.map(categoria => (
                                        <React.Fragment>
                                            <Table.Row key={categoria.id}></Table.Row>
                                            <Table.Cell>{categoria.descricao}</Table.Cell>
                                            <Table.Cell textAlign='center'>


                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados desta categoria'
                                                    icon>
                                                    <Link to="/form-categoria" state={{ id: categoria.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button>
                                                &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este cliente'
                                                    icon
                                                    onClick={(e) => confirmaRemover(categoria.id)}>
                                                    <Icon name='trash' />
                                                </Button> &nbsp;
                                            </Table.Cell>

                                        </React.Fragment>
                                    ))}
                                    <Modal
                                        basic
                                        onClose={() => setOpenModal(false)}
                                        onOpen={() => setOpenModal(true)}
                                        open={openModal}
                                    >
                                        <Header icon>
                                            <Icon name='trash' />
                                            <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                                        </Header>
                                        <Modal.Actions>
                                            <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                                                <Icon name='remove' /> Não
                                            </Button>
                                            <Button color='green' inverted onClick={() => remover()}>
                                                <Icon name='checkmark' /> Sim
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                </Table.Body>
                            </Table.Header>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    )
}