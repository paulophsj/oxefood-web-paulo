import InputMask from 'comigo-tech-react-input-mask';
import React, { useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormEntregador() {
    const [radio, setRadio] = useState();

    const handleChange = (e, { value }) => setRadio(value);

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Input
                                    required
                                    label="Nome"
                                    fluid
                                    maxLength="100"
                                />
                                <Form.Input
                                    required
                                    label="CPF"
                                    fluid
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    label="RG"
                                    fluid
                                    maxLength="100"
                                >
                                    <InputMask
                                        required
                                        mask="99.999.999"
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    label="DT Nascimento"
                                    fluid
                                >
                                    <InputMask
                                        placeholder="Ex: 20/03/1985"
                                        mask="99/99/9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label="Fone Celular"
                                >
                                    <InputMask
                                        required
                                        mask="(99) 9 9999-9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label="Fone Fixo"
                                />
                                <Form.Input
                                    fluid
                                    label="QTD Entegas Realizadas"
                                    type='number'
                                />
                                <Form.Input
                                    fluid
                                    label="Valor por Frete"
                                />
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Rua"
                                />
                                <Form.Input
                                    width={4}
                                    fluid
                                    label="Número"
                                    type='Number'
                                />
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Bairro"
                                />
                                <Form.Input
                                    fluid
                                    label="Cidade"
                                />
                                <Form.Input
                                    fluid
                                    label="CEP"
                                >
                                    <InputMask
                                        mask="99999-999"
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Select
                                fluid
                                label="UF"
                                placeholder='Selecione'
                            >
                            </Form.Select>

                            <Form.Input
                                label="Complemento"
                                fluid
                                maxLength="200"
                            />

                            <Form.Group>
                                <label style={{ fontWeight: 'bold', marginLeft: "5px" }}>Ativo: </label>
                                <Form.Radio
                                    label="Sim"
                                    value={1}
                                    name='inputRadio'
                                    checked={radio === 1}
                                    onChange={handleChange}
                                />
                                <Form.Radio
                                    label="Não"
                                    value={0}
                                    name='inputRadio'
                                    checked={radio === 0}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
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