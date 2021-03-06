//引入http模块
var http = require("http");
//1.引入依赖
//npm init
//npm install superagent cheerio --save
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');

//2.定义一个地址
const reptileUrl = "https://news.baidu.com/";

//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 8090;
//创建服务
var server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/plain');

    //3.发起请求
    superagent.get(reptileUrl).end(function (err, res) {
        // 抛错拦截
        if(err){
            console.log("报错");
        } else {
            console.log("成功");
            let $ = cheerio.load(res.text);
            let news = $("#pane-news .hotnews ul li");
            let data = [];
            let title = "";
            let href = "";
            news.each(function(i, elem){
                title = $(elem).find("strong a").html();
                href = $(elem).find("strong a").attr("href");
                data.push(title);
            });

            // 响应文件内容
            res.write(data.toString());
            // 写入数据, 文件不存在会自动创建
            // fs.writeFile(__dirname + '/article.json', JSON.stringify({
            //     status: 0,
            //     data: data
            // }), function (err) {
            //     if (err) throw err;
            //     console.log('写入完成');
            // });

        }
    });

    res.end("hello nodejs");

});
server.listen(port,hostName,function(){
    console.log("服务器运行中");
});





