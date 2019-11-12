const { exec, execSync } = require("child_process");
console.log(__dirname);
exec(
    "/Users/xiaosongxiao/Desktop/wechatwebdevtools.app/Contents/MacOS/cli -p /Users/xiaosongxiao/MyWork/joyTest/miniprogram-demo --preview-qr-output image@/Users/xiaosongxiao/MyWork/joyTest/b2.jpg",
    (err, stdout, stderr) => {
        if (err) {
            console.log(stderr);
            return console.log(Object.keys(err), "错误。。。。。。。。。。。。");
        }
        console.log(stdout, stderr);
    }
);
console.log("已完成");

// # 登录，在终端中打印登录二维码
// cli -l
// # 登录，在终端中打印登录 base64 形式的二维码
// cli -l --login-qr-output base64
// # 登录，二维码转成 base64 并存到文件 /Users/username/code.txt
// cli -l --login-qr-output base64@/Users/username/code.txt
// # 登录，并输出登录结果到文件 /Users/username/result.json
// cli -l --login-result-output /Users/username/result.json

// # 预览，在终端中打印登录二维码
// cli -p /Users/username/demo
// # 预览，二维码转成 base64 并存到文件 /Users/username/code.txt
// cli -p /Users/username/demo --preview-qr-output base64@/Users/username/code.txt
// # 预览，并将预览代码包大小等信息存入 /Users/username/info.json
// cli -p /Users/username/demo --preview-info-output /Users/username/info.json
// # 预览，指定自定义编译条件，pathName
// cli --compile-condition '{"pathName":"pages/index/index","query":"x=1&y=2"}'

// # 上传路径 /Users/username/demo 下的项目，指定版本号为 1.0.0，版本备注为 initial release
// cli -u 1.0.0@/Users/username/demo --upload-desc 'initial release'
// # 上传并将代码包大小等信息存入 /Users/username/info.json
// cli -u 1.0.0@/Users/username/demo --upload-desc 'initial release' --upload-info-output /Users/username/info.json
