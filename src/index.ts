import * as dotenv from "dotenv";
import rollD20 from "./commands/rollD20";
import rollD12 from "./commands/rollD12";
import rollD100 from "./commands/rollD100";
import rollD8 from "./commands/rollD8";
import rollD10 from "./commands/rollD10";
import rollD4 from "./commands/rollD4";
import rollD6 from "./commands/rollD6";
const { Client, GatewayIntentBits } = require("discord.js");

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

client.on("messageCreate", (message: any) => {
  const content = message.content.split(" ");
  if (content[0] === "!d20") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD20(message, rolls);
  } else if (content[0] === "!d20") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD12(message, rolls);
  } else if (content[0] === "!d100") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD100(message, rolls);
  } else if (content[0] === "!d8") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD8(message, rolls);
  } else if (content[0] === "!d10") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD10(message, rolls);
  } else if (content[0] === "!d4") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD4(message, rolls);
  } else if (content[0] === "!d6") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD6(message, rolls);
  } else if (content[0] === "!d12") {
    let rolls = 1;
    if (content.length > 1) {
      rolls = parseInt(content[1]);
    }
    rollD12(message, rolls);
  }
});

client.login(process.env.DISCORD_TOKEN);
