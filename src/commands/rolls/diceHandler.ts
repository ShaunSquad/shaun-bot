import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

const rollDice = (times: number, sides: number): number[] => {
  const results: number[] = [];
  for (let i = 0; i < times; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }
  return results;
};

export const diceHandler = async (
  interaction: ChatInputCommandInteraction<CacheType>,
  expression: string | null
) => {
  if (!expression) {
    await interaction.reply(
      "Please provide a valid expression, e.g., /roll 10d20"
    );
    return;
  }

  const [times, dieType] = expression.split("d");

  if (!dieType || !times) {
    await interaction.reply(
      "Please provide a valid expression, e.g., /roll 10d20"
    );
    return;
  }

  const sides = parseInt(dieType);
  const rolls = parseInt(times);

  if (isNaN(sides) || isNaN(rolls)) {
    await interaction.reply(
      "Invalid expression. Please use the format /roll 10d20"
    );
    return;
  }

  const results = rollDice(rolls, sides);

  const embed = new EmbedBuilder()
    .setTitle(`Rolling ${rolls}d${sides}`)
    .setDescription(`Results: ${results.join(", ")}`)
    .setColor("#0099ff");

  await interaction.reply({ embeds: [embed] });
};
