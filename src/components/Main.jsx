import { ethers } from 'ethers';
import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';
import SkeletonFamClub from '../../artifacts/contracts/MyNFT.sol/SkeletonFamClub.json'

// update smart contract when you deploy it to mainnet
const contractAddress = '0x14F2502cc1853B5a5d44da09BB1B1D8996F44eb3';
const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) 
    : ethers.providers.getDefaultProvider());
const signer = ((window.ethereum != null) ? provider.getSigner() : null);
const contract = new ethers.Contract(contractAddress, SkeletonFamClub.abi, signer);
const etherRatio = Math.pow(10, 18);
const maxMints = 10000;

function Main() {

    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
        getCount().catch(() => {
            console.log('No wallet connected!');
        });
    }, []);
    const getCount = async () => {
        const count = await contract.count();
        setTotalMinted(parseInt(count));
    };

    const [addr, setAddr] = useState();
    useEffect(() => {
        getAddr().catch(() => {
            console.log('No Metamask!');
        });
    }, []);
    const getAddr = async () => {
        await signer.getAddress().then((wallterAddr) => {
            setAddr(wallterAddr);
        }).catch(() => {
            console.log('No wallet connected!');
        });
    };

    const [isAct, setIsAct] = useState();
    useEffect(() => {
        getIsAct().catch(() => {
            console.log('No wallet connected!');
        });
    }, []);
    const getIsAct = async () => {
        const status = await contract.getSaleStatus();
        setIsAct(status);
    };

    const updateAmmount = async (v) => {
        const pr = await contract.getCost();
        let lbl = document.getElementById("am");
        let lblVal = lbl.innerText;
        let newAmmount = parseInt(lblVal) + v;

        let tpr = document.getElementById("tp");
        const totalPrice = newAmmount * pr / etherRatio;
        if (newAmmount >= 1 && newAmmount <= 20) {
            lbl.innerText = newAmmount;
            tpr.innerText = totalPrice;
        }
    }

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = signer.getAddress();
        const amount = parseInt(document.getElementById("am").innerText);
        const price = await contract.getCost();
        const totalPrice = amount * price / etherRatio;
        const balance = await provider.getBalance(addr);

        if (balance / etherRatio < totalPrice) {
            document.getElementById("msg").innerText = "Not enough ETH in wallet!";
        } else {
            document.getElementById("msg").innerText = "";
            if (maxMints - totalMinted >= amount) {
                document.getElementById("msg").innerText = "";
                const result = await contract.mint(addr, amount, {
                    value: ethers.utils.parseEther('' + totalPrice)
                });
    
                await result.wait();
                window.location.reload();
            } else {
                document.getElementById("msg").innerText = "Only " + (maxMints - totalMinted) + " left to mint!";
            }
        }
    };

    return (
        
        <div>
            <script type="text/javascript">
                $(document).ready(function() {
                    document.title = 'SFC'
                });
            </script>
            <link rel="icon" type="image/png" href="src/components/img/favicon.png" />
            
            <img src="src/components/img/banner.png" height="490" className="banner" />
            <WalletBalance />
            <h2><center>Skeleton Fam Club</center></h2>
            <center>
                <table width="100%">
                    <tbody>
                    <tr>
                        <td width="50%" className="middle">
                            <center><p className="prev"></p></center>
                        </td>
                        <td width="50%" className="middle">
                            <center>
                            {
                                (addr == undefined) ? (
                                    <div>
                                       <font color="white" size="5">
                                        You <u><b>must</b></u> be connected to a wallet in order to be able to mint!
                                        </font>
                                       <br />
                                       <font color="white" size="2">Use the button on the top left to connect to your MetaMask wallet.</font>
                                    </div>
                                ) : (
                                    <div>
                                        <font color="white" size="5">
                                        <h2>Total Minted: {totalMinted} / {maxMints}</h2>
                                        <br />
                                        <br />
                                        {
                                            (isAct) ? (
                                                (totalMinted < maxMints) ? (
                                                    <div>
                                                    Join SFC, Mint Now
                                                    <br />
                                                    <font color="white" size="4">Total price: <b><label id="tp">0.03</label> ETH</b></font>
                                                    <br />
                                                    <br />
                                                    <button className="leftbutton" onClick={() => updateAmmount(-1)}>-</button>
                                                    <div className="amlbl"><label id="am" >1</label></div>
                                                    <button className="rightbutton" onClick={() => updateAmmount(1)}>+</button>
                                                    <br />
                                                    <br />
                                                    <button onClick={() => mintToken()}><b>MINT</b></button>
                                                    <br />
                                                    <font color="#FF8623" size="4" ><label id="msg" ></label></font>
                                                    </div>
                                                ) : (
                                                    <div className="soldout" >
                                                        <font size="6" color="#FF8623" ><i>SOLD OUT!</i></font>
                                                    </div>
                                                )
                                                
                                            ) : (
                                                <div>
                                                    <b><font color="#FF8623" >Sale is NOT active yet!</font></b>
                                                    <br />
                                                    Follow our Twitter and Discord channel for announcements on the minting date.
                                                </div>
                                            )
                                        }
                                        </font>
                                    </div>
                                )
                            }
                            </center>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="middle">
                            <center>
                                <div className="aboutus" >
                                    <p className="ab4" ><i>ABOUT US</i></p>
                                    <p className="ab5" >
                                        The Skeleton Fam Club is a collection of 10,000 unique Skeleton NFTs - unique digital collectibles living on the Ethereum blockchain.
                                        A new special collection that includes a wide variety of new traits. It was created by two cousins, a software developer and an artist. With an amazing combination of their powers the SFC collection has come to life.
                                        <br /><br />
                                        Become a member by minting a Skeleton or buying on OpenSea. Our family will grow stronger with each and everyone of you.
                                    </p>
                                </div>
                            </center>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </center>
            <hr />
            <center>
                <table width="100%">
                <tbody>
                    <tr>
                        <td className="contract">
                            Smart Contract &gt; <a href="https://etherscan.io/address/0x14F2502cc1853B5a5d44da09BB1B1D8996F44eb3">Details</a> &lt;
                        </td>
                        <td className="logo">
                            <center>
                                <img src="src/components/img/logo.png" width="60" height="60" />
                            </center>
                        </td>
                        <td className="rights">
                            All Rights Reserved, &copy; 2022
                        </td>
                    </tr>
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Main;