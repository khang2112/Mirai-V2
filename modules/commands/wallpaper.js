module.exports.config = {
  name: "wallpaper",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Yuri",
  description: "",
  commandCategory: "Random-image",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://www.api-adreno.tk/wallpaper').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  let count = res. data.count;
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/wallpaper.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/wallpaper.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/wallpaper.${ext}`)).on("close", callback);
      })
}