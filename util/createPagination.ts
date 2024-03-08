import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Pagination } from "pagination.djs";

export async function createPagination(interaction: ChatInputCommandInteraction, embeds: EmbedBuilder[]) {
    const pagination = new Pagination(interaction);

    pagination.setEmbeds(embeds);
    pagination.setColor("#0099ff");
    pagination.render();
};

  