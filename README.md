# snh48-get-lucky-tickets
SNH48官方商城刷票捡漏脚本
## 使用方法
1. Chrome浏览器安装 [Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) 扩展；Firefox浏览器安装 [Greasemonkey](https://addons.mozilla.org/zh-cn/firefox/addon/greasemonkey/) 扩展
2. 点击 [这里](https://github.com/TangHHH/snh48-get-lucky-tickets/raw/master/SNH48%20Lucky%20Ticket%201.0%20(ticket%20page).user.js) 安装脚本，脚本需要刷票时打开，不需要时关闭
3. 打开扩展界面，修改脚本配置，```//设置可购买座位 var S_seattype = "2,3,4"; //设置刷票间隔 var looptime = 3000;```
    刷票间隔相当于手动刷新页面的间隔，如果刷到有票会自动发送购买请求，由于现在刷太快会封IP，故此值不能过小，单场下该值小到100以下会被封IP
4. 打开 [剧场门票](http://shop.48.cn/tickets) ，打开需要捡漏刷票的票务页面即可，如果成功会自动跳到门票详情页面

注：    
1. 如果需要在同一公网IP下同时刷多场门票，每场的最小刷票间隔需乘以刷票场次数（例如同时切3场，则looptime变量最小需设置为300），否则会封IP，脚本打开时在页面上票务图片的下方有输出，如出现“排队失败”、“刷新失败”信息，则可能是IP被封了        
2. 脚本默认匹配到所有票务页面```// @match http://shop.48.cn/tickets/item/*```，即对所有打开的票务页面都生效，如果不同场次需要不同的可购买座位种类，可通过修改匹配网址实现。例如场次id为600，可新建一个一样的脚本，将匹配更改为```// @match http://shop.48.cn/tickets/item/600*```，打开新的脚本并停用默认脚本    
3. 本脚本完全模拟手动刷票，目的是为了自动化手动刷票这一枯燥无聊的过程，按照以上使用方法正常使用完全不用担心账号出问题
## 更新日志
[2016.12.14] 1.0版本 

## LICENSE
MIT
