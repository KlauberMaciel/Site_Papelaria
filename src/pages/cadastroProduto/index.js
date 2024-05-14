import { useState } from "react"
import Menu from "../componentes/menu"
import Head from "../componentes/head"
import {useNavigate, Link} from "react-router-dom"
import BarraPrincipal from "../componentes/barraPrincipal";


import '../../global.css'

export default function Cadastroproduto(){
    const navigate = useNavigate();
    const [status,setStatus] = useState("")
    const [descricao,setDescricao] = useState("")
    const [estoque_minimo,setEstoque_minimo] = useState()
    const [estoque_maximo,setEstoque_maximo] = useState()
    


    const produto={
        id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
        status,
        descricao,
        estoque_minimo,
        estoque_maximo


    };
    const salvardados=(e)=>{
        e.preventDefault();
        if(!status.trim() || !descricao.trim() || !estoque_minimo.trim() || !estoque_maximo.trim()){
            alert("Um ou mais campos estão vazios")
        }else{
            const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
            banco.push(produto)
            localStorage.setItem("produtos",
            JSON.stringify(banco))
            navigate("/listaproduto")            
        } 
    }
    return(
        <div className="dashboard-container">
            <BarraPrincipal />
                <div className="home-menu">
                    <div className="menu">
                        <Menu />
                    </div>
                    <div className="main">
                        <Head title="Cadastro de Produto" />
                        <form onSubmit={salvardados} >
                    
                           <input
                           type="text"
                           placeholder="Status"
                           value={status}
                           onChange={(e)=>setStatus(e.target.value)}
                    
                           />
                           <input
                           type="text"
                           placeholder="Descrição"
                           value={descricao}
                           onChange={(e)=>setDescricao(e.target.value)}
                           />
                           <input
                           type="text"
                           placeholder="Estoque Mínimo"
                           value={estoque_minimo}
                           onChange={(e)=>setEstoque_minimo(e.target.value)}
                           />
                           <input
                           type="text"
                           placeholder="Estoque Máximo"
                           value={estoque_maximo}
                           onChange={(e)=>setEstoque_maximo(e.target.value)}
                           />
                         
                           <button className="btn-salvar">
                            Salvar
                           </button>
                    
                        </form>
                    </div>
                </div>
        </div>
            )
            
}