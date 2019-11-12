const { exec, execSync } = require("child_process");
const fs = require("fs");
const _ = require("lodash");
// const pics = fs.readdirSync("/Users/xiaosongxiao/MyWork/MyTest/wechatyTest/imagebox/girl").filter(item => /.jpeg/gi.test(item));
// const imgNum = _.random(0, pics.length - 1);
// console.log(imgNum);
const { clisConfig, chatBootConfig } = require("../config");
const { FileBox } = require("file-box");
const {
  cliPath,
  homePath,
  saveFileType,
  fileType,
  previewQrFileName,
  loginQrFileName,
  saveFilePath,
  wxappPath,
  imageBoxpath
} = clisConfig;
const previewQrPath = `${saveFilePath}/${previewQrFileName}/${previewQrFileName}.${fileType[saveFileType]}`;
const loginQrPath = `${saveFilePath}/${loginQrFileName}/${loginQrFileName}.${fileType[saveFileType]}`;

const previewQrExec = `${cliPath} -p ${homePath}${wxappPath} --preview-qr-output ${saveFileType}@${previewQrPath}`;
const loginQrExec = `${cliPath} -l --login-qr-output ${saveFileType}@${loginQrPath}`;

// 获取小程序预览版二维码功能
exports.sayWechatQr = (chartType, name, text, cb) => {
  console.log("");
  const rootObj = chatBootConfig.thinkSayList.sayWechatQr[chartType];
  const hasFRoot = rootObj.filter(item => item === name);
  console.log(chartType, name, "权限验证。。。。。。。。。");
  if (!hasFRoot.length) {
    return cb(["你没有权限哦"]);
  }
  exec(previewQrExec, (err, stdout, stderr) => {
    if (err) {
      console.log("获取预览版错误。。。。。。。。。");
      if (/需要重新登录/gi.test(stderr)) {
        console.log("登录需要。。。。。。。。。");
        exec(loginQrExec, (err, stdout, stderr) => {
          if (err) {
            console.log(err);
            console.log(stderr);
            return cb(err);
          }
          console.log("开始回话-登录二维码");
          const sayQrImage = FileBox.fromFile(loginQrPath);
          cb(null, [sayQrImage, "需要重新登录"]);
        });
        return;
      }
      cb(err);
      return;
    }

    const sayQrImage = FileBox.fromFile(previewQrPath);
    cb(null, [sayQrImage, "松子的机器人送你一个预览版二维码"]);
  });
};

// 开车功能
exports.sayDriver = (chartType, name, text, cb) => {
  const rootObj = chatBootConfig.thinkSayList.sayDriver[chartType];
  const hasFRoot = rootObj.filter(item => item === name);
  console.log(chartType, name, hasFRoot, rootObj.random);
  if (!hasFRoot.length) {
    return cb(null, ["你没有权限哦"]);
  }
  const pics = fs
    .readdirSync(`${imageBoxpath}/girl`)
    .filter(item => /.jpeg/gi.test(item));
  const imgNum = _.random(0, pics.length - 1);

  const sayQrImage = FileBox.fromFile(
    `${imageBoxpath}/girl/kaiche-${imgNum}.jpeg`
  );
  cb(null, [sayQrImage, "松子的机器人给你开车"]);
};
