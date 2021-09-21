// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(300);
    await marketplace.deployed();
    console.log("Marketplace Deployed to: ", marketplace.address);

    const Creatify = await hre.ethers.getContractFactory("Creatify");
    const creatify = await Creatify.deploy("Creatify", "CRFTY", "https://localhost:9080/creatify/artifacts/", marketplace.address);
    await creatify.deployed();
    console.log("Creatify Deployed to:", creatify.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
});
