import {
    ApplicationCommandType,
    Client,
    Events,
    InteractionType,
} from "discord.js";
import { config } from "dotenv";

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

            const data = await api("/guilds");
            console.log(data);

            await interaction.followUp({ content: "Done!", ephemeral: true });
        }
    }
});

await client.login(TOKEN);
