



export default function Main(){

    return(
        <main className="card">
        <h5 className="card-header">Faucet de Euro</h5>
        <div className="card-body">
            <h5 className="card-title">Euro</h5>
            <p className="card-text">Ganhe 1 vez por dia €100 euros em faucet utilizando a carteira Metamask Abaixo. <strong>(Utilize Rede Holesky)</strong></p>
            <a  className="btn btn-primary" id="metamask-button">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Logo" style={{width:"5%"}}/>

                Entrar com Metamask
            </a>
        </div>
        </main>
    )

}