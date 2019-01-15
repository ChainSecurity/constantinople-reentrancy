pragma solidity ^0.5.0;

contract PaymentSharer {
  uint split;
  uint deposits;
  address payable first;
  address payable second;

  function PaymentSharer(address payable _first, address payable _second) public {
    first = _first;
    second = _second;
  }

  function deposit() public payable {
    deposits += msg.value;
  }

  function updateSplit(uint _split) public {
    require(_split <= 100);
    split = _split;
  }

  function splitFunds() public {
    // TODO: Checks signatures passed in that both parties agree with this split

    // Split
    a.transfer(deposits * split / 100);
    b.transfer(deposits * (100 - split) / 100);
  }
}
