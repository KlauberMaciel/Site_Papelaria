import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Logon from './pages/logon'
import Dashboard from './pages/dashboard'
import Cadastrousuario from './pages/cadastroUsuario'

import Listausuarios from './pages/listaUsuarios'
import Listaprodutos from './pages/listaProdutos'

import Editarusuario from './pages/editarUsuario'

export default function Rotas(){
    return(
     <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Logon />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/cadastrousuario"  element={<Cadastrousuario />} />
        <Route path="/listausuario"  element={<Listausuarios />} />
        <Route path="/listaproduto"  element={<Listaprodutos />} />
        <Route path="/editarusuario/:id"  element={<Editarusuario />} />


        </Routes>
     
     </BrowserRouter>

    )
}

