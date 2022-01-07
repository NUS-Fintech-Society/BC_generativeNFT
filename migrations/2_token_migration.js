const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(
    Token,
    "ipfs://bafybeidxwe3gk4bnvwxvfvdkye4gugm2v6sqna47sehaapbjyjc4557k74/"
  );
};
