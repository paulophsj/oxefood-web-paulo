import { useEffect, useState } from "react";
import MenuSistema from "../../MenuSistema";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
  Menu,
  Segment,
  Table,
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListProduto() {
  const [lista, setLista] = useState([]);
  const [menuFiltro, setMenuFiltro] = useState();
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [idCategoria, setIdCategoria] = useState();
  const [listaCategoriaProduto, setListaCategoriaProduto] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/produto").then((response) => {
      setLista(response.data);
    });
    axios.get("http://localhost:8080/api/categoriaproduto").then((response) => {
      const dropDownCategorias = [];
      dropDownCategorias.push({ text: "", value: "" });
      response.data.map((c) =>
        dropDownCategorias.push({ text: c.descricao, value: c.id })
      );

      setListaCategoriaProduto(dropDownCategorias);
    });
  }
  function handleMenuFiltro() {
    if (menuFiltro === true) {
      setMenuFiltro(false);
    } else {
      setMenuFiltro(true);
    }
  }

  function handleChangeCodigo(value) {
    filtrarProdutos(value, titulo, idCategoria);
  }

  function handleChangeTitulo(value) {
    filtrarProdutos(codigo, value, idCategoria);
  }

  function handleChangeCategoriaProduto(value) {
    filtrarProdutos(codigo, titulo, value);
  }
  async function filtrarProdutos(codigoParam, tituloParam, idCategoriaParam) {
    let formData = new FormData();

    if (codigoParam !== undefined) {
      setCodigo(codigoParam);
      formData.append("codigo", codigoParam);
    }
    if (tituloParam !== undefined) {
      setTitulo(tituloParam);
      formData.append("titulo", tituloParam);
    }
    if (idCategoriaParam !== undefined) {
      setIdCategoria(idCategoriaParam);
      formData.append("idCategoria", idCategoriaParam);
    }

    await axios
      .post("http://localhost:8080/api/produto/filtrar", formData)
      .then((response) => {
        setLista(response.data);
      });
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Produto </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Menu compact>
              <Menu.Item
                name="menuFiltro"
                active={menuFiltro === true}
                onClick={() => handleMenuFiltro()}
              >
                <Icon name="filter" />
                Filtrar
              </Menu.Item>
            </Menu>

            <Link to={"/form-produto"}>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" /> Voltar
              </Button>
              {menuFiltro ? (
                <Segment>
                  <Form className="form-filtros">
                    <Form.Input
                      icon="search"
                      value={codigo}
                      onChange={(e) => handleChangeCodigo(e.target.value)}
                      label="Código do Produto"
                      placeholder="Filtrar por Código do Produto"
                      labelPosition="left"
                      width={4}
                    />
                    <Form.Group widths="equal">
                      <Form.Input
                        icon="search"
                        value={titulo}
                        onChange={(e) => handleChangeTitulo(e.target.value)}
                        label="Título"
                        placeholder="Filtrar por título"
                        labelPosition="left"
                      />
                      <Form.Select
                        placeholder="Filtrar por Categoria"
                        label="Categoria"
                        options={listaCategoriaProduto}
                        value={idCategoria}
                        onChange={(e, { value }) => {
                          handleChangeCategoriaProduto(value);
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Segment>
              ) : (
                ""
              )}
            </Link>

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Titulo</Table.HeaderCell>
                  <Table.HeaderCell>Código</Table.HeaderCell>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                  <Table.HeaderCell>Tempo de entrega mínimo</Table.HeaderCell>
                  <Table.HeaderCell>Tempo de entrega máximo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>{produto.titulo}</Table.Cell>
                    <Table.Cell>{produto.codigo}</Table.Cell>
                    <Table.Cell>{produto.descricao}</Table.Cell>
                    <Table.Cell>{produto.valorUnitario}</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste cliente"
                        icon
                      >
                        <Link
                          to="/form-produto"
                          state={{ id: produto.id }}
                          style={{ color: "green" }}
                        >
                          {" "}
                          <Icon name="edit" />{" "}
                        </Link>
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este produto"
                        icon
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
}
