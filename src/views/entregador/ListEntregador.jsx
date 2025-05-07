import axios from "axios"
import { useEffect, useState } from "react";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link } from "react-router-dom";

export default function ListEntregador() {
    const [lista, setLista] = useState([]);
        const [openModal, setOpenModal] = useState(false);
        const [idRemover, setIdRemover] = useState();

        function confirmaRemover(id) {
            setOpenModal(true)
            setIdRemover(id)
        }

        async function remover() {

            await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
                .then(async (response) => {
    
                    console.log('entregador removido com sucesso.')
    
                    await axios.get("http://localhost:8080/api/entregador")
                        .then((response) => {
                            setLista(response.data)
                        })
                })
                .catch((error) => {
                    console.log('Erro ao remover um entregador.')
                })
            setOpenModal(false)
        }

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }
    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Link to={'/form-entregador'}>
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
                                    <Table.HeaderCell>Quantidade Entregas</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Frete</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                        <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este cliente'
                                                    icon
                                                    onClick={(e) => confirmaRemover(entregador.id)}>
                                                    <Icon name='trash' />
                                                </Button> &nbsp;

                                        </Table.Cell>
                                    </Table.Row>
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
                        </Table>
                    </div>
                </Container>
            </div>

        </div>
    )
}