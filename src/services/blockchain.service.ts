import { ethers } from "ethers";



async function transferUser(wallet : string) : Promise<void> {

    const request = await fetch(`http//localhost:3030/transfer/${wallet}`);

    const response = await request.json();

    return response;

}

function delay(){
    const time : number = parseInt(localStorage.getItem('time')!);
    if(!time) localStorage.setItem('time',Date.now().toString());
    if(time < Date.now()) throw "Wait For Delay";

}


export async function getTokens() : Promise<any> {

    try{

        const _window = (window as any).ethereum;
        if(!_window){
            const question : boolean = window.confirm('Você não Possui a Carteira Metamask Instalada , Deseja Instalar ?');
            if(question){
                window.open('https://www.metamask.io','_blank')   
            }
        }
        else{
            const provider = new ethers.BrowserProvider(_window);
            const accounts = await provider.send('eth_requestAccounts',[]);
            console.log(accounts[0]);
            delay();
            const tx = {}//await transferUser(accounts[0]);
            return tx;
    
        }

    }catch(err){
        console.log(err);
        return err;
    }

}