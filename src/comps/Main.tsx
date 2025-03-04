
import { getTokens } from "../services/blockchain.service"


export default function Main(){


    const login = async () =>{
        const tx = await getTokens();
        console.log(tx);
    }

    return(
        <main className="card">
        <h5 className="card-header">Faucet de Euro</h5>
        <div className="card-body">
            <h5 className="card-title">Euro</h5>
            <p className="card-text">Ganhe 1 vez por dia €100 euros em faucet utilizando a carteira Metamask Abaixo. <strong>(Utilize Rede Holesky)</strong></p>
            <a  className="btn btn-primary" id="metamask-button" onClick={login}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Logo" style={{width:"10%"}}/>

                Obter Utilizando Metamask
            </a>
        </div>
        </main>
    )

}