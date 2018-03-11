     var app=angular.module("app",[]);
        app.directive('file', function () {  
            return {  
                scope: {  
                    file: '='  
                },  
                link: function (scope, el, attrs) {  
                    el.bind('change', function (event) {  
                        var file = event.target.files;  
                        scope.file = file ? file : undefined;  
                        scope.$apply();  
                    });  
                }  
            };  
        })  
        .controller("con",function($scope,$compile){
            $scope.testdata=[{"成交时间":"2018/2/5","收货地址":"ninini0"}];
            $scope.sub = function(){  
                f = $scope.upload_file[0];
				var wb;//读取完成的数据
            	var rABS = false; //是否将文件读取为二进制字符串

				var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(data)), {
                            type: 'base64'
                        });
                    } else {

                        wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据document.getElementById("demo").innerHTML
                    data= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
                    var jsonObj =  JSON.parse(data);
                    var don_1=[];
                    var don_11=[];


                    //处理每笔订单的收货地址，按宿舍栋数划分
                    for(let i in jsonObj){
                        var add=jsonObj[i]['收货地址'];
                        let reg1 = /\D{1}1栋|\D{1}1-/;
                        // console.log(add.match(reg1));
                        let reg11 = /\D{1}11栋|\D{1}11-/;
                        if(reg1.test(add)){
                            don_1.push(jsonObj[i]);
                        }else if (reg11.test(add)){
                            don_11.push(jsonObj[i]);
                        }   
                    }
                    
                    //绑定每一个宿舍的数组到$scope上
                    $scope.data=data;  
                    console.log($scope.data);
                    don_1=JSON.stringify(don_1);
                    $scope.don_1=don_1;  
                                      
                    $scope.don_11=don_11;  
                    console.log($scope.don_11);

                    // //动态生成表格代码,用到指令
                    // var html='<label>1栋</label>'+
                    //       '<table border="1" ng-repeat="stu in data track by index" width="400px">'+
                    //             '<th>成交时间</th>'+
                    //             '<th>商品名称</th>'+
                    //             '<th>商品总金额</th>'+
                    //             '<th>收货地址</th'+
                    //             '<tr>'+
                    //                 '<td>{{stu["成交时间"]}}</td>'+
                    //                 // '<td>{{stu["商品名称"]}}</td>'+
                    //                 // '<td>{{stu["商品总金额"]}}</td>'+
                    //                 '<td>{{stu["收货地址"]}}</td>'+
                    //             '</tr>'+
                    //         '</table>';
                    // var $html = $compile(html)($scope);

                    // $('#tab').append($html);

                app.directive('myHtml',function(){
                return{
                    restrict:'ACE',
                    replace:true,
                    scope:{
                        data:'='
                    },
                    template:'<label>1栋</label>'+
                          '<table border="1" ng-repeat="stu in data track by index" width="400px">'+
                                '<th>成交时间</th>'+
                                '<th>商品名称</th>'+
                                '<th>商品总金额</th>'+
                                '<th>收货地址</th>'+
                                '<tr>'+
                                    '<td>{{stu["成交时间"]}}</td>'+
                                    '<td>{{stu["商品名称"]}}</td>'+
                                    '<td>{{stu["商品总金额"]}}</td>'+
                                    '<td>{{stu["收货地址"]}}</td>'+
                                '</tr>'+
                            '</table>'
                }
            })                       

                };
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
             
                    reader.readAsBinaryString(f);
                }
            }

            function fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            }

                         

        //         $http({  
        //             headers : {  
        //                 'content-type': 'multipart/form-data',  
        //             },  
        //             method: "POST",  
        //             url: "yourUrl",  
        //             data : tmp_file,  // # ransformRequest 函数是必须有  
                    
        //             transformRequest: function (data, headersGetter) {  
        //                 var formData = new FormData();  
        //                 angular.forEach(data, function (value, key) {  
        //                     formData.append(key, value);  
        //                 });  
  
  
        //                 var headers = headersGetter();  
        //                 delete headers['Content-Type'];  
  
  
        //                 return formData;  
        //             },  
        //         }).then(function(response){  
        //             console.log(response);  
        //         },function(response){  
        //             console.log(response);  
        //         });  
        //     }  
        })  
