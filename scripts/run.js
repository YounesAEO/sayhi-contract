const main = async () => {
	const contractFactory = await hre.ethers.getContractFactory('SayHi');
	const contract = await contractFactory.deploy({
		value: hre.ethers.utils.parseEther('0.1'),
	});

	await contract.deployed();
	console.log('contract deployed to : ', contract.address);

	const [_, randomPerson] = await hre.ethers.getSigners();
	let count = await contract.getTotalMessages();
	console.log('Total count : ', count.toNumber());

	// contract balance
	let contractBalance = await hre.ethers.provider.getBalance(
		contract.address
	);

	console.log(
		'Contract balance:',
		hre.ethers.utils.formatEther(contractBalance)
	);

	// first message
	const firstTxn = await contract.sendMessage('Hi :)');
	await firstTxn.wait();

	// second message
	const secondTxn = await contract
		.connect(randomPerson)
		.sendMessage('Hi from a random guy :)');
	await secondTxn.wait();

	contractBalance = await hre.ethers.provider.getBalance(contract.address);

	console.log(
		'Contract balance:',
		hre.ethers.utils.formatEther(contractBalance)
	);

	const allMessages = await contract.getAllMessages();
	count = await contract.getTotalMessages();
	console.log(`All messages (${count}): `);
	console.log(allMessages);
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
