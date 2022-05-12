import Mcp from "./mcp";

const Myerc20 = require("./NFTtoken.json");

const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://13.212.177.203:8765");

const tokenAddress = "";
const Instance = new McpFunc.Contract(
    Myerc20.abi,
    tokenAddress
);
Instance.deploy({
  data: '',
  arguments: []
});
const Contract = {
    tokenAddress,
    Instance,
};

export default Contract;
