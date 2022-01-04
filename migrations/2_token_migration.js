const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(
    Token,
    "ipfs://bafybeid3uax2233msfrrdwncvwfswt2mathnzviohll4nbnrutws47yrmq/"
  );
};
