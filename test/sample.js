const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT" , function () {
    it("Should mint and transfer an NFT to someone", async function () {
        const SkeletonFamClub = await ethers.getContractFactory("SkeletonFamClub");
        const skeletonfamclub = await SkeletonFamClub.deploy();
        await skeletonfamclub.deployed();

        const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const metadataURI = 'cid/test.png';
        const metadataURI1 = 'cid/test1.png';

        let balance = await skeletonfamclub.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await skeletonfamclub.mint(recipient, 1, { value: ethers.utils.parseEther('0.04') });

        await newlyMintedToken.wait();
        balance = await skeletonfamclub.balanceOf(recipient);
        expect(balance).to.equal(1);

        const newlyMintedToken1 = await skeletonfamclub.mint(recipient, 1, { value: ethers.utils.parseEther('0.05') });

        await newlyMintedToken1.wait();
        balance = await skeletonfamclub.balanceOf(recipient);
        expect(balance).to.equal(2);

        const c = await skeletonfamclub.count();
        console.log(c);

        // expect(await skeletonfamclub.isContentOwned(0)).to.equal(true);
        // expect(await skeletonfamclub.isContentOwned(1)).to.equal(true);
        // expect(await skeletonfamclub.isContentOwned(2)).to.equal(false);
    });
});