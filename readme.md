### 使用`heroku`部署服务
> * [`Node.js`教程](https://www.heroku.com/nodejs)

`heroku`可以帮我们很简单的免费部署一个线上`server`，下面是笔者在实践过程中遇到的坑以及整理的笔记。

* 注册[`heroku`](https://www.heroku.com/home) 账号
* 安装`heroku`: `brew install heroku/brew/heroku`
* 命令行输入：`heroku login -i`, 输入账号和密码
  * [`heroku login`命令执行时提示`IP`地址不匹配](https://stackoverflow.com/questions/63363085/ip-address-mismatch-on-signing-into-heroku-cli)
* 在`package.json`的`script`中添加`start`命令来启动项目
    ```json
    {
      "scripts": {
        "start": "node server.js"
      }
    }
    ```
* 项目根目录下执行`heroku create`
* 修改端口监听
    ```js
    // 发布到heroku 才会有 process.env.PORT 环境变量，本地开发使用3000端口
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
    ```
* `git push heroku master`: 推送本地仓库的代码到`heroku`远程服务器
* 成功后会有如下提示，可以使用`curl`命令进行请求测试：
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201019170438.png)
