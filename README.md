# snh48-get-lucky-tickets
SNH48官方商城刷票捡漏脚本，完全模拟手动刷票，将手动刷票过程自动化
## 使用方法
1. Chrome浏览器安装 [Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) 扩展；Firefox浏览器安装 [Greasemonkey](https://addons.mozilla.org/zh-cn/firefox/addon/greasemonkey/) 扩展
2. 点击 [这里](https://github.com/TangHHH/snh48-get-lucky-tickets/raw/master/SNH48%20Lucky%20Ticket%201.1%20(ticket%20page).user.js) 安装脚本
3. 打开 [剧场门票](https://shop.48.cn/tickets) ，打开需要刷票捡漏的票务页面，选择捡漏票种、设定好刷票间隔，点击“开始捡漏”即可开始刷票，在票务图片的下方会有输出，如果成功会自动跳到门票详情页面，开始后点击“停止捡漏”可停止刷票或修改参数重新开始。

注：刷票间隔相当于手动刷新页面的间隔，如果刷到有票会自动发送购买请求，由于现在刷太快会封IP，故此值不能过小，单场下该值小到100以下会被封IP（12月15日测试，单场设为130完全安全）。如果需要在同一公网IP下同时刷多场门票，每场的最小刷票间隔需乘以刷票场次数（例如同时切3场，则刷票间隔最小需设置为300），否则会封IP，脚本打开时在页面上票务图片的下方有输出，如出现“排队失败”、“刷新失败”信息，则可能是IP被封了        
## 更新日志
[2016.12.15] 1.1版本      
更新内容：优化IO，现在可以不用修改脚本内容，也不用关闭脚本了，直接在页面上输入相应参数点击“开始捡漏”即可，开始后点击“停止捡漏”可停止刷票并修改参数     
[2016.12.14] 1.0版本 

## LICENSE
MIT
