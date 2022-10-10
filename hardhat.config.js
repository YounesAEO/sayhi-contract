require('@nomicfoundation/hardhat-toolbox');
require('dotenv');

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	// to deploy on a test/main network uncomment the following key
	// networks: {
	// 	goerli: {
	// 		url: process.env.QUICKNODE_API_KEY,
	// 		accounts: [process.env.METAMASK_PRIVATE_KEY],
	// 	},
	// },
};
