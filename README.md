ICO LAUNCHPAD:

To setup the smart contracts environment:
1. Install nodejs from "https://nodejs.org/en/download/"
2. Navigate to the working directory "ICO_Launchpad" in the CLI
3. Run "npm i hardhat" : This installs the hardhat development package in the local working directory
4. Once this is completed, the dependencies for testing and deployment needs to be downloaded
5. Run "npm i --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai @openzeppelin/contracts @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-truffle5"
6. Once the dependencies are downloaded, the environment setup for the smart contracts is completed
7. The file "/test/sample-test.js" is the script which contains all the testcases for the smart contracts
8. For testing: Open one more CLI window and navigate to the working directory
9. Run "npx hardhat node": this will create a local instance of blockchain and will also setup 20 signers as mock accounts
10. In the previosuly opened CLI window, run "npx hardhat test --network localhost"
11. All the testcases will be checked and output will be captured in the CLI

For frontend:
1. Make sure nodejs is installed
2. Navigate to the frontend directory "/frontend/ico/"
3. To install the dependencies, run "npm install"
4. To start the frontend on localhost, run "npm start"
5. To build the frontend for production, run "npm run build"
6. A folder build is created "frontend/ico/build/", containing the production files 
