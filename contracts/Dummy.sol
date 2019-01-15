pragma solidity ^0.5.0;
contract Dummy {
  uint x;
  uint y = 1;

  function dummy() public {
    x = 1;
    x = 0;
  }

  function dummy2() public {
    y = 2;
    y = 1;
  }
}
