const Discord = require("discord.js");
const config = require ("./config.json");
const bot = new Discord.Client({disableEveryone: true});
const fs = require ("fs");
bot.commands = new Discord.Collection();

function loadCmds () {
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    
    if(jsfile.length <= 0){
        console.log("No commands were found. Add commands to the Command folder, and try again.");
        return;
    }

    console.log(`Loading Commands...`)
    console.log(`────────────────────────────────────────`)

    jsfile.forEach((f, i) => {
        
        let props = require(`./commands/${f}`);
        console.log(`Loading ${f}...`);
        bot.commands.set(props.help.name, props);
        exports.help

    })

    console.log(`────────────────────────────────────────`)

})}

loadCmds();


bot.on("message", async message => {
    let prefix = config.prefix;

    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    const command = args.shift().toLowerCase();

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

});

//Economy: Create Balance Moved to account-create.js

bot.on("ready", async () => {
    console.log('Economy Launched...')
    console.log(`────────────────────────────────────────`)
    console.log(`Town of Salem: ${bot.user.username} - Online!`)
    bot.user.setActivity("Prefix is '!?'", {type: "PLAYING"});
});


bot.login(config.token);