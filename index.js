import {
    ApplicationCommandType,
    Client,
    Events,
    InteractionType,
} from "discord.js";
import { config } from "dotenv";
import fetch from "node-fetch";

import { bar, characters, get_image } from "./data.js";

process.on("uncaughtException", console.error);

config();

const { API, TOKEN } = process.env;

const api = async (route) => await (await fetch(`${API}${route}`)).json();

const client = new Client({ intents: 0 });

client.on(Events.ClientReady, async () => {
    await client.application.commands.set([
        {
            type: ApplicationCommandType.ChatInput,
            name: "partner-list",
            description: "generate the long-form partner list",
            defaultMemberPermissions: "0",
        },
    ]);

    console.log("Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
        if (interaction.commandName === "partner-list") {
            await interaction.reply({
                content: "Generating, please be patient...",
                ephemeral: true,
            });

            const guilds = await api("/guilds");
            guilds.sort((x, y) => x.name.localeCompare(y.name));

            while (guilds.length > 0) {
                await (
                    await client.channels.fetch(interaction.channelId)
                ).send({
                    embeds: await Promise.all(
                        guilds.splice(0, 10).map(async (guild) =>
                            ((owner, advisor) => ({
                                title: guild.name,
                                description: `${characters[
                                    guild.character
                                ].join(" ")}\n\n**Owner:** ${owner} (${
                                    owner.discriminator === "0"
                                        ? owner.username
                                        : owner.tag
                                })${
                                    advisor
                                        ? `\n**Advisor:** ${advisor} (${
                                              advisor.discriminator === "0"
                                                  ? advisor.username
                                                  : advisor.tag
                                          })`
                                        : ""
                                }`,
                                color: 0x2b2d31,
                                thumbnail: { url: get_image(guild.character) },
                                ...bar,
                                footer: { text: guild.id },
                            }))(
                                await client.users.fetch(guild.owner),
                                guild.advisor &&
                                    (await client.users.fetch(guild.advisor))
                            )
                        )
                    ),
                });
            }

            await interaction.followUp({ content: "Done!", ephemeral: true });
        }
    }
});

await client.login(TOKEN);
