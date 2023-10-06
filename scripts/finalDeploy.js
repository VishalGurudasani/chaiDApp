const hre = require("hardhat");
async function main() {
    const [owner,from1,from2,from3] = await hre.ethers.getSigners();
    console.log(owner.address);
    //const Chai = await hre.ethers.getContractFactory("chai");
    const Chai = await hre.ethers.deployContract("chai");
    await Chai.waitForDeployment();
    console.log("chai deployed at:", Chai.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });