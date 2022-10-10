# Say Hi Smart Contract

## Description

This project is a basic implementation of a smart contract using [hardhat](https://hardhat.org/) SDK. The smart contract is powering [sayhi](https://github.com/YounesAEO/sayhi) webapp, which is a simple website where you can send me memes for some eth (fake eth :)).

## Getting Started

To run locally:

1. Clone repo: https://github.com/YounesAEO/sayhi-contract.git
2. Install dependencies: `npm install`
3. run the following commands to make sure all dependencies were installed

```shell
npx hardhat help
npx hardhat node
npx hardhat run scripts/run.js
```

4. To deploy your contract on a test/main network you need a node provider. Checkout [Quicknode](https://www.quicknode.com/) for an easy setup.

5. add your API_KEY and PRIVATE_KEY to an .env file (see .example.env)

6. run `npx hardhat run scripts/deploy.js` to deploy your contract on the network
