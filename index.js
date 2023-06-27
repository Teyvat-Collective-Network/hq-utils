import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChannelType,
    Client,
    Colors,
    Events,
    ForumChannel,
    InteractionType,
    ThreadAutoArchiveDuration,
} from "discord.js";
import { config } from "dotenv";
import fetch from "node-fetch";

import { bar, characters, get_image } from "./data.js";

process.on("uncaughtException", console.error);

config();

const { API, TOKEN, ELECTION_FORUM, NOMINATING_TAG } = process.env;

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
        {
            type: ApplicationCommandType.ChatInput,
            name: "election",
            description: "start an election thread",
            defaultMemberPermissions: "0",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "wave",
                    description: "the wave/ID of the election",
                    required: true,
                    minValue: 1,
                },
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "seats",
                    description: "the number of seats",
                    required: true,
                    minValue: 1,
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "short-reason",
                    description: "the short reason (goes in forum post)",
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "long-reason",
                    description: "the long reason (goes in follow-up message)",
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.Number,
                    name: "nomination-window",
                    description: "the nomination window in days (default: 7)",
                    required: false,
                    minValue: 7,
                },
                {
                    type: ApplicationCommandOptionType.Number,
                    name: "voting-window",
                    description:
                        "the scheduled window for voting in days (default: 2)",
                    required: false,
                    minValue: 2,
                },
            ],
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
        } else if (interaction.commandName === "election") {
            const wave = interaction.options.getInteger("wave", true);
            const seats = interaction.options.getInteger("wave", true);

            const short_reason = interaction.options.getString(
                "short-reason",
                true
            );

            const long_reason = interaction.options.getString(
                "long-reason",
                true
            );

            const nom_window =
                interaction.options.getNumber("nomination-window", false) ?? 7;
            const vote_window =
                interaction.options.getNumber("voting-window", false) ?? 2;

            const forum = await client.channels.fetch(ELECTION_FORUM);

            if (forum.type !== ChannelType.GuildForum) {
                await interaction.reply({
                    embeds: [
                        {
                            title: "Error",
                            description:
                                "ELECTION_FORUM environment variable does not point to a forum channel!",
                            color: Colors.Red,
                        },
                    ],
                    ephemeral: true,
                });

                return;
            }

            await interaction.deferReply({ ephemeral: true });

            const now_ = new Date();
            const mid_ = new Date();
            const end_ = new Date();

            mid_.setDate(mid_.getDate() + nom_window);
            end_.setDate(end_.getDate() + nom_window + vote_window);

            const now = Math.floor(now_.getTime() / 1000);
            const mid = Math.floor(mid_.getTime() / 1000);
            const end = Math.floor(end_.getTime() / 1000);

            const channel = await forum.threads.create({
                name: `Wave ${wave} Election`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
                message: {
                    content: `## Election Information

**Wave**: ${wave}
**Reason**: ${short_reason}
**Seats**: ${seats}
**Window**: Nominations and statements scheduled for <t:${now}:F> - <t:${mid}:F>, voting scheduled for <t:${mid}:F> - <t:${end}:F>`,
                },
            });

            await channel.send(`<@&804177768837283900> <@&804186763424825376>

Another wave of elections is upon us! ${long_reason}

Please nominate people who you would like to be candidates for the upcoming election. Only one nomination is needed for someone to run for a position, so please avoid repeating nominations and feel free to add reactions to others' nominations if you agree with their choices.

Additionally, you are welcome to nominate yourself.

Nominations and statements will be open for one week (until <t:${mid}:F>). If you are nominated, please respond here indicating whether or not you are accepting, and if you accept the nomination, please post your statement here. There is no template or list of requirements, but you may want to include a basic introduction of yourself, campaign promises, defining qualities/traits, etc.

**Important:** To discuss anything related to the election that is not a nomination, statement, or nomination response, please use the pinned discussion post (<#1081829781139623976>).

Thanks!`);

            await channel.setAppliedTags([NOMINATING_TAG]);

            await interaction.editReply(`${channel}`);
        }
    }
});

await client.login(TOKEN);
