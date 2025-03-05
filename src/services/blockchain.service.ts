import { ethers } from "ethers";

const ABI = require('./abi.json');
const CONTRACT_ADDRESS="0x3413fCBf8C40771C37F21Fe0a2c25D49FB703EBe";


async function transferUser(wallet : string) : Promise<void> {

    const request = await fetch(`https://j7hbkabx3arix5akoiohnursyy0bowrh.lambda-url.us-west-1.on.aws/transfer/${wallet}`);

    const response = await request.json();

    return response;

}

function delay(){
    const time : number = parseInt(localStorage.getItem('time')!);
    if(!time) localStorage.setItem('time',Date.now().toString());
    if(time < Date.now()) throw "Please wait 24 hours after receipt.";

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
            localStorage.setItem('wallet',accounts[0]);
            delay();
            const tx = await transferUser(accounts[0]);
            return tx;
    
        }

    }catch(err){
        console.log(err);
        return {
            status : 'error',
            error : err
        };
    }

}

export class EuroService{

    provider : any;
    contract : any;
    accounts : any;
    signer : any;

    constructor(){
        this.provider = new ethers.BrowserProvider((window as any).ethereum);
        this.contract = new ethers.Contract(CONTRACT_ADDRESS,ABI,this.provider);
    }

    async  getBalance()  : Promise<string | undefined> {

        const wallet : string | null = localStorage.getItem('wallet');
        const decimals : number  = 10 ** 18;
        if(!wallet) return  undefined;
    
        if((window as any).ethereum){
            try{

                const balance  : bigint  = await this.contract.balanceOf(wallet);
                return (balance / BigInt(decimals)).toString();
            }catch(e){
                console.log(e)
            }
    
        }
    
    }

    async  getUserDelay(): Promise<any> {
        const wallet: string | null = localStorage.getItem('wallet');
        if (!wallet) return undefined;
    
        if ((window as any).ethereum) {
            const accounts = await this.provider.send('eth_requestAccounts', []);
            const signer = await this.provider.getSigner(accounts[0]);
    
            // Certifique-se de que o ABI contém 'getDelay'
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    
            try {
                const balance = await contract.getDelay();
                return Number(balance);
            } catch (error) {
                console.error("Erro ao chamar getDelay:", error);
                return undefined;
            }
        }
    }


}





