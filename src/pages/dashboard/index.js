import React from "react";
import '../../global.css'
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import BarraPrincipal from "../componentes/barraPrincipal";

export default function Dashboard(){
    return(
      
<div className="dashboard-container">

        
          <BarraPrincipal />
       
            <div className="home-menu">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Home" />
                </div>
            </div>
</div>
    )
}