# Discord Bot Ticket System
This is a simple ticket system for discord bots. It is a very simple system that allows users to create tickets and admins to delete them. It is very easy to use and setup.

## Requirements
- [Node.js](https://nodejs.org/en/) I recommend using the 18.0.0 version or higher.

## Installation
1. Download the latest release from [here](https://devloli-main.github.io/discord-bot-ticket-system/)
2. Extract the zip file
3. Open the folder
4. Open the config.js file
5. Edit the config.js file
```js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    // client
    token: 'YOUR_BOT_TOKEN',
    clientId: 'YOUR_BOT_CLIENT_ID',
    guildId: 'YOUR_GUILD_ID',

    // webhook
    webhooks: {
        error: {
            id: 'WEBHOOK_ID',
            token: 'WEBHOOK_TOKEN'
        } // This webhook is used to send error messages.
    }
}
```
6. Open the terminal in the folder
7. Run `npm install` or `npm i`
8. Run `node index.js` or `node .`

## Notes
- Now the bot is running on just one server. If you want to run it on multiple servers, you need to change the code. You can find the code in the `deploy-commands.js` file.
```js
// One server
await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commands },
);

// Multiple servers
await rest.put(
    Routes.applicationCommands(clientId),
    { body: commands },
);
```

## Setup your Ticket System
1. Create a new channel for the ticket system
2. Create a new role for the support team
3. Create a new category for creating tickets channels
4. Create a new category for closed tickets channels

## Features
- [x] Slash Commands
- [x] Auto Deploy
- [x] Create a ticket
- [x] Close a ticket ( 2 ways )
- [x] Delete a ticket
- [x] Reopen a ticket
- [x] Transcript a ticket

## Commands
- `/setup-ticket` - Setup the ticket system
- `/ping` - Check the bot's ping

## Support
If you need help, you can join our [Discord Server](https://discord.gg/F6b8H4PknT)

## License
This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details