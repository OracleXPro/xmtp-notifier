import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";
import {fetchEventLiquidateQuery} from "./envio.js"


async function main() {
  // You'll want to replace this with a wallet from your application
  // NOTICE: fix it latter 
  const signer = Wallet.createRandom(); 
  console.log("sender address:", signer.address);

  // Create the client with your wallet. This will connect to the XMTP development network by default
  const xmtp = await Client.create(signer, { env: "dev" });

  const limit = 10;
  var offset = 0;  // TODO

  setInterval(async() => {
    const { errors, data } = await fetchEventLiquidateQuery(limit, offset); 
    if (errors) {
      console.error(errors);
      return;
    }
 
    const events = data["OracleXBet_Liquidate"];
    if(events == null || events.length == 0){
      console.log(`offset=${offset}, no events found`);
      return;
    }

    events.forEach(async (e) => {
      console.log("handle liquidate event: ", e);
      const user = e["user"];
      const conversation = await xmtp.conversations.newConversation(user);
      await conversation.send("liquidate");
    });

    offset += limit;
  }, 5000);
};


(async () => {
  await main();
})();
