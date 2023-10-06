import React from 'react'
import {ethers} from "ethers";

const Buy = ({state}) => {
    const buyChai = async(event)=>{
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        console.log(name,message,contract);
        const amount = {value: ethers.parseEther("0.01")};
        const transaction = await contract.buyChai(name,message,amount)
        await transaction.wait();
        console.log("transaction is done");
    }
  return (
    <div>
        <form onSubmit={buyChai}>
            <label >Name</label>
            <input type="text" id='name' placeholder='enter your name'/>
            <label >Message</label>
            <input type="text" id='message' placeholder='enter your message'/>
            <button type='submit'>Pay</button>
        </form>
    </div>
  )
}

export default Buy