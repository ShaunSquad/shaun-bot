import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { registerSlashCommands } from "./registerCommands";
import { diceHandler } from "./commands/rolls/diceHandler";
import { spellsHandler } from "./commands/spells/spellsHandler";
import { spellHandler } from "./commands/spells/spellHandler";
import { classLevelHandler } from "./commands/classes/classLevelHandler";

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
  registerSlashCommands(client);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === "roll") {
    const expression = interaction.options.getString("expression");
    diceHandler(interaction, expression);
  }

  if (interaction.commandName === "spells") {
    const className = interaction.options.getString("class") ?? undefined;
    spellsHandler(interaction, className);
  }

  if (interaction.commandName === "spell") {
    const spellName = interaction.options.getString("name");
    spellHandler(interaction, spellName)
  }

  if (interaction.commandName === "level") {
    const className = interaction.options.getString("class") ?? undefined;
    classLevelHandler(interaction, className);  
  }
});

client.login(process.env.DISCORD_TOKEN);
