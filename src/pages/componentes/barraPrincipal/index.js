import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import logoicon from '../../../assets/img/logo1.png'
import {FiLogOut} 
from "react-icons/fi";
 
export default function BarraPrincipal(){
    const navigate = useNavigate();
    const Sair = () => {
        confirmAlert({
          title: 'Saindo do Sistema',
          message: 'Deseja realmente sair do sistema?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                    navigate("/")
              }
            },
            {
              label: 'Não',
              onClick: () => alert('Ação cancelada!')
            }
          ]
        });
      };
return(
    <div className='barraprincipal'>
        <img className='logoicon' src={logoicon}/>
        <h1>
            Papelaria do Futuro
        </h1>
                <FiLogOut onClick={Sair} size={30}/> 
    </div>
)
}