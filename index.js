require('dotenv').config();

const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const TOKEN = process.env.DISCORD_TOKEN;
const NOTIFY_CHANNEL_ID = process.env.NOTIFY_CHANNEL_ID;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // ユーザーがVCに入ったときだけ処理する
    if (!oldState.channel && newState.channel) {
      const username = newState.member.user.username;
      const vc = newState.channel;
      const memberCount = vc.members.size;
  
      if (memberCount >= 2) {
        const notifyChannel = newState.guild.channels.cache.get(NOTIFY_CHANNEL_ID);
        if (notifyChannel) {
          notifyChannel.send(`${username} さんが「${vc.name}」に参加しました！`);
        } else {
          console.log('notifyChannel not found!');
        }
      } else {
        console.log(`${username} login(not notify)`);
      }
    }
  });

client.login(TOKEN);
