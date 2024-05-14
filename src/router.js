import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Logon from './pages/logon'
import Dashboard from './pages/dashboard'
import Cadastrousuario from './pages/cadastroUsuario'
import Cadastroproduto from './pages/cadastroProduto'
import Cadastroentrada from './pages/cadastroEntrada'
import Cadastrosaida from './pages/cadastroSaida'
import Listausuarios from './pages/listaUsuarios'
import Listaprodutos from './pages/listaProdutos'
import Listaentrada from './pages/listaEntrada'
import Listasaida from './pages/listaSaida'
import Listaestoque from './pages/listaEstoque'
import Editarusuarios from './pages/editarUsuario'
import Editarprodutos from './pages/editarProduto'

export default function Rotas(){
    return(
     <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Logon />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/cadastrousuario"  element={<Cadastrousuario />}/>
        <Route path="/cadastroproduto"  element={<Cadastroproduto />}/>
        <Route path="/cadastroentrada"  element={<Cadastroentrada />}/>
        <Route path="/cadastrosaida"  element={<Cadastrosaida />}/>
        <Route path="/listausuario"  element={<Listausuarios />} />
        <Route path="/listaproduto"  element={<Listaprodutos />}/>
        <Route path="/listaentrada"  element={<Listaentrada />}/>
        <Route path="/listasaida"  element={<Listasaida />}/>
        <Route path="/listaestoque"  element={<Listaestoque />}/>
        <Route path="/editarusuario/:id"  element={<Editarusuarios />} />
        <Route path="/editarproduto/:id"  element={<Editarprodutos />} />


        </Routes>
     
     </BrowserRouter>

    )
}

