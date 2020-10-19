const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
const fs = require("fs");
const db = require("./database.json");
const { timeout } = require("./config.json");
const ms = parseInt(timeout) * 1000;

client.on("ready", () => {
    console.log("I am online and logged into " + client.user.tag);
    console.log("Serving in " + client.guilds.cache.size + " servers");
    console.log("Serving " + client.users.cache.size + " users");
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    switch (command) {
        case "help":
            message.channel.send("Commands:\n\n`!help` - this command\n\n`!dmall members <text>` - send a dm to all the members in the current server\n\n`!dmall everyone <text>` - send a dm to all the users in your bot (all users in all servers the bot is in)");
            break;
        case "dmall":
            switch (message.content.split(/ +/g)[1]) {
                case "members":
                    const memberArgs = args.join(" ").slice(8);
                    if (!memberArgs || !message.member.hasPermission("ADMINISTRATOR")) return;
                    message.guild.members.cache.filter(m => m.id !== client.user.id).forEach(member => {
                        if (db[user.id] && db[user.id].message == memberArgs) return;
                        setTimeout(() => { member.send(memberArgs).then(() => message.channel.send("Sending a mass dm to all members: " + memberArgs)) }, ms);
                        db[user.id] = {
                            message: userArgs
                        }
                        fs.writeFile("./database.json", JSON.stringify(db), (err) => {});
                    });
                    break;
                case "everyone":
                    const userArgs = args.join(" ").slice(9);
                    if (!userArgs || !message.member.hasPermission("ADMINISTRATOR")) return;
                    client.users.cache.filter(u => u.id !== client.user.id).forEach(user => {
                        if (db[user.id] && db[user.id].message == userArgs) return;
                        setTimeout(() => { user.send(userArgs).then(() => message.channel.send("Sending a mass dm to all users: " + userArgs)) }, ms);
                        db[user.id] = {
                            message: userArgs
                        }
                        fs.writeFile("./database.json", JSON.stringify(db), (err) => {});
                    });
                    break;
                default: message.channel.send("Choose either `members` or `everyone`")
            }
    }
});

client.login("token")
