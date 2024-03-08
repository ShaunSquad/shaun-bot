import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Spell } from "../../types/spellTypes";
import request from "graphql-request";

const spellQuery = `
  query Spell($index: String) {
    spell(index: $index) {
      name
      desc
      higher_level
      attack_type
      range
      duration
      level
      concentration
      dc {
        success
        desc
        type {
          full_name
        }
      }
    }
  }
`;

function getSpellIndex(userInput: string): string {
  const spellIndex = userInput.toLowerCase().replace(/\s+/g, '-');
  return spellIndex;
}

export const spellHandler = async (
  interaction: ChatInputCommandInteraction,
  spellName: string | null
) => {
  if (!spellName) {
    await interaction.reply(
      "Please provide a valid spell name, /spells for spells list"
    );
    return;
  }

  const spellIndex = getSpellIndex(spellName);

  try {
    const spellData: {spell: Spell} = await request(
      "https://www.dnd5eapi.co/graphql",
      spellQuery,
      { index: spellIndex }
    );
    if (Object.keys(spellData).length === 0) {
        await interaction.reply(
            "Please provide a valid spell name, /spells for spells list"
          );
          return;    
    }

    const embed = createSpellEmbed(spellData.spell);

    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Error fetching spell data:", error);
    await interaction.reply("Error fetching spell data. Please check your spelling.");
  }
};


function createSpellEmbed(spell: Spell): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle(spell.name)
      .setDescription(spell.desc?.[0] || "N/A")
      .addFields(
        { name: "Level", value: spell?.level?.toString()},
        { name: "Higher Level", value: spell?.higher_level?.[0] || "N/A"},
        { name: "Attack Type", value: spell?.attack_type || "N/A"},
        { name: "Range", value: spell?.range || "N/A" },
        { name: "Duration", value: spell?.duration || "N/A" },
        { name: "Concentration Required", value: spell?.concentration ? "Yes" : "No"},
        { name: "Saving Throw", value: spell?.dc?.type.full_name ?? "N/A", inline: true },
        { name: "Saving Throw Success Damage", value: spell?.dc?.success || "N/A", inline: true },
        { name: "Saving Throw Description", value: spell?.dc?.desc || "N/A", inline: true }
      )
      .setColor("#0099ff");
  }