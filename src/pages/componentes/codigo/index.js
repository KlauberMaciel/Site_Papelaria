import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Barcode from 'react-barcode';



 
export default function Codigo(){
    const navigate = useNavigate();
    const [codigo,setCodigo] = useState("")
    const [produtos,setProdutos]= useState([]);
    
   useEffect(()=>{
    const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
    setProdutos(banco)
  
   },[])

    

    

return(
    <div>
        <table>

        <tr>
            codigo
        </tr>

{
                  produtos.map((linha)=>{
                     return(
                        <tr key={linha.toString()}>
                        <td>{<Barcode value={linha.id} />}</td>
                        </tr>
          
                     )
                  })  
                }

    </table>
</div>



)
}