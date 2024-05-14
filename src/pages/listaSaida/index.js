import React,{useState,useEffect} from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit,FiSearch,FiTrash } from "react-icons/fi";
import BarraPrincipal from "../componentes/barraPrincipal";

export default function Listasaida(){
const navigate = useNavigate();

    const [saidas,setSaidas] = useState([])
    const [quantidade,setQuantidade] = useState("")
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroData, setFiltroData] = useState("");
 


function mostrarsaidas(){
    const banco = JSON.parse(localStorage.getItem("saidas")|| "[]")
    setQuantidade(banco.length)
    setSaidas(banco);

}

function mostrarproduto(id){
  let produto = JSON.parse(localStorage.getItem("produtos")|| "[]")
 const nome = produto.filter(linha=>{
  return linha.id===id
  })
  return nome[0].descricao;
}

 const buscarproduto=(id)=>{
    const banco = JSON.parse(localStorage.getItem("saidas")|| "[]")
    const produto = banco.filter(linha=> linha.id === id);
    if(produto.length ===0){
        return "Produto não encontrado";
    }
    return produto[0].descricao;
 }

function editarsaida(id){
 alert(`Estou editando uma saida de id:${id}`)
 navigate(`/editarsaida/${id}`)
}

  const  excluirsaida = (id) => {
        confirmAlert({
          title: 'Excluir saida',
          message: 'Deseja realmente excluir essa saida?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                const banco = JSON.parse(localStorage.getItem("saidas")|| "[]")
                const dadosvelhos = banco.filter(linha=>
                  {
                      return linha.id!=id
                  }
                  )
                  localStorage.setItem("saidas",JSON.stringify(dadosvelhos))
                  mostrarsaidas();
              }
            },
            {
              label: 'Não',
              onClick: () => alert('Ação cancelada!')
            }
          ]
        });
      };
      
    
    
    
      function currencyFormat(num) {
        let REAL = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
      });
      return REAL.format(num)
      }

useEffect(()=>{
    mostrarsaidas()
},[])
    return(
<div className="dashboard-container">

  <BarraPrincipal />
  <div className="home-menu">
        <div className="menu">
            <Menu />
        </div>
        <div className="main">
            <Head title="Lista de saidas" />
            <div>

         <Link to="/cadastrosaida" className='btn-novo'>
          Novo
          
          </Link>
            </div>
           <table>
            <tr>
             <th>ID</th>
             <th>ID Produto</th>
             <th>Valor Unitario</th>
             <th>Quantidade</th>
             <th>Total</th>
             <th>Data da saida</th>
            </tr>
            
                {
                  saidas.map((linha)=>{
                     return(
                        <tr key={linha.toString()}>
                        <td>{linha.id}</td>
                        <td>{mostrarproduto(linha.id_produto)}</td>
                        <td>{currencyFormat(linha.valor_unitario)}</td>
                        <td>{linha.quantidade}</td>
                        <td>{currencyFormat(linha.valor_unitario * linha.quantidade)}</td>
                        <td>{linha.data_saida}</td>
                        <td>
                            <FiEdit size={24} color="blue" cursor="pointer" onClick={(e)=>{editarsaida(linha.id)}} />
                        </td>
                        <td>
                            <FiTrash size={24} color="red" cursor="pointer" onClick={(e)=>{excluirsaida(linha.id)}}/>
                        </td>
                        <td>
                            <FiSearch size={24} color="red" cursor="pointer" onClick={(e)=>{buscarproduto(linha.id)}}/>
                        </td>
                        </tr>
                     )
                  })  
                }
     
             <tr>
              <th colSpan={5}>Total de Registros:{quantidade}</th>
   
             </tr>
           </table>
        </div>
        </div>
</div>
    )
}