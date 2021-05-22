pragma solidity ^0.5.16;

contract DappToken {
    uint public totalSupply;
    constructor(uint _intialSupply ) public{
        totalSupply = _intialSupply;
    }
}