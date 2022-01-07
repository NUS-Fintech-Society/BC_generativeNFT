const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");
const Token = artifacts.require("./Token.sol");
const { ethers } = require("ethers");

contract("Token", (accounts) => {
  // global instance of contract
  let contract;
  // stand-in baseURI
  let baseURI = "ipfs://bafybeidxwe3gk4bnvwxvfvdkye4gugm2v6sqna47sehaapbjyjc4557k74/";
  let [alice, bob] = accounts;
  let MAX_SUPPLY = 250

  before(async () => {
    contract = await Token.deployed(baseURI);
  });

  describe("deployment", async () => {
    // Test Case 1 : Contract can be deployed successfully
    it("contract deployed successfully", async () => {
      const address = contract.address;
      // console.log(address);
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    // Test Case 2 : Should return correct name and symbol 
    it("has a name and symbol", async () => {
      const name = await contract.name();
      const symbol = await contract.symbol();
      assert.equal(name, "Sonobe: Orbs and Jewels");
      assert.equal(symbol, "ORB");
    });
  });

  describe("minting", async () => {
    // Test Case 3: tokenURI and Transfer event should be correct
    it("creates a new token and transfer event emitted", async () => {
      const result = await contract.mintTokens(1, "sample quote", {
        value: ethers.utils.parseEther("0.01").toString(),
      });
      const event = result.logs[0].args; // Transfer event when _safeMint is called
      let uri = await contract.tokenURI(event.tokenId);
      assert.equal(
        uri,
        `${baseURI}0`
      );
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is incorrect"
      );
      assert.equal(event.to, alice, "to is incorrect");
      assert.equal(event.tokenId, 0, "tokenId is incorrect");
    });

    it("quote event emitted", async() => {
      const result = await contract.mintTokens(1, "I\'m not superstitious, but I am a little stitious.", {value: ethers.utils.parseEther("0.01").toString()});
      const event = result.logs[1].args; // Quote event when _mintOneToken is called
      assert.equal(event.creator, alice, "creator is incorrect");
      assert.equal(event.tokenId, 1, "tokenId is incorrect");
      assert.equal(event.quote, "I\'m not superstitious, but I am a little stitious.", "quote is incorrect");
    })

    // Test Case 4: Failure when quantity exceeds
    it("should reject transaction if quantity minted exceeds max supply", async () => {
      await truffleAssert.reverts(
        contract.mintTokens(MAX_SUPPLY, "sample quote", { value: ethers.utils.parseEther("2.50").toString() })
      );
    });

    // Test Case 5: Failure when not enough ether supplied
    it("should reject transaction if not enough ether supplied", async () => {
      await truffleAssert.reverts(
        contract.mintTokens(1, "sample quote", { value: ethers.utils.parseEther("0.005").toString() })
      );
    });

    // Test Case 6: Failure when attempt to mint 0 token
    it("should reject transaction if number of tokens minted is zero", async () => {
      await truffleAssert.reverts(
        contract.mintTokens(0, "sample quote", { value: ethers.utils.parseEther("0.01").toString()})
      );
    });
  });

  describe("querying data", async () => {
    // Test Case 7: Correct display of token for specific owner
    it("query of tokens for specific owner", async () => {
      await contract.mintTokens(2, "sample quote", {
        from: alice,
        value: ethers.utils.parseEther("0.02").toString(),
      });
      await contract.mintTokens(3, "sample quote", {
        from: bob,
        value: ethers.utils.parseEther("0.03").toString(),
      });
      await contract.mintTokens(1, "sample quote", {
        from: alice,
        value: ethers.utils.parseEther("0.01").toString(),
      });
      let result = await contract.tokensOfOwner(accounts[0]);
      let expected = ["0", "1", "2", "3", "7"];
      assert.equal(
        result.join(","),
        expected.join(","),
        "tokens returned incorrect"
      );
      result = await contract.tokensOfOwner(accounts[1]);
      expected = ["4", "5", "6"];
      assert.equal(
        result.join(","),
        expected.join(","),
        "tokens returned incorrect"
      );
    });

    // Test Case 8: Correct display of token for all owners
    it("query of tokens for all", async () => {
      let result = await contract.tokensOfAll();
      let expected = ["0", "1", "2", "3", "4", "5", "6", "7"];
      assert.equal(
        result.join(","),
        expected.join(","),
        "tokens returned incorrect"
      );
    });
  });

  describe("pausable functionality", async () => {
    // Test Case 9: Failure to pause contract if called from wrong address
    it("should reject pause if called from non-owner address", async () => {
      await truffleAssert.reverts(contract.pause({ from: bob })); // alice is the owner of contract
    });

    // Test Case 10: Failure to mint Token after contract is paused
    it("should reject transaction after contract has been paused", async () => {
      await contract.pause({ from: alice });
      await truffleAssert.reverts(
        contract.mintTokens(1, "sample quote", { value: web3.utils.toWei("0.01", "ether") })
      );
    });
  });
});