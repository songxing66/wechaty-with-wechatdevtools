const sayFunc = require("./sayFunc");
const path = require("path");
const notifier = require("node-notifier");
module.exports = async (msgObj, cb) => {
    console.log("消息处理--------");
    const room = msgObj.room();
    const content = msgObj.text();
    let resObj = {
        sayType: "Contact",
        name: { name: msgObj.from().name() }
    };
    notifier.notify({
        title: room ? `${await room.topic()}-${msgObj.from().name()}` : msgObj.from().name(),
        message: content,
        icon: path.join(__dirname, "../", "timg.png")
    });
    if (room) {
        const topic = await room.topic();
        const isMentionSelf = await msgObj.mentionSelf();
        resObj = { ...resObj, sayType: "Room", name: { topic } };
        if (isMentionSelf) {
            let funcName = ravText(content);
            if (funcName === "dontkown") {
                return cb("err");
            }
            sayFunc[funcName]("room", topic, content, (err, sayList) => {
                console.log("处理时间回调了。。。。。。。。");
                console.log(err, "errerrerrerrerr");
                resObj.say = err ? ["出现错误了！！"] : sayList;
                cb(null, resObj);
            });
        } else {
            cb("跟我没关系");
        }
    } else {
        cb("err");
    }
};

function ravText(content) {
    if (/预览版二维码/gi.test(content)) {
        return "sayWechatQr";
    }
    if (/开车/gi.test(content)) {
        return "sayDriver";
    }
    return "dontkown";
}
