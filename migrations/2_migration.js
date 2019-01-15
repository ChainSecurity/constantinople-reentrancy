var PaymentSharer = artifacts.require("PaymentSharer");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(PaymentSharer);
};

