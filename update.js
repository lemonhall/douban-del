/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
 
(function(){
	var urlParams = {};
	var debug=2;
	(function () {
	    var match,
	        pl     = /\+/g,  // Regex for replacing addition symbol with a space
	        search = /([^&=]+)=?([^&]*)/g,
	        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	        query  = window.location.search.substring(1);

	    while (match = search.exec(query))
	       urlParams[decode(match[1])] = decode(match[2]);
	})();



	var ifpeople_url=location.href.slice(0,29)=="http://www.douban.com/people/";


	var a = function (c) {
        $.post_withck("/j/status/delete", {
            sid: c
        })
    };
    var b = function (c) {
        $.post_withck("/j/status/unreshare", {
            sid: c
        })
    };


    var doDelonCurrentPage=function(){
    	var time1 = 1000;
    	var time2 = 1000;
		$("a[data-reshare-id]").each(function () {
			var that=$(this);
	       	//b($(this).attr("data-reshare-id"));
	 		setTimeout(function(){
	 			console.log(that);
	        	that.hide();
			},time1);

			time1=time1+1000;

	    });
	    $("div[data-sid]").each(function () {
	    	var that=$(this);
	        //a($(this).attr("data-sid"));
	 		setTimeout(function(){
	 			console.log(that);
	        	that.hide();
			},time2);
			
			time2=time2+1000;
	    });
    }

	var DouDelTaskFinished = localStorage["DouDelTaskFinished"];
	var people = localStorage["DouDeldelPeople"];

	$(".info ul").append("<li><a id='delDou'>删除广播</a></li>");


	$("#delDou").on("click",function(){

			var my_self = $(".info ul a:first").attr("href");
				my_self = my_self + "statuses";

			var confirm_mylink = prompt("检测到你的广播的当前地址是：" + my_self + ";请比对地址，如果有误请在输入框中填入正确的地址，如果无误直接点击确定",my_self);
				console.log(confirm_mylink);

			if(confirm_mylink!=null){
					localStorage["DouDeldelPeople"] = confirm_mylink;
				var endPages = prompt("请输入需要删除的最后一个页面的数字，默认为2",2);
					localStorage["DouDeldelPages"] = endPages;
				if(endPages!=null){
					var confirm_str = "系统将要删除掉从1到"+localStorage["DouDeldelPages"]+"页面共"+(endPages-1)+"页面；删除操作不可恢复，请谨慎操作。。。";

					var answer = confirm(confirm_str);
					if(answer){
							doDelonCurrentPage();
							localStorage["DouDel"] = "1";
							localStorage["DouDelTaskFinished"] = "False";
							var page = parseInt(localStorage["DouDel"]);
									setTimeout(function(){
										localStorage["DouDel"]= (page+1) ;
										location.href=confirm_mylink+"?p="+(page+1);							
									},24000);
					}//END of confirm Task Stated??
				}//END of prompt endPages
			}//END of confirm_mylink
	});

	var endPages = parseInt(localStorage["DouDeldelPages"]);


	if(DouDelTaskFinished === "False"){
			var page = parseInt(localStorage["DouDel"]);
				if(page > endPages){
					localStorage["DouDel"] = "1";
					localStorage["DouDelTaskFinished"] = "True";
					alert("删除任务结束。。。。");
				}else{
					doDelonCurrentPage();
					setTimeout(function(){
						localStorage["DouDel"]= (page+1) ;
						location.href=people+"?p="+(page+1);							
					},24000);
		
				}
	}



} )();