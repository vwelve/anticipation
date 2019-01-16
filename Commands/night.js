const Discord = require("discord.js");
const important = require("../important.js");


module.exports.run = async (bot, message, args) => {
    // console.log("Important: "+important.getday());
    let cell = important.getjailed();
    let match_members = message.guild.roles.get("529053936120758303"); //UPDATED
    if(message.member.roles.some(r=>["Admin", "Host", "Owner"].includes(r.name))){
        message.channel.overwritePermissions(match_members, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false
        })
          .then(updated => console.log(updated.permissionOverwrites.get(match_members)))
          .catch(console.error)
        message.channel.send("🌃 Sunset");
        important.setday(false);
        if(cell !== " "){
            message.guild.channels.find(channel => channel.name === important.getjailed()).send(`${cell.username} you have been jailed`);
            message.guild.channels.find(channel => channel.name === important.getjailed()).send("Use '!?send [message]' to talk to the jailor");
            message.guild.channels.find(channel => channel.name === "jail").send(`You have successfully jailed the user`); 
        }else{
            message.guild.channels.find(channel => channel.name === "jail").send(`You forgot to jail someone :weary::ok_hand: `);
        }
        
       for(let i=0; i<26; i++ ){
            message.guild.channels.find(channel => channel.name === i).send("```-------------------------------- **NIGHT TIME** ---------------------------------```");
        }              
    }else{
        message.channel.send(`You are not the host of this game!`);
    }
}

module.exports.help = {
    name: "night"
}