import React, { useState } from "react";
import '../../global.css'
import logo from '../../assets/img/logo1.png'
import {useNavigate} from 'react-router-dom'

export default function Logon(){
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState()
    const navigate = useNavigate();
    const banco = JSON.parse(localStorage.getItem("usuarios")|| "[]")

    const logar=(e)=>{   
      e.preventDefault()

    if(!email || !senha){
        alert("Dados incorretos ou vazios")
    }else{
        const usuariologado = banco.filter(linha=>{return linha.email===email && linha.senha===senha})
    
        if(usuariologado.length>0){
            navigate('/dashboard')
        }else{
            alert("Email ou senha incorretos")
        }
    }


    }
   return(
    <div className="logon-container">
        <section className="form">
           <img src={logo} width={200} />
           <h1>Faça seu login</h1>
            <form onSubmit={logar}>
                <input 
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}   
                />
                <input 
                placeholder="Senha"
                type="password"
                value={senha}
                onChange={(e)=>setSenha(e.target.value)} 
                />
                <button className="button_login" type="submit">
                    Entrar
                </button>
            </form>
        </section>
    </div>
   ) 
}