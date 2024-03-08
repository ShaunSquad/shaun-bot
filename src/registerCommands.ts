import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export const registerSlashCommands = async (
  client: Client,
) => {
  const commands = [
    new SlashCommandBuilder()
      .setName("roll")
      .setDescription(
        "Rolls a specified number of dice with a specified number of sides."
      )
      .addStringOption((option) =>
        option
          .setName("expression")
          .setDescription(
            "The expression representing the dice roll, e.g., d20 10."
          )
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("spells")
      .setDescription(
        "Displays a master list of DnD 5e spells and their levels."
      )
      .addStringOption((option) =>
        option
          .setName("class")
          .setDescription("Optional field filtering spells by class.")
          .setRequired(false)
      ),
      new SlashCommandBuilder()
      .setName('spell')
      .setDescription('Get details about a specific DnD 5e spell.')
      .addStringOption(option =>
        option
          .setName('name')
          .setDescription('The name of the spell. /spells for spell list.')
          .setRequired(true)
      ),
      new SlashCommandBuilder()
        .setName('level')
        .setDescription('Get level up details for a specific DnD 5e class.')
        .addStringOption(option =>
          option
          .setName('class')
          .setDescription("The name of the class.")
          .setRequired(true)
        ),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: "9" }).setToken(client.token as string);

  try {
    console.log("Started refreshing application (/) commands.");
      await rest.put(
        Routes.applicationGuildCommands(client.user?.id as string, "824467016986525707"),
        { body: commands }
      );

      console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
