import { useEffect, useState } from "react"
import Menu from "../componentes/menu"
import Head from "../componentes/head"
import {useNavigate, useParams, Link} from "react-router-dom"
import BarraPrincipal from "../componentes/barraPrincipal";



import '../../global.css'

export default function Editarproduto(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [status,setStatus] = useState("")
    const [descricao,setDescricao] = useState("")
    const [estoque_minimo,setEstoque_minimo] = useState()
    const [estoque_maximo,setEstoque_maximo] = useState()


    const produto={
        id:id,
      status,
      descricao,
      estoque_minimo,
      estoque_maximo
    };
    useEffect(()=>{
        exibirdados()
    },[])



    const exibirdados=()=>{
        const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
        banco.filter(linha=>{ return linha.id===id}).map(value=>{
            setStatus(value.status)
            setDescricao(value.descricao)
            setEstoque_minimo(value.estoque_minimo)
            setEstoque_maximo(value.estoque_maximo)
        })

        // // serve para exibir o item entre os parenteses
        // console.log(banco)
    }
    const salvardados=(e)=>{
      e.preventDefault();
     const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
     const dadosvelhos = banco.filter(linha=>{return linha.id!=id})
     dadosvelhos.push(produto)
     console.log(dadosvelhos)
     localStorage.setItem("produtos",
     JSON.stringify(dadosvelhos))
    alert("Dados Salvos com Sucesso!!!!!")
    navigate("/listaproduto")
    }
    return(
        <div className="dashboard-container">
            <BarraPrincipal />
                <div className="home-menu">
                    <div className="menu">
                        <Menu />
                    </div>
                    <div className="main">
                        <Head title="Editar Produto" />
                    
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