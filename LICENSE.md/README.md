# AngularJS-excel-
解决AngularJS&lt;input type="file" ng-change事件无效方法，读取本地excel数据

####ng-change事件对于type="file"的input标签不起作用,解决方法：
使用脚本绑定
<input onchange="angular.element(this).scope().自定义方法名()" type="file">  
$scope.自定义方法名= function () {  
}

未解决：不能在js中使用指令动态加载html，将刚刚读到的excel中的数据展示出来

