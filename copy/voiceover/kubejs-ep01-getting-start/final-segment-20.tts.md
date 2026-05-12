保存脚本以后，回到游戏里执行 `/kubejs reload server_scripts`。

这里要注意，重载只是让新脚本被重新读取，它本身不会触发事件。

所以执行完命令以后，你还需要真的吃下一颗苹果。只有这个动作发生了，ItemEvents.foodEaten 才会被触发。
