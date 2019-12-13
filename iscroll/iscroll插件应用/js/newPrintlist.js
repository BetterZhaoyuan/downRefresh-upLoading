var flag = 0;
$(function(){
	var myScroll;
    myScroll = new IScroll('#wrapper', {
        probeType: 2,
        fadeScrollbars: false,
    });

    var pullDown = 1;     // 下拉刷新避免多次执行
    var pullUp = 1;       // 上拉加载避免多次执行
    var downHeight = $(".pullDown").height();
    var upHeight = $(".pullUp").height();
    //获取数据
    var jsons = $('#json').text();
    var obj=eval('('+jsons+')');
    if(obj.ErrCode != 0){
    	alert(obj.ErrMsg);
    	return false;
    }
    var jsonobj=obj.data;
    flag = jsonobj.taskArray.length;
    // 计数器计算页数----初始展示一页
	var counter = 1;
    // 每页加载展示10个
    var num = 1;
	for(var i = 0;i < num;i++) {
		show(i);
	}
	function show(i) {
		var item = jsonobj.taskArray[i];
	    var color = item.color;
	    var colorStr = '';
	    var pageSize= '';
	    if(color == 0){//0 彩色，1黑白，2照片，3证件照，4身份证
	        colorStr = '彩色';
	    }else if(color == 1){
	        colorStr = '黑白';
	    }else if(color == 2){
	        colorStr = '照片';
	    }else if(color == 3){
	        colorStr = '证件照';
	    }else if(color == 4){
	        colorStr = '身份证';
	    }
	    if(item.size == '5R'){
	    	pageSize = '六寸';
	    }else{
	        pageSize = item.size;
	    }
	    var file_name = item.fileName;
	    var lastIndex = file_name.lastIndexOf('，')+1;
	    if(lastIndex == file_name.length){
	        file_name = file_name.substring(0, file_name.length-1)
	    }
	    //单面0 双面1
	    var format = item.format;
	    var formatStr = '';
	    if(format == '0'){
	        formatStr = '单面';
	    }else if(format == '1'){
	        formatStr = '双面';
	    }
	    var result = ''; 	
		result+= '<div class="con_list_dv" id="signdel_'+i+'">'
		result+= '	<div class="item_title_dv" >';
		result+= '		<div>'+getCutStr(file_name)+'</div>';
		result+= '	</div>';
		result+= '  <input type="hidden" id="taskId'+i+'" value="'+item.taskId+'">';
		result+= '	<div class="item_content_dv">';
		result+= '		<div class="item_params_dv">';
		result+= '			<div class="item_type_dv">类型：<span>'+pageSize+''+colorStr+'</span></div>';
		result+= '			<div class="item_format_dv">规格：<span>'+formatStr+'</span></div>';
		result+= '			<div class="item_del_dv" onclick="del_task('+i+')"><img src="../static/college/zfb/images/printlist-del.png"></div>';
		result+= '		</div>';
		result+= '		<div class="item_params_dv">';
		result+= '			<div class="item_time_dv"><span>'+item.createTime+'</span></div>';
		result+= '		</div>';
		result+= '	</div>'; 
		result+= '</div>';
	    $('.data').append(result);
	    $('.bottom-title').show();
	}
	
    myScroll.on('scroll', function(){
        var y = myScroll.y;
        // 下拉刷新
        if(y >= downHeight && pullDown){
            $(".pullDown").addClass("refresh").html("松开刷新...");
            myScroll.minScrollY = downHeight;
            pullDown = 0;
        }    
        if(y <= downHeight && y >= 0 && !pullDown){
            $(".pullDown").removeClass("refresh").html("下拉刷新...");
            pullDown = 1;
            myScroll.minScrollY = 0;
        }

        // 上拉加载
        var maxHeight = myScroll.maxScrollY;
        if(y < (maxHeight - upHeight) && pullUp){
            $(".pullUp").addClass("loading").html("松开加载...");
            myScroll.maxScrollY = maxHeight - upHeight;
            pullUp = 0;
        }
        if(y > maxHeight && y < (maxHeight + upHeight) && !pullUp){
            $(".pullUp").removeClass("loading").html("上拉加载...");
            myScroll.maxScrollY = maxHeight + upHeight;
            pullUp = 1;
        }
    });

    myScroll.on('scrollEnd', function(){
        if($(".pullDown").hasClass("refresh")){
            $(".pullDown").text("正在刷新...");
            //刷新加载动画
            //common.loadingShow();
            setTimeout(function(){
                location.reload();
            }, 1000);
        }
        if($(".pullUp").hasClass("loading")){
            $(".pullUp").text("正在加载...");
            setTimeout(function(){
            	counter++;
            	var pageStart = 0,pageEnd = 0;
                pageEnd = num * counter; // 结束位置计算 = 当前触发每页显示数量 * 当前刷新数量（加载数据量）
                pageStart = pageEnd - num;
            	for(var i = pageStart;i < pageEnd;i++) {
            		if(i < flag){
            			show(i);
            		}else{
            			break;
            		}
            	}
                myScroll.refresh();
            }, 1000);
        }
    });
    myScroll.on('refresh', function(){
        $(".pullUp").removeClass("loading").html("上拉加载...");
        pullUp = 1;
    });
})
var label = 0; //记录要删除打印任务的下标
// 删除任务
function del_task(num){
		$('.mask').show();
		$('.del-dv').show();
		label = num;
}


function getCutStr(str) {
	var strs = str.substring(0, str.lastIndexOf('.'));
	if (strs.length > 30) {
		strs = strs.substring(0, 30) + '...';
	}
	var fomat = str.substring(str.lastIndexOf('.'), str.length);
	return strs + fomat;
}

$(function(){
	/**
	 * 添加新任务界面
	 */
	$('.button-left').click(function(){
		history.go(-1); //后退
	})
	
	/**
	 * 扫码取件
	 */
	$('.button-right').click(function(){
		// H5向小程序发送消息
		my.postMessage({'sendToMiniProgram': '0'});
	})
})
/**
 * 删除弹出框取消事件
 */
function delCancel(){
	$('.mask').hide();
	$('.del-dv').hide();
}
/**
 * 删除
 */

function delOk(){
	$.ajax({
	    type : "POST",
	    url  : "../colgPrintList/delTaskItem?taskId="+$('#taskId'+label).val(),
	    cache : false,
	    dataType:'json',
	    success : function(data,status){
	        if(data.ErrCode == 0){
	        	$('.mask').hide();
	        	$('.del-dv').hide();
	        	alert("删除成功");
	        	$('#signdel_'+label).remove();
	        	flag = flag -1;
	        	if(flag == 0){
	        		var html = '<div style="font-size:14px;text-align:center;position: absolute;top:25%;width:100%;height:40px;">暂无打印任务</div>';
	            	$('body').append(html);
	            	$('.bottom-title').hide();
	        	}
	        }else{
	        	alert("删除错误请重试！");
	        }
	    },
	    error : function(){
	    	alert("系统异常请重试！");
	    }
	});
}
function getCutStr(str) {
	var strs = str.substring(0, str.lastIndexOf('.'));
	if (strs.length > 30) {
		strs = strs.substring(0, 30) + '...';
	}
	var fomat = str.substring(str.lastIndexOf('.'), str.length);
	return strs + fomat;
}