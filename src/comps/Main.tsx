
import { useEffect, useState } from "react";
import { getTokens , EuroService } from "../services/blockchain.service"


function Alert(props : any){

    return(
    <div className={props.alert} role="alert" style={{marginTop:"1.25%"}}>
        {props.message}
    </div>
    )


}

function Loading(props : any){

    if(!props.visible){
        return <></>
    }else{
        return(
            <div className="spinner-border text-primary" role="status" style={{marginLeft:"20%"}} >
            <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
}


export default function Main(){


    const [message,setMessage] = useState<string>("");
    const [alert,setAlert] = useState<string>("");
    const [visible,setVisible] = useState<boolean>(false);

    const euroInstance : EuroService = new EuroService();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const balance = await euroInstance.getBalance();
                const delay = await euroInstance.getUserDelay();
    
                let message = "";
                if (balance) {
                    message = `Seu saldo atual: €${balance}`;
                    setAlert('alert alert-primary');
                }
    
                if (delay) {
                    const timestampMilissegundos = Number(delay) * 1000;
                    const data = new Date(timestampMilissegundos);
                    message = `${message}.\nData do Próximo recebimento: ${data.toLocaleString()}`;
                }
    
                setMessage(message);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
    
        fetchData();
    }, []);
    

    const click = async () =>{
        setVisible(true);
        const tx = await getTokens();
        console.log(tx);
        if(tx.status == 'error'){
            setAlert('alert alert-danger');
            setMessage(tx.error);
        }
        else{
            setAlert('alert alert-success');
            setMessage(`Hash da Transação : ${tx.data.hash}`);
        }
        setVisible(false);
    }

    return(
        <main className="card">
        <h5 className="card-header">Faucet de Euro</h5>
        <div className="card-body">
            <h5 className="card-title">Euro</h5>
            <p className="card-text">Ganhe 1 vez por dia €100 euros em faucet utilizando a carteira Metamask Abaixo. <strong>(Utilize Rede Holesky)</strong></p>
            <a  className="btn btn-primary" id="metamask-button" onClick={click}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Logo" style={{width:"10%"}}/>

                Obter Utilizando Metamask
            </a>
            <Loading visible={visible} />
        
            <Alert  message={message} alert={alert} />
            
        </div>
        </main>
    )

}