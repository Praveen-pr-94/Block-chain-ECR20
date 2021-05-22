pragma solidity ^0.5.16;

contract DappToken {
    uint public totalSupply;
    string public name= "DappToken";
    string public symbol= "Dapp";
    string public statndard= "Dapp token v1.0";
    mapping(address => uint) public balanceOf;
    constructor(uint _intialSupply ) public{
        balanceOf[msg.sender] = _intialSupply;
        totalSupply = _intialSupply;
    }
}