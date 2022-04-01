module.exports.config = {
	name: "sendnoti",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "HĐGN",
	description: "Gửi tin nhắn đến tất cả các nhóm",
	commandCategory: "admin",
	usages: "[Text], [đính kèm ảnh hoặc video bằng cách reply]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sendSuccess": "💘Đã gửi tin nhắn đến %1 nhóm",
		"sendFail": "☞ Không thể gửi thông báo tới %1 nhóm"
	},
	"en": {
		"sendSuccess": "Sent message to %1 thread!",
		"sendFail": "[!] Can't send message to %1 thread"
	}
}

module.exports.run = async ({ api, event, args, getText }) => {
if (event.type == "message_reply") {
const request = global.nodemodule["request"];
const fs = require('fs')
const axios = require('axios')



       
        var path = __dirname + `/cache/snoti.png`;
        var path = __dirname + `/cache/snoti.mp4`;


var abc = event.messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;

  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));


	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage({body:"» 𝙁𝙧𝙤𝙢 𝙖𝙙𝙢𝙞𝙣 𝘽𝙤𝙩•𝙏𝙖𝙣ɞ «\n\n" + args.join(` `),attachment: fs.createReadStream(path) }, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID);

}
else {
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage("» 𝙁𝙧𝙤𝙢 𝙖𝙙𝙢𝙞𝙣 𝘽𝙤𝙩•𝙏𝙖𝙣ɞ «\n\n" + args.join(` `), idUsers, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSens.length), event.threadID, event.messageID) : "", event.messageID); }
}