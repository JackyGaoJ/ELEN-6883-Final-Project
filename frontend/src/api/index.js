import contract from '../contract';
import store from '../store'
import Mcp from "../mcp";
const NFTtoken = require("../NFTtoken.json");
const Myerc20 = require("../Myerc20.json");
import Big from 'bignumber.js'
const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://13.212.177.203:8765");
export default {
    async getName() {
        return await contract.Instance.methods.name().call();
    },
    async getSymbol() {
        return await contract.Instance.methods.symbol().call();
    },
    
    async mint() {
				console.log("mint()");
        return await contract.Instance.methods.mint().call();
    },
     async getbalanceOf(coreAddress) {
				const  response=await contract.Instance.methods.name().call();
				console.log('getbalanceOf(response)',response);
				const response1= await contract.Instance.methods.balanceOf(coreAddress).call(coreAddress);
        console.log('getbalanceOf(response)',response1);
        return response;
    },
   

    async approvemoney(coreAddress,limit,toaccount) {
        const approveAmount = new Big(limit).times('1e18').toString();
        console.log('coreAddress',coreAddress);
        console.log('toaccount',toaccount);
        const mycontract = new McpFunc.Contract(
        Myerc20.abi,
        toaccount
        );
       mycontract.deploy({
					data: Myerc20.bytecode,
					arguments: []
					});
      
        
    
        const response = await mycontract.methods.transfer(coreAddress, approveAmount).sendToBlock({
            from: store.state.dapp.account,
            amount: new Big(approveAmount).toString(),                  
        });
        if (response.success) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    },
    async getCreator(account) {
       
        const mycontract = new McpFunc.Contract(
            NFTtoken.abi,
            account
            );
        mycontract.deploy({
            data: NFTtoken.bytecode,
            arguments: []
            });
        
        const response = mycontract.originalAddress.toString();
        // console.log("%s", mycontract.originalAddress);
        return response;
    },
    async approve(coreAddress,limit,toaccount,tokenId) {
        const approveAmount = new Big(limit).times('1e18').toString();
        console.log('approveAmount',approveAmount);
        console.log('coreAddress',coreAddress);
        console.log('toaccount',toaccount);
        const mycontract = new McpFunc.Contract(
        NFTtoken.abi,
        toaccount
        );
         mycontract.deploy({
					data: NFTtoken.bytecode,
					arguments: []
					});
     
        await mycontract.methods.mint().call();
        const response = await mycontract.methods.transfer(coreAddress, tokenId).sendToBlock({
            from: store.state.dapp.account,
            amount: new Big(approveAmount).toString(),                  
        });
        if (response.success) {
            console.log('transaction success: ', response);
        } else {
            console.log('transaction failed: ', response);
        }

        return response;
    }
}