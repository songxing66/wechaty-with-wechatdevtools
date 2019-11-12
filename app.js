const { Wechaty } = require("wechaty");
const thinkSay = require("./thinkSay");
const { FileBox } = require("file-box");
const wechatInst = new Wechaty();
wechatInst
    .on("scan", (url, code) => {
        if (!/201|200/.test(String(code))) {
            let loginUrl = url.replace(/\/qrcode\//, "/l/");
            require("qrcode-terminal").generate(loginUrl);
        }
        console.log(`${url}\n[${code}] Scan QR Code in above url to login: `);
    })
    .on("login", user => console.log(`User ${user.name()} logined`))
    .on("message", async message => {
        console.log("收到消息");
        thinkSay(message, async (err, sayObj) => {
            if (err) {
                console.log("我还不会", err);
                return;
            }
            const { sayType, name, say: sayList } = sayObj;
            const sayCon = await wechatInst[sayType].find(name);
            sayList.forEach(say => {
                sayCon.say(say);
            });
        });
    })
    .init();
