<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires"  content="0">
<link rel="stylesheet" href="../static/college/zfb/css/common.css">
<link rel="stylesheet" href="../static/college/zfb/css/newPrintlist.css">
<script src="../static/college/zfb/js/jquery.min.js"></script>
<script src="../static/college/zfb/js/common.js"></script>
<script src="../static/college/zfb/js/iscroll-probe.js"></script>
<script type="text/javascript" src="../static/college/zfb/js/newPrintlist.js"></script>	
<title>待打印任务</title>
    <script>
        var wd = document.documentElement.clientWidth*window.devicePixelRatio/10;
        document.getElementsByTagName("html")[0].style.fontSize = wd + "px";
        var scale = 1/window.devicePixelRatio;
        var mstr = 'initial-scale='+ scale +', maximum-scale='+ scale +', minimum-scale='+ scale +', user-scalable=no';
    </script>
</head>
<body>
	<div id="json" style="display: none;">${data}</div>
    <div id="wrapper">
        <div class="content">
            <p class="pullDown">下拉刷新...</p>
            <div class="dataLine">
            	<div class="data"></div>
            	<div class="bottom-title"><span>打印任务只保留七天记得去扫码取件哦~</span></div>
            </div>
            <p class="pullUp">上拉加载...</p>
        </div>
    </div>
	<div class="bootom-button">
		<div class="button-left" style="margin-top: 25px;">添加新任务</div>
		<div class="button-right" style="margin-top: 25px;">扫码取件</div>
	</div>
	<div class="mask"></div>
	<div class="del-dv">
		<div class="dv-title"><span>提示</span></div>
		<div class="dv-text">当前任务还未打印确定要删除？</div>
		<div class="del-btn-dv">
			<div class="btn-left" onclick="delCancel()">取消</div>
			<div class="btn-right" onclick="delOk()">删除</div>
		</div>
	</div>
</body>
</html>