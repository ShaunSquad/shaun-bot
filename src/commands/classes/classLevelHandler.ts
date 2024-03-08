import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { request, gql } from "graphql-request";
import { Class, ClassLevel } from "../../types/classTypes";
import { createPagination } from "../../../util/createPagination";


const classQuery = gql`
  query Class($index: String) {
    class(index: $index) {
      name
      class_levels {
        level
        prof_bonus
        features {
          name
          desc
        }
      }
    }
  }
`;

export const classLevelHandler = async (
  interaction: ChatInputCommandInteraction,
  className?: string
) => {
  if (!className) {
    await interaction.reply("Please provide a valid class name.");
    return;
  }

  const classIndex = className.toLowerCase().replace(/\s+/g, '-');

  try {
    const classData: { class: Class } = await request(
      "https://www.dnd5eapi.co/graphql",
      classQuery,
      { index: classIndex }
    );
    const classLevels = classData.class.class_levels;
    console.log(classLevels);

    classLevels.sort((a: ClassLevel, b: ClassLevel) => {
        if (a.level > b.level) {
            return 1;
          }
      
          if (a.level < b.level) {
            return -1;
          }
      
          return 0;
    });

    const classLevelEmbeds: EmbedBuilder[] = [];

    for (let i = 0; i < classLevels.length; i++) {
        const embed = new EmbedBuilder()
            .setTitle(`${className.charAt(0).toUpperCase() + className.slice(1)} Level ${classLevels[i].level}`)
            .addFields({ name: "Proficiency Bonus", value: `+${classLevels[i].prof_bonus}`})
        
        if (classLevels[i].features) {
            embed.addFields( { name: classLevels[i].features?.[0]?.name ?? "N/A", value: classLevels[i].features?.[0]?.desc?.[0] ?? "N/A"})
        }
        
        classLevelEmbeds.push(embed);
    }

    if (className && classLevels.length === 0) {
        await interaction.reply("Invalid class name. Please try again.")
      } else {
        createPagination(interaction, classLevelEmbeds);
      }
  } catch (error) {
    console.error(error);
    await interaction.reply("Error fetching class data. Please check your spelling.");
  }
};