import React, { useState, useEffect } from "react";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import { useNavigate } from "react-router-dom";
import BarraPrincipal from "../componentes/barraPrincipal";

import "../../global.css";

export default function Saida() {
  const navigate = useNavigate();
  const [id_produto, setIdproduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor_unitario, setValor_unitario] = useState("");
  const [data_saida, setData_saida] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [desconto, setDesconto] = useState(0);

  useEffect(() => {
    mostrarprodutos();
  }, []);

  function mostrarprodutos() {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(banco);
  }

  const salvardados = (e) => {
    e.preventDefault();
    const estoques = JSON.parse(localStorage.getItem("estoques") || "[]");

    const valor_unitario_com_desconto = parseFloat(valor_unitario) * (1 - parseFloat(desconto) / 100);

    const saida = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
      id_produto,
      quantidade,
      valor_unitario: valor_unitario_com_desconto.toFixed(2),
      data_saida,
    };

    const saidas = JSON.parse(localStorage.getItem("saidas") || "[]");
    saidas.push(saida);
    localStorage.setItem("saidas", JSON.stringify(saidas));

    const produtoexiste = estoques.filter((linha) => linha.id_produto === id_produto);

    if (produtoexiste.length > 0 && produtoexiste[0].id_produto) {
      const paraatualizar = estoques.filter((linha) => linha.id_produto !== id_produto);
      const qtde_estoque = produtoexiste ? produtoexiste[0].quantidade : 0;
      const id_estoque = produtoexiste ? produtoexiste[0].id : 0;
      const atualizarestoque = {
        id: id_estoque,
        id_produto: id_produto,
        quantidade: parseFloat(qtde_estoque) - parseFloat(saida.quantidade),
        valor_unitario: saida.valor_unitario,
      };
      paraatualizar.push(atualizarestoque);
      localStorage.setItem("estoques", JSON.stringify(paraatualizar));
    } else {
      const novoestoque = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        quantidade: saida.quantidade,
        valor_unitario: saida.valor_unitario,
      };
      estoques.push(novoestoque);
      localStorage.setItem("estoques", JSON.stringify(estoques));
    }

    alert("Dados Salvos com Sucesso!!!!!");
    navigate("/listasaida");
  };

  return (
    <div className="dashboard-container">
      <BarraPrincipal />
      <div className="home-menu">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Cadastro Saida" />
          <form onSubmit={salvardados}>
            <select onChange={(e) => setIdproduto(e.target.value)}>
              <option>Selecione um produto</option>
              {produtos.map((linha) => {
                return (
                  <option value={linha.id} key={linha.id}>
                    {linha.descricao}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <input
              type="text"
              placeholder="Valor Unitário"
              value={valor_unitario}
              onChange={(e) => setValor_unitario(e.target.value)}
            />
            <h6>Desconto:</h6>
            <select value={desconto} onChange={(e) => setDesconto(e.target.value)}>
              {[...Array(41).keys()].map((valor) => (
                <option value={valor} key={valor}>
                  {valor}%
                </option>
              ))}
            </select>
            <input
              type="date"
              placeholder="Data da Saida"
              value={data_saida}
              onChange={(e) => setData_saida(e.target.value)}
            />
            <button className="btn-salvar">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
