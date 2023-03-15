import * as dotenv from "dotenv";
const { Client, GatewayIntentBits } = require('discord.js');

dotenv.config({ path: "./.env" });

const client = new Client({
	intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', (message: any) => {
  if (message.content === "!d20") {
      // Roll a d20 and send the result as a message
      const rollResult = Math.floor(Math.random() * 20) + 1;
      if (rollResult === 1) {
        message.reply('NAT 1!');
      } else if (rollResult === 20) {
        message.reply('NAT 20!');
      } else {
        message.reply(`You rolled a ${rollResult}`);
      }
    }
  }
);

client.login(process.env.DISCORD_TOKEN);
