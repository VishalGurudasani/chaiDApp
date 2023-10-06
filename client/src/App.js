import "./App.css";
import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memoss from "./components/Memoss";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account,setAccount] = useState("none");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x997c46d8c34FbF51E70B3E0fd16F948879c71c24";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          window.ethereum.on("chainchanged",()=>{
            window.location.reload();
          })
          window.ethereum.on("Accountchanged",()=>{
            window.location.reload();
          })
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setAccount(account);
        setState({ provider, signer, contract });
      }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return( 
 
  <div className="App">
     <p>Connected Account - {account}</p>
    <Buy state = {state}/>
    <Memoss state = {state}/>
  </div>
  )
}

export default App;
