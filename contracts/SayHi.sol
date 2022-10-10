// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;
import "hardhat/console.sol";

contract SayHi {
    uint256 totalMessages;
    uint256 private seed;
 
    // event allows to write on the blockchain, more details: https://www.youtube.com/watch?v=nopo9KwwRg4&ab_channel=Pepcoding
    // indexed is used to filter smart contract based on the indexed parameter
    event NewMessage(address indexed from, uint256 timestamp, string message);
    event NewPrize(address indexed winner, uint256 timestamp, uint256 amount);

    struct Message {
        address from;
        uint256 timestamp;
        string message;
    }

    Message[] messages;

    mapping(address => uint256) public lastMessage;

    // allows contract to recieve eth from other addresses after being deployed
    receive() external payable {}

    constructor() payable{
        seed = (block.difficulty + block.timestamp) % 100;
    }
    
    function sendMessage(string memory _message) public {
        require(block.timestamp > lastMessage[msg.sender] + 30 seconds, "Wait 15 seconds");

        lastMessage[msg.sender] = block.timestamp;

        totalMessages+=1;
        
        messages.push(Message(msg.sender, block.timestamp, _message));

        // generate a random number based on the seed
        seed = (block.difficulty + block.timestamp + seed) % 100;

        // give prize 50% of the time
        if(seed < 20){

            uint256 prizeAmount = 0.01 ether;
            // require test a condition and quits with a message if the condition was not met
            require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");
            
            (bool success,) = (msg.sender).call{value:prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
            emit NewPrize(msg.sender, block.timestamp, prizeAmount);
        }
        emit NewMessage(msg.sender, block.timestamp, _message);
        
    }

    // public keyword is used to call the function both externally and internally
    // use external keyword if you only need to call the function externally
    // bcs it's computationally less expensive
    function getAllMessages() public view returns (Message[] memory){
        return messages;
    }

    function getTotalMessages() public view returns (uint256) {
        return totalMessages;
    }

}