<template>
  <div class="hello">
    <h1> Hello, welcome to our Demo!</h1>
    <h1> Author: Jian Gao, Risheng Lian</h1>
    <button  @click="getconnect">GET Connect to your Ale Wallet </button>
    <div style="color: #f00" v-show="isConnected">Connect Successfully! Your account address: {{ account }}</div>

    <div v-show="isConnected">
    <h1> Do you want to transfer tokens directly or transfer NFT?</h1>
    <button  @click="transferToken">Transfer Token </button>
    <button  @click="transferNFT">Transfer NFT </button>

    <!-- Here handles transaction of tokens -->
    <div v-show="selectToken">
     <h1 >Enter the address of another account</h1>
    
    <pre></pre>
    <input type="text" v-model="toaccount" size="50" placeholder="Enter the address of another account" />
   
    <pre></pre>
    <h1 >Enter the amount of tokens you want to send</h1>
    <input type="text" v-model="balanceOfamout" size="50" placeholder="Enter the amount of tokens you want to send" />
   

    <button  @click="approveMoneyToken(balanceOfamout)">Approve</button>
    <div style="color: #f00" v-show="isSet">You are going to send {{balanceOfamout}} tokens to {{toaccount}}</div>
    </div>

    <!-- Here handles transaction of NFT -->
    <div v-show="selectNFT">
    <input type="text" v-model="toaccount" size="50" placeholder="Enter the address of another account" />
		<ul>
			<li	v-for="v in list" :key="v.value"	@click="approveMoney(v.price, v.tokenId, v)">
				<img v-bind:src="v.src" alt="">
				<h4>{{v.des}}</h4>
        <h4>Owner: {{v.address}}</h4>
				<p>price:{{v.price}}</p>
			
			</li>
		</ul>
	</div>
</div>
 
  </div>
</template>

<script>

import services from "@/api";

export default {
  data() {
    return {
      NFTCreator: "0x834132E4e2Db04735100455648F74860889cbe89",
      account: "",
      toaccount:"",
      balanceOfamout:"",
      isConnected: false,
      isApproved : false,
      isSet: false,
      selectNFT : false,
      selectToken : false,
       list:[
              {
                  value:'0',
                  src:require('../assets/Syndra.png'),
                  des:'Syndra',
                  price:0,
                  address:"",
                  creator: "",
                  tokenId:0,
              },
              {
                  value:'1',
                  src:require('../assets/VN.png'),
                  des:'Vayne',
                  price:0,
                  address:"",
                  creator: "",
                  tokenId:1,
              },
              {
                  value:'2',
                  src:require('../assets/Jinx.png'),
                  des:'Jinx',
                  price:0,
                  address:"",
                  creator: "",
                  tokenId:2,
              },
              {
                  value:'3',
                  src:require('../assets/Ahri.png'),
                  des:'Ahri',
                  price:0,
                  address:"",
                  creator: "",
                  tokenId:2,
              },
              {
                  value:'4',
                  src:require('../assets/Illaoi.png'),
                  des:'Illaoi',
                  price:0,
                  address:"",
                  creator: "",
                  tokenId:2,
              }
          ]
    };
  },
  watch: {
    "$store.state.dapp": {
      handler(val) {
        this.NFTCreator = "0x834132E4e2Db04735100455648F74860889cbe89";
        this.account = val.account;
        this.isConnected = val.isConnected;
        this.isApproved = val.isApproved;
        this.selectToken = val.selectToken;
        this.selectNFT = val.selectNFT;
        this.isSet = val.isSet;
        // this.list = val.list[0];
        
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
   getGreeter() {
   console.log("getGreeter");
   services.getGreeting().then(res => {
        console.log('getGreeting');
        console.log(res);
      });
    },

   getconnect() {
    console.log("getconnect");
    console.log(window["aleereum"]);
      window["aleereum"] && window["aleereum"].connect();
      console.log(window["aleereum"].account);
      this.account=window["aleereum"].account;
      this.isConnected = true;
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i].address = this.account;
    }
    // console.log("creator", this.NFTCreator);
    // console.log("acc", typeof(this.account));
    // console.log("acc", this.account);
    },

    connect() {
    console.log("window");
    console.log(window["aleereum"]);
      window["aleereum"] && window["aleereum"].connect();
      
    },
    transferToken() {
    console.log("window");
    this.isSet = false;
    this.selectToken = true;
    this.selectNFT = false;
    console.log(this.selectToken)
    },
    transferNFT() {
    console.log("window");
    this.selectNFT = true;
    this.selectToken = false;
    this.isSet = false;
    this.toaccount = "";
    this.balanceOfamout = "";
    },
    getbalanceOf() {
    console.log('getbalanceOf',this.account);
    services.getbalanceOf(this.account).then(res => {
        console.log('getbalanceOf');
        console.log(res);
      });
    },
    approveMoneyToken(price) {
      this.isSet = true;
      console.log(this.account);
     console.log(this.toaccount);

    services.getbalanceOf(this.account).then(res => {
        console.log('getbalanceOf');
        console.log(res);
      });
      if (this.toaccount == '') {
        alert("Please enter another address!")
      }
      else {
        services.approvemoney(this.account,price,this.toaccount).then((res) => {
          console.log(res);
        });
      }
    },

    approveMoneyCreator(price) {

      services.getbalanceOf(this.account).then(res => {
          console.log('getbalanceOf');
          console.log(res);
        });
        services.approvemoney(this.account,price,this.NFTCreator).then((res) => {
          console.log(res);
        });
    },
    
    async approveMoney(price,tokenId, v) {
      
      console.log('approveMoney',this.account);

      services.getName().then(res => {
        console.log('getName');
        console.log(res);
      });
      // services.getCreator(this.account).then((res) => {
      //   console.log('creator', res);
      // //   services.approve(this.account,0.001,res,tokenId).then((res) => {
      // //   console.log(res);
      // // });
      // });
      if (this.toaccount == '') {
        alert("Please enter another address!")
      }
      else {
       
       
       
        let confirm;
        if (this.account == v.address) { 
          
          alert("Your are the owner of this NFT! You are giving it to another user!");  

          await services.approve(this.account,price,this.toaccount,tokenId).then((res) => {

            console.log(res);
            confirm = res.success;
          });

          console.log(confirm);
          if (confirm) {
            v.address = this.toaccount;
            v.price = 1;
          }
        }
        else {
          alert("Your are not the owner of this NFT! But you can pay tokens to buy this NFT");  
            await services.approve(this.account,price,this.toaccount,tokenId).then((res) => {
            console.log(res);
            confirm = res.success;
          });
          console.log(confirm);
          if (confirm) {
            v.address = this.account;
            v.price = 0;
          }
        }
        if (confirm) {
          alert("To give a reward to the creator of these NFT, we recommend you send rewards to the creator!");
          await services.approve(this.account,0.05 * price,this.NFTCreator,tokenId).then((res) => {
            console.log(res);
            console.log("creator", this.NFTCreator);
          });
        }

        
      }

    },
   
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#box ul{
		display: flex;
		flex-wrap: wrap;
        position: absolute;
        top: 220px;
	}
#box li{
		padding: 3px;
		list-style: none;
		margin-right: 15px;
		border: 1px solid #eee;
}
#box img{
		width: 200px;
		height: 150px;
}
</style>
