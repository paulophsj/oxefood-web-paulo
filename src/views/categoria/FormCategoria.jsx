import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormCategoria() {
    const { state } = useLocation();
    const [categoria, setCategoria] = useState({
        id: "",
        descricao: ""
    })
    const handleChange = (e) => {
        setCategoria(prev => ({
            ...prev,[e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (state !== null && state.id !== null) {
            axios.get("http://localhost:8080/api/categoria_produto/" + state.id)
                .then((response) => {
                    setCategoria({
                        id: response.id,
                        descricao: response.descricao
                    })
                })
        }
    }, [state])

    function salvar() {
        let categoriaRequest = {
            descricao: categoria.descricao
        }
        if (categoria.id !== null) { //Alteração:
            axios.put("http://localhost:8080/api/categoria_produto/" + categoria.id, categoriaRequest)
                .then((response) => { console.log('categoria alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um categoria.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/categoria_produto/", categoriaRequest)
                .then((response) => { console.log('categoria cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o categoria.') })
        }
    }
    return (
        <div>
            <MenuSistema tela={'categoria'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {categoria.id === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {categoria.id !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>
                            <Form.Input
                                required
                                fluid
                                label="Categoria"
                                onChange={e => handleChange(e)}
                            >
                            </Form.Input>
                        </Form>
                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-categoria'}>
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
    )
}