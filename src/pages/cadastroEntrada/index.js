import { useState,useEffect} from "react"
import Menu from "../componentes/menu"
import Head from "../componentes/head"
import {useNavigate, Link} from "react-router-dom"
import BarraPrincipal from "../componentes/barraPrincipal";


import '../../global.css'

export default function Entrada(){
    const navigate = useNavigate();
    const [id_produto,setIdproduto] = useState("")
    const [quantidade,setQuantidade] = useState("")
    const [valor_unitario,setValor_unitario] = useState()
    const [data_entrada,setData_entrada] = useState()
    const [produtos,setProdutos] = useState([])
    


    // const entrada={
    //     id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
    //     id_produto,
    //     quantidade,
    //     valor_unitario,
    //     data_entrada
    // }

    
    
    
    useEffect(()=>{
        mostrarprodutos();
      },[])
      
      function mostrarprodutos(){
      
        const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
        setProdutos (banco);
    }

    const salvardados = (e) => {
      e.preventDefault();
      const estoques = JSON.parse(localStorage.getItem("estoques") || "[]");
      console.log(typeof estoques)
      //iniciando para atualizar entrada
      const entrada = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        quantidade,
        valor_unitario,
        data_entrada,
      };
      //buscando todos os produtos no estoque
      
    //filtrando o produto no estoque
  
      // Se 'estoques' for um array, continue com o código para filtrá-lo.
      console.log("estou no primeiro filter")
      const produtoexiste = estoques.filter((linha) =>{
       return linha.id_produto === id_produto
      } );
      // Restante do código...
  
      //independente de ter o produto no estoque ou nao, aqui será inserido no estoque 
      const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
      entradas.push(entrada);
      localStorage.setItem("entradas", JSON.stringify(entradas)); 
  // até aqui a entrada foi inserida, lembrando que será inserida independente de haver o produto ou nao no estoque
  
  
      //atualizando estoque
  // aqui verificaremos se o id do produto que foi inserido na entrada, consta no estoque
  if (produtoexiste.length > 0 && produtoexiste[0].id_produto) {
        // caso o produto seja encontrado no estoque, nesse bloco, faremos a atualização da quantidade e do valor desse produto
        console.log("estou no segundo filter")          
        const paraatualizar = estoques.filter((linha)=>{
                   return linha.id_produto !== id_produto // fazando um filtro para verificar se o produto esta no estoque
                  })
                  const qtde_estoque = produtoexiste ? produtoexiste[0].quantidade : 0;
                  const id_estoque = produtoexiste ? produtoexiste[0].id : 0;
                  // aqui faremos a atualização no estoque, na situação de acharmos o produto no estoque
                  const atualizarestoque ={
                    id:id_estoque,
                    id_produto:id_produto,
                    quantidade: (parseFloat(qtde_estoque) + parseFloat(entrada.quantidade)),
                    valor_unitario: entrada.valor_unitario,
                  }
                  paraatualizar.push(atualizarestoque) // aqui estamos juntando o que não foi alterado no estoque com os dados que serão alterados
                  localStorage.setItem("estoques", JSON.stringify(paraatualizar));// pronto agora o estoque será alterado
      } else {
        // aqui vai acontecer somente se o produto não foi encontrado no estoque anteriormente.
            
        const novoestoque = {
                  id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
                  id_produto,
                  quantidade: entrada.quantidade,
                  valor_unitario: entrada.valor_unitario,
                };
                estoques.push(novoestoque)  
                localStorage.setItem("estoques", JSON.stringify(estoques));
      }
  
      alert("Dados Salvos com Sucesso!!!!!");
      navigate("/listaentrada");
    };
    return(
        <div className="dashboard-container">
            <BarraPrincipal />
                <div className="home-menu">
                    <div className="menu">
                        <Menu />
                    </div>
                    <div className="main">
                        <Head title="Cadastro entrada" />
                        <form onSubmit={salvardados} >

                        <select onChange={(e)=>setIdproduto(e.target.value)}>
                        <option>Selecione um produto</option>
                        {
                                produtos.map((linha) => {

                                    return(
                                        <option value={linha.id}>                   {linha.descricao}</option>
                                            )
                                            })
                                }

                      </select>
                          
                           <input
                           type="text"
                           placeholder="Quantidade"
                           value={quantidade}
                           onChange={(e)=>setQuantidade(e.target.value)}
                           />
                           <input
                           type="text"
                           placeholder="Valor Unitário"
                           value={valor_unitario}
                           onChange={(e)=>setValor_unitario(e.target.value)}
                           />
                           <input
                           type="date"
                           placeholder="Data da entrada"
                           value={data_entrada}
                           onChange={(e)=>setData_entrada(e.target.value)}
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