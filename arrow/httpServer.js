
// 引入相关的模块
var http = require("http");
var path = require("path");
var express = require("express");
var fs = require("fs"); // 文件系统



var formidable = require("formidable"); // 引入formidable模块
//var ejs = require("ejs");

var app = express();

// 设置模板引擎: 1)告诉express，我们的模板文件放在哪里;
app.set("views", path.resolve(__dirname, "views"));
//               2)告诉express，使用哪一种视图引擎来解析视图模板
app.set("view engine","ejs");

// 处理对静态资源的请求
var staticPath = path.resolve(__dirname, "public");  // 解决文件路径跨平台
app.use(express.static(staticPath));
// 创建服务器
http.createServer(app).listen(3000, function () {
    console.log("服务器正监听在3000端口...");
});