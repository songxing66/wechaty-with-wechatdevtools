const os = require("os");
const homePath = os.homedir();
const path = require("path");
module.exports = {
  homePath, //userhome地址
  loginQrFileName: "toolLogin", //登录二维码名称
  previewQrFileName: "toolpreview", //预览版二维码名称
  cliPath: `${homePath}/Desktop/wechatwebdevtools.app/Contents/MacOS/cli`, //小程序开发工具cli地址
  saveFileType: "image", //保存二维码的文件类型
  fileType: {
    base64: "txt", //base64保存成的文件类型
    image: "png" //image类型文件的后缀
  },
  wxappPath: "/MyWork/joyshebao/MY_GIT_WORK/testapp", //微信小程序项目的目录
  imageBoxpath: `${homePath}/MyTest/wechatyTest/imagebox`, //图片存储位置
  saveFilePath: path.join(__dirname, "../", "qrFile") //文件保存的地址
};
