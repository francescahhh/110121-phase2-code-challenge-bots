import React, {useEffect, useState} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

const API="http://localhost:8002/bots";

function BotsPage() {

const [bots, setBots] = useState([]);


 useEffect(() => {
   fetch(API).then(result => result.json())
   .then((json) => setBots(json));
 }, []);

 function enlistBot(bot, isEnlisted=true) {
   setBots(bots.map((aBot) => (aBot.id === bot.id ? {...aBot, enlisted: isEnlisted} : aBot)));
 }

 function releaseBot(bot) {
   enlistBot(bot, false);
 }

 function dischargeBot(bot) {
   setBots(bots.filter(aBot => aBot.id !==bot.id));
 }

  return (
    <div>
      <YourBotArmy bots={bots.filter(aBot => aBot.enlisted)} releaseBot={releaseBot} dischargeBot={dischargeBot}/>
      <BotCollection bots={bots} enlistBot={enlistBot} dischargeBot={dischargeBot}/>
    </div>
  )
}

export default BotsPage;
