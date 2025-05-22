import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListCliente from './views/cliente/ListCliente';
import ListEntregador from './views/entregador/ListEntregador';
import ListProduto from './views/produto/ListProduto';
import FormEntregador from './views/entregador/FormEntregador';
import FormCliente from './views/cliente/FormCliente';
import ListCategoria from './views/categoria/ListCategoria';
import FormCategoria from './views/categoria/FormCategoria';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="form-cliente" element={<FormCliente />} />
                <Route path="list-cliente" element={<ListCliente />} />
                <Route path="form-produto" element={<FormProduto />} />
                <Route path="list-produto" element={<ListProduto />} />
                <Route path="form-entregador" element={<FormEntregador />} />
                <Route path="list-entregador" element={<ListEntregador />} />
                <Route path='list-categoria' element={<ListCategoria />} />
                <Route path='form-categoria' element={<FormCategoria />} />
            </Routes>
        </>
    )
}

export default Rotas