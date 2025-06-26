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
import FormLogin from './views/login/FormLogin';
import { ProtectedRoute } from './views/util/ProtectedRoute';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="/home" element={ 
                    <ProtectedRoute>
                        <Home/> 
                    </ProtectedRoute>
                } />

                <Route path="form-cliente" element={
                    <ProtectedRoute>
                        <FormCliente />
                    </ProtectedRoute>
                        } />
                <Route path="list-cliente" element={
                    <ProtectedRoute>
                        <ListCliente />
                    </ProtectedRoute>
                    } />
                <Route path="form-produto" element={
                    <ProtectedRoute>
                        <FormProduto />
                    </ProtectedRoute>
                    } />
                <Route path="list-produto" element={
                    <ProtectedRoute>
                        <ListProduto />
                    </ProtectedRoute>
                    } />
                <Route path="form-entregador" element={
                    <ProtectedRoute>
                        <FormEntregador />
                    </ProtectedRoute>
                    } />
                <Route path="list-entregador" element={
                    <ProtectedRoute>
                        <ListEntregador />
                    </ProtectedRoute>
                    } />
                <Route path='list-categoria' element={
                    <ProtectedRoute>
                        <ListCategoria />
                    </ProtectedRoute>
                    } />
                <Route path='form-categoria' element={
                    <ProtectedRoute>
                        <FormCategoria />
                    </ProtectedRoute>
                    } />
            </Routes>
        </>
    )
}

export default Rotas