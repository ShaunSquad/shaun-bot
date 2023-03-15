# Shaun Bot

## What is Shaun Bot?

Shaun Bot is an ongoing personal team project to build a Discord bot meant for the tabletop RPG game, Dungeons and Dragons. Here's how to get started with development:

## Prerequisites

Before you can start developing with Shaun Bot, you'll need to make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v16.9.0 or higher)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (v1.22.19 or higher)
- [Git](https://git-scm.com/downloads)

## Installation

To get started with development, follow these steps:

**1. Clone the repository using Git:**

`git clone https://github.com/ShaunSquad/shaun-bot.git`

You may need to generate a personal access token through GitHub to clone via HTTPS.

**2. Navigate to the directory in your terminal:**

`cd shaun-bot`

**3. Install the required dependencies:**

`yarn install`

**4. Configure .env file:**

Copy the `.env.sample` file into a new file called `.env` and configure the variables as needed (aka hit Lucas up).

**5. Invite bot to test server:**

If you have nowhere to test out the bot, you may want to add the bot to a test server. To do so, follow this [invite link](https://discord.com/api/oauth2/authorize?client_id=1085371242481188934&permissions=412317239360&redirect_uri=https%3A%2F%2Fdiscordapp.com%2Foauth2%2Fauthorize%3F%26client_id%3D1085371242481188934%26scope%3Dbot&response_type=code&scope=identify%20messages.read%20guilds.members.read%20bot)

**6. Running the bot:**

After you are ready to run the bot to test your code, run the command `yarn start`

## Contributing

If you'd like to contribute to this repository, please [open a pull request](https://github.com/ShaunSquad/shaun-bot/pulls) with your changes.

## License

This repository is licensed under the [MIT License](https://opensource.org/license/mit/).
