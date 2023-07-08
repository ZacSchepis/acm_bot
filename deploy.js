// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');
// const { PermissionFlagsBits } = require('discord-api-types/v10');

// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// 	new SlashCommandBuilder()
// 		.setName('tutor')
// 		.setDescription('Displays all CS tutors and their tutoring hours (if left blank)')
// 		.addStringOption(option =>
// 			option.setName('course')
// 			.setDescription('Allows you to search tutors by CS course')
// 			.setRequired(false))
// 		.addStringOption(option=>
// 			option.setName('name')
// 			.setDescription('Allows you to search for CS tutors by name')
// 			.setRequired(false)
// 			.addChoices(
// 				{name: "Sam Morrison",value: "Sam Morrison"},
// {name: "Hyun Se Seo",value: "Hyun Se Seo"},
// {name: "Calvin Condie",value: "Calvin Condie"},
// {name: "Andrija Sevaljevic",value: "Andrija Sevaljevic"},
// {name: "Kaylee Dalton",value: "Kaylee Dalton"},
// {name: "Scott Brown IF",value: "Scott Brown IF"},
// {name: "Ian Gonzalez",value: "Ian Gonzalez"},
// {name: "Natalia Castaneda",value: "Natalia Castaneda"},
// 			)),
// 	new SlashCommandBuilder()
// 		.setName('suggest')
// 		.setDescription('Lets you leave a suggestion for the server, or for the bot dev')
// 		.addStringOption(option=>
// 			option.setName('bot')
// 			.setDescription('This is the command to leave a suggestion about this bot')
// 			.setRequired(false))
// 		.addStringOption(option=>
// 			option.setName('server')
// 			.setDescription('You can suggest things for this server with this command')
// 			.setRequired(false)),
// 	new SlashCommandBuilder()
// 		.setName('help')
// 		.setDescription('Displays a message containing all of the commands and a brief summary of each')
// 		.addStringOption(option=>
// 			option.setName('command')
// 			.setDescription('Shows a detailed description of a selected command')
// 			.setRequired(false)
// 			.addChoices(
// 				{name: 'suggest', value: "Suggestions commands"},
// 				{name: "tutor", value: "Tutoring commands"},
// 			)),
// 	new SlashCommandBuilder()
// 		.setName('sendbotmessage').setDescription('Lets you send a message, excpet the bot sends it!')
// 		.addStringOption(option=>option.setName('mimicry').setDescription('Does as said, mimics what you say.').setRequired(true))
// 		.addBooleanOption(option=>option.setName("isembed").setDescription("Is this an embed?")).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
// 	new SlashCommandBuilder().setName('embedcreator').setDescription('Allows you to create an embed through the bot')
// 		.addStringOption(option=>option.setName('title').setDescription('Set the title for the embed').setRequired(true))
// 		.addStringOption(option=>option.setName('description').setDescription('Set the description for the embed').setRequired(true))
// 		.addStringOption(option=>option.setName('fieldonetitle').setDescription('Title for field one').setRequired(true))
// 		.addStringOption(option=>option.setName('fieldonedescription').setDescription('Set the description for field one').setRequired(true))
// 		.addAttachmentOption(option=>option.setName('attachment').setDescription('Attach something').setRequired(false))
// 		.addStringOption(option=>option.setName('fieldtwotitle').setDescription('Title for field two').setRequired(false))
// 		.addStringOption(option=>option.setName('fieldtwodescription').setDescription('Set the description for field two').setRequired(false))
// 		.addStringOption(option=>option.setName('fieldthreetitle').setDescription('Title for field three').setRequired(false))
// 		.addStringOption(option=>option.setName('fieldthreedescription').setDescription('Set the description for field three').setRequired(false))
// 		.addChannelOption(option=>option.setName('destination').setDescription('Select a channel to send this').setRequired(false))
// 		.addStringOption(option=>option.setName('colour').setDescription('Send hex code of colour of choice (ACM Blue default) (In #ffffff or 0xfffff format)').setRequired(false)),
// 	new SlashCommandBuilder().setName('bulkdelete').setDescription('Allows you to delete messages in bulk').addIntegerOption(option=>option.setName('number').setDescription('number of messages to delete').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
// 	new SlashCommandBuilder().setName('leetcode').setDescription("Add a leetcode problem for the upcoming club meeting (just post the link)").addStringOption(option=>option.setName("problem").setDescription("The leetcode problem itself.").setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
// 	new SlashCommandBuilder().setName('signupform').setDescription('Sends you a link to sign up for the club').addUserOption(option=>option.setName('target').setDescription("Mention a user to diret them to fill out a club membership form")),
// 	new SlashCommandBuilder().setName('eventform').setDescription('Sends you a link to sign into a club event').addUserOption(option=>option.setName('target').setDescription("Mention someone to direct them to fill out an event form."))
// 	,new SlashCommandBuilder().setName('uptime').setDescription('Displays how long ACM bot has been online for!')
// 	,new SlashCommandBuilder().setName('gradecalc').setDescription('Calculate your grade in a class').addAttachmentOption(option=>option.setName('gradesfile').setDescription('Text file to grab your grades from').setRequired(true))
// 	,new SlashCommandBuilder().setName('enablelogging').setDescription("Enables logging for this server.").addChannelOption(option=>option.setName("logchannel").setDescription('The logging channel to log to').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
// 	,new SlashCommandBuilder().setName('enablerolemenu').setDescription("Enables role menu creation for this server.").setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
// 	,new SlashCommandBuilder().setName('enablebasicwelcome').setDescription("Enables the bot to send a basic welcome message.").addChannelOption(option=>option.setName("welcomechannel").setDescription('The channel to send welcomes to').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
// 	,new SlashCommandBuilder().setName("randomxkcd").setDescription("Sends a random XKCD comic.")	
		
// ]
	/*.map(command => command.toJSON());
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
*/

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token, devServer} = require('./config.json');
const fs = require('node:fs');
const {join} = require('path');
const commands = [];
const specific = [];
const folderPath = join(__dirname, 'commands');
const commandFolders = fs.readdirSync(folderPath);
for (const folder of commandFolders){
	const commandsPath = join(folderPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
	for (const file of commandFiles){
		const filePath = join(commandsPath, file);
		const command = require(filePath);
		if('data' in command && 'execute' in command && command.specific !== true){
			commands.push(command.data)
			specific.push(command.data)
		}
		else if('specific' in command){
			specific.push(command.data)
		}
	}
}


const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

(async () => {
	try {
		console.log(`Started refreshing ${specific.length} application guild (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, devServer),
			{ body: specific },
		);

		console.log(`Successfully reloaded ${data.length} application guild (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();



// const rest = new REST({ version: '10' }).setToken(token);
// /*Deletes all commands: rest.put(Routes.applicationCommands(clientId), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);*/
// /*Deletes all Guild Commands
// 	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);*/
// 	(async () => {
// 		try {
// 			console.log(`Started refreshing ${commands.length} application (/) commands.`);
	
// 			// The put method is used to fully refresh all commands in the guild with the current set
// 			const data = await rest.put(
// 				Routes.applicationCommands(clientId),
// 				{ body: commands },
// 			);
	
// 			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
// 		} catch (error) {
// 			// And of course, make sure you catch and log any errors!
// 			console.error(error);
// 		}
// 	})();