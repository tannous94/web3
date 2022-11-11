import { useState } from 'react';
import { ethers } from 'ethers';
import Socials from './Socials';

const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) 
    : ethers.providers.getDefaultProvider());
const signer = ((window.ethereum != null) ? provider.getSigner() : null);

function WalletBalance() {

    window.onload = (event) => {
        getAddr().catch(() => {
            console.log('No Metamask!');
        });
    };
           
    const [addr, setAddr] = useState();
    const getAddr = async () => {
        await signer.getAddress().then((wallterAddr) => {
            setAddr(wallterAddr);
        }).catch(() => {
            console.log('No wallet connected!');
        });
    };

    const connectWallet = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const [accounts] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.location.reload()
        } else {
            window.open('https://metamask.io/download/', '_blank');
        }
    };

    return (
        <div className="connectButton" >
             {
                (addr == undefined) ? (
                    <div>
                        <button onClick={() => connectWallet()}>Connect MetaMask</button>
                        <Socials />
                    </div>
                ) : (
                    <div>
                        Connected Wallet: <font color="white">{addr}</font>
                        <Socials />
                    </div>
                )
            }
        </div>
    );
};

export default WalletBalance;