const main = async () => {
	const [deployer] = await hre.ethers.getSigners();
	const accountBalance = await deployer.getBalance();
	console.log('Account Balance : ', accountBalance.toString());

	const contractFactory = await hre.ethers.getContractFactory('SayHi');
	const contract = await contractFactory.deploy({
		value: hre.ethers.utils.parseEther('0.2'),
	});
	await contract.deployed();

	console.log('SayHi deployed at : ', contract.address);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
