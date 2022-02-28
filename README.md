ICO launchpad:

Milestones: 2 weeks(27th Feb)
1. Advance: 14-02
2. Token and presale contract (airdrop, and other added functionality): 19-02
3. Frontend design: 21-02
4. Detailed documentation: 21-02
5. Frontend integration, deployment(backend server): 27-02

To setup the smart contracts environment:
1. install nodejs 
2. navigate to the working directory "ICO_Launchpad" in the CLI
3. run "npm i hardhat" : This installs the hardhat development package in the local working directory
4. Once this is completed, the dependencies for testing and deployment needs to be downloaded
5. Run "npm i --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai @openzeppelin/contracts @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-truffle5"
6. Once the dependencies are downloaded, the environment setup for the smart contracts is completed
7. The file "/test/sample-test.js" is the script which contains all the testcases for the smart contracts
8. To test:
9. Open one more CLI window and navigate to the working directory
10. Run "npx hardhat node": this will create a local instance of blockchain and will also setup 20 signers as mock accounts
11. In the previosuly opened CLI window, run "npx hardhat test --network localhost"
12. All the testcases will be checked and output will be captured in the CLI
