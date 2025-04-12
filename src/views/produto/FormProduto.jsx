import React from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormProduto () {

    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >
                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input 
                                required
                                fluid
                                label="Título"
                                maxLength="10"
                                placeholder="Informe o título do produto"
                            />
                            <Form.Input
                                required
                                fluid
                                label="Código do Produto"
                                placeholder="Informe o códgo do produto"
                                maxLength="3"
                            />
                        </Form.Group>
                            <Form.TextArea 
                                required
                                fluid
                                label="Descrição"
                                maxLength="999"
                                placeholder="Informe a descrição do produto"
                            />
                        <Form.Group widths="equal">
                            <Form.Input 
                                required
                                fluid
                                label="Valor Unitário"
                                type='number'
                            />
                            <Form.Input 
                                required
                                fluid
                                label="Tempo de entrega em Minutos"
                                placeholder="30"
                                type='number'
                            />
                            <Form.Input 
                                required
                                fluid
                                label="Tempo de Entrega Máximo em Minutos"
                                placeholder="40"
                                type='number'
                            />
                        </Form.Group>
                    </Form>
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Listar
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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