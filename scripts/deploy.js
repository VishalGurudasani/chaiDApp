// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}
async function consoleBalances(addresses){
  let counter = 0;
  for(const address of addresses){
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    
    console.log(`At${timestamp},name${name},from${from},message${message}`);
  }
}

async function main() {
  const [owner,from1,from2,from3] = await hre.ethers.getSigners();
  console.log(owner.address);
  //const Chai = await hre.ethers.getContractFactory("chai");
  const Chai = await hre.ethers.deployContract("chai");
  await Chai.waitForDeployment();
  console.log("chai deployed at:", Chai.target)

  // console.log("address of contract:", Chai.address)
  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before Buying Chai");
  await consoleBalances(addresses);
  const amount = ({value:hre.ethers.parseEther("1")})
  await Chai.connect(from1).buyChai("from1","nice cup of tea",amount);
  await Chai.connect(from2).buyChai("from2","nice cup of tea",amount);
  await Chai.connect(from3).buyChai("from3","nice cup of tea",amount);

  console.log("After Buying Chai");
  await consoleBalances(addresses);

  const memos = await Chai.getMemos();
  console.log(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
