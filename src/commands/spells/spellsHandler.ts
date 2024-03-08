import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { request, gql } from "graphql-request";
import { createPagination } from "../../../util/createPagination";
import { Spell, SpellData } from "../../types/spellTypes";

const spellsQuery = gql`
  query Spells($limit: Int!, $class: StringFilter) {
    spells(limit: $limit, class: $class) {
      name
      level
    }
  }
`;

export const spellsHandler = async (
  interaction: ChatInputCommandInteraction,
  className?: string,
) => {
  const variables = {
    limit: 500,
    class: className?.toLowerCase(),
  };

  let spellData: SpellData;

  try {
    spellData = await request(
      "https://www.dnd5eapi.co/graphql",
      spellsQuery,
      variables
    );
  } catch (error) {
    console.error("Error fetching spell data:", error);
    // Handle the error and reply to the interaction if needed
    await interaction.reply("Error fetching spell data. Please try again later.");
    return;
  }

  spellData.spells.sort((a: Spell, b: any) => {
    if (a.level > b.level) {
      return 1;
    }

    if (a.level < b.level) {
      return -1;
    }

    return 0;
  });

  const spellsPerPage = 25;
  const spellEmbeds: EmbedBuilder[] = [];
  let title: string;

  if (className) {
    title = `${className.charAt(0).toUpperCase() + className.slice(1).toLowerCase()} Spells`;
  } else {
    title = "Spells";
  }

  for (let i = 0; i < spellData.spells.length; i += spellsPerPage) {
    const spellChunk = spellData.spells.slice(i, i + spellsPerPage);
    const embed = new EmbedBuilder()
      .setTitle(`${title} (Page ${Math.floor(i / spellsPerPage) + 1})`)
      .setDescription(spellChunk.map(spell => `**${spell.name}** (Level ${spell.level})`).join('\n'));

    spellEmbeds.push(embed);
  }

  if (className && spellData.spells.length === 0) {
    await interaction.reply("Invalid class name or class has no spells. Please try again.")
  } else {
    createPagination(interaction, spellEmbeds);
  }
};