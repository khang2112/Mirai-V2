module.exports.config = {
  name: "top",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HungCho", //modded
  description: "Bảng xếp hạng",
  commandCategory: "general",
  usages: "[user/money]",
  cooldowns: 1
};

module.exports.run = async ({ api, event, args, Currencies }) => {
  // Covernt exp to level
  function expToLevel(point) {
    if (point < 0) return 0;
    return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
  }
  if (args.length == 0) api.sendMessage("Thiếu input", event.threadID, event.messageID)
  //level
  if (args[0] == "user") {
    let all = await Currencies.getAll(['userID', 'exp']);
    all.sort((a, b) => b.exp - a.exp);
    let num = 0;
    let msg = 'Top 15 người dùng có level cao nhất sever !';
    for (var i = 0; i < 15; i++) {
      let data = await api.getUserInfo(all[i].userID);

      let level = expToLevel(all[i].exp);
      let name = await data[all[i].userID].name;

      num += 1;
      msg += '\n' + num + '. ' + name + ' - cấp ' + level;
    }
    api.sendMessage(msg, event.threadID, event.messageID)
  }

  if (args[0] == "money") {
    let all = await Currencies.getAll(['userID', 'money']);
    all.sort((a, b) => b.money - a.money);
    let num = 0;
    let msg = '» Top 5 người dùng giàu nhất sever !';
    for (var i = 0; i < 5; i++) {
      let data = await api.getUserInfo(all[i].userID);

      let level = all[i].money;
      let name = await data[all[i].userID].name;

      num += 1;
      msg += '\n' + num + '. ' + name + ': ' + level + " đô";
    }
    api.sendMessage(msg, event.threadID, event.messageID);
  }
  }