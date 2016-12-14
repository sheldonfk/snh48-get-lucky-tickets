// ==UserScript==
// @name         SNH48 Lucky Ticket 1.0 (ticket page)
// @namespace    https://github.com/TangHHH/snh48-get-lucky-tickets
// @version      1.0
// @description  SNH48新官方商城捡漏脚本（票务页面刷票）
// @author       TangHHH
// @match        http://shop.48.cn/tickets/item/*
// @grant        none
// ==/UserScript==



(function() {
    'use strict';
    //设置可以购买的票种  2VIP 3普 4站，多票种','隔开，需加双引号
    var S_seattype = "2,3,4";
    //设置刷票间隔（单位：毫秒）过小会被封IP，100以上
    var looptime = 3000;

    /********************************************以下内容无须修改**********************************************/

    //购买数量
    var _num=1;

    var _seattype;
    if(S_seattype.match(',') != null)
        eval( '_seattype = new Array('+ S_seattype +')');
    else{
        _seattype=new Array(1);
        _seattype[0]=S_seattype;
    }

    var _id = location.pathname.split('/tickets/item/')[1];
    var _brand_id = $('body script').text().match(/brand_id:(\d+)/)[1];
    var lastTime = 0;

    $('#addcart').after('<div id="Tmessage">null</div>');
    var content = '&emsp;刷新时间：<span class="refreshTime" style="color:#E53333;">null</span>&emsp; 信息：<span class="message" style="color:#E53333;">null</span>&emsp; 错误代码：<span class="errorCode" style="color:#E53333;">0</span>' +
        '&emsp; 请求时间：<span class="callTime" style="color:#E53333;">null</span><br/>';

    $("#Tmessage").html(content);


    function dateToTime(date){
        return (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())+':'+ (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    }

    var date;
    var j=0;
    var sign = false;
    function loopTickets() {
        sign = false;
        $.ajax({
            url: "/tickets/saleList",
            type: "get",
            dataType: "json",
            data: {id:_id,brand_id:_brand_id},
            success: function (data) {
                if (data.length>0)
                {
                    $('.refreshTime').html(dateToTime(new Date()));
                    date = new Date().getTime();
                    $(data).each(function(i,n){
                        for(j=0;j<_seattype.length;j++)
                            if (n.seat_type ==_seattype[j] && n.amount>0 && date-lastTime>10200){
                                lastTime = date;
                                buyTicket(_id,_num,n.seat_type,_brand_id);
                                sign = true;
                            }
                    });

                }
                if(!sign)
                    setTimeout(function(){loopTickets();},looptime);
            },
            error: function (e) {
                $('.message').html("刷新失败，请检查网络");
            }
        });
    }


    function buyTicket(ticketId,num,seatType,brandId)
    {

        $.ajax({
            url: "/TOrder/add",
            type: "post",
            dataType: "json",
            data: { id: ticketId, num: num, seattype: seatType, brand_id: brandId, r: Math.random() },
            success: function (result) {
                if(result.Message != null)
                    result.Message = result.Message.replace(/<br\/>/g,' ');
                $('.callTime').html(dateToTime(new Date()));
                $('.message').html(result.Message);
                $('.errorCode').html(result.ErrorCode);
                if(result.HasError)
                    setTimeout(function(){loopTickets();},looptime);
                else
                    if(result.Message=="success"){
                        $('.errorCode').after('&emsp; 订单号：<span style="color:#E53333;">' + result.ReturnObject + '</span>');
                        window.location.href = result.ReturnObject;
                    }
                else
                    setTimeout(function(){checkTicket(ticketId,num,seatType,brandId);},2000);
            },
            error: function (e) {
                $('.callTime').html(dateToTime(new Date()));
                $('.message').html("您排队失败，请刷新重试");
                $('.errorCode').html("162001");
            }
        });
    }

    function checkTicket(ticketId,num,seatType,brandId){
        $.ajax({
            url: "/TOrder/tickCheck",
            type: "GET",
            dataType: "json",
            data: { id: ticketId,r: Math.random() },
            success: function (result) {
                if(result.Message != null)
                    result.Message = result.Message.replace(/<br\/>/g,' ');
                $('.callTime').html(dateToTime(new Date()));
                $('.message').html(result.Message);
                $('.errorCode').html(result.ErrorCode);
                if (result.HasError){
                    setTimeout(function(){loopTickets();},looptime);
                }
                else
                    switch(result.ErrorCode){
                        case "wait":
                            setTimeout(function(){checkTicket(ticketId,num,seatType,brandId);},5000);
                            break;
                        case "success":
                            $('.errorCode').after('&emsp; 订单号：<span style="color:#E53333;">' + result.ReturnObject + '</span>');
                            window.location.href = result.ReturnObject;
                            break;
                        case "fail":
                            setTimeout(function(){loopTickets();},looptime);
                            break;
                        default:
                            setTimeout(function(){loopTickets();},looptime);
                            break;
                    }

            },
            error: function (e) {
                $('.callTime').html(dateToTime(new Date()));
                $('.message').html("您排队失败，请刷新重试");
                $('.errorCode').html("162002");
            }
        });
    }

    setTimeout(function(){loopTickets();},looptime);

})();
