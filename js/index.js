var weather;
var city;
//请求太原天气情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
    dataType:"jsonp",
    type:"get",
    success:function(obj){
    	weather=obj.data.weather;
    	//console.log(weather);
    }
})
//请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		console.log(obj.data);
	}
})
//渲染数据
function updata(){

    // for(var j in weather.forecast_list){
    //   	console.log(weather.forecast_list[j].date.substring(5, 7));
    //    	console.log(weather.forecast_list[j].date.substring(8, 10));
    // }
	//渲染城市
    var cityName=document.getElementsByClassName("header")[0];
    cityName.innerHTML=weather.city_name;
    //当前温度
    var temp=document.getElementsByClassName("wendu")[0];
    temp.innerHTML=weather.current_temperature+"°";
    //当前天气状况
    var wea=document.getElementsByClassName("tianqi")[0];
    wea.innerHTML=weather.current_condition;
    //今天最高温
    var high=document.getElementById("dat_high_temperature");
    high.innerHTML=weather.dat_high_temperature;
    //今天最低温
    var dat_low_temperature=document.getElementById("dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature;
    //今天的天气状况
    var day_condition=document.getElementById("day_condition");
    day_condition.innerHTML=weather.day_condition;
    //今天icon
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
    //明天最高温
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    //明天最低温
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
    //明天的天气状况
    var tomorrow_condition=document.getElementById("tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;
    //明天icon
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;

    for(var i in weather.hourly_forecast){
    	//创建父元素div
    	var now=document.createElement("div");
    	//给父元素div加样式
    	now.className="now";
    	//获取now的父元素
    	var nowp=document.getElementById("now");
    	//把now插入到父元素中
    	nowp.appendChild(now);

    	var now_time=document.createElement("h2");
    	now_time.className="now_time";
    	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
        now.appendChild(now_time);

        var now_weather=document.createElement("div");
        now_weather.className="now_weather";
        now_weather.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
        now.appendChild(now_weather);

        var now_temperature=document.createElement("h3");
        now_temperature.className="now_temperature";
        now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
        now.appendChild(now_temperature);
    }

         
    for(var j in weather.forecast_list){
    	//创建父元素div
    	var recent=document.createElement("div");
    	//给父元素div加样式
    	recent.className="recent";
    	//获取recent的父元素
    	var recentp=document.getElementById("recent");
    	//把recent插入到父元素中
    	recentp.appendChild(recent);

    	var recent_time=document.createElement("div");
    	recent_time.className="recent_time";
        recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8,10);
   	    recent.appendChild(recent_time);

    	var recent_wea=document.createElement("h2");
    	recent_wea.className="recent_wea";
    	recent_wea.innerHTML=weather.forecast_list[j].condition;
        recent.appendChild(recent_wea);

        var recent_pic=document.createElement("div");
        recent_pic.className="recent_pic";
        recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
        recent.appendChild(recent_pic);

        var recent_high=document.createElement("h3");
        recent_high.className="recent_high";
        recent_high.innerHTML=weather.forecast_list[j].high_temperature+"°";
        recent.appendChild(recent_high);

        var recent_low=document.createElement("h4");
        recent_low.className="recent_low";
        recent_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
        recent.appendChild(recent_low);

        var recent_wind=document.createElement("h5");
        recent_wind.className="recent_wind";
        recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
        recent.appendChild(recent_wind);

        var recent_level=document.createElement("h6");
        recent_level.className="recent_level";
        recent_level.innerHTML=weather.forecast_list[j].wind_level;
        recent.appendChild(recent_level);
    }

    // //当前风向
    // var wind_direction=document.getElementById("wind_direction");
    // wind_direction.innerHTML=weather.wind_direction;
    // //风级
    // var wind_level=document.getElementById("wind_level");
    // wind_level.innerHTML=weather.wind_level+"级";
    
    var header=document.getElementsByClassName("header")[0];
    var city_box=document.getElementsByClassName("city_box")[0];
    //设置点击事件
    header.onclick=function(){
    	$(".text").val("");
    	$(".button").html("取消");
    	city_box.style="display:block";
    }
    //渲染城市
    for(var k in city){
    	console.log(k);

    	var cityp=document.getElementById("city");
    	var remen=document.createElement("h2");
    	remen.className="remen";
    	remen.innerHTML=k;
    	cityp.appendChild(remen);

        var son=document.createElement("div");
        son.className="son";
    	for(var y in city[k]){
    		console.log(y);
            var erji=document.createElement("div");
            erji.className="text1";
            erji.innerHTML=y;
            son.appendChild(erji);
    	
    	}
    	cityp.appendChild(son);
    }
}
//查找各城市天气信息
function AJAX(str){
    $.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
    dataType:"jsonp",
    type:"get",
    success:function(obj){
    	weather=obj.data.weather;
    	//console.log(weather);
    	updata();
    	$(".city_box").css({"display":"none"});
    }
  })
}

//当页面加载完成执行的代码
window.onload=function(){
	updata();

	$(".text1").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})
	//当input获取焦点，button变确认
	//focus 获取焦点
	//html 设置和改变元素内容
	$(".text").on("focus",function(){
       $(".button").html("确认");
	})
	//操作按钮
	var button=document.getElementsByClassName("button")[0];
	console.log(button);
	//添加点击事件
	button.onclick=function(){
		//获取button中的内容
		var btn=this.innerHTML;
		if(btn=="取消"){
			var city_box1=document.getElementsByClassName("city_box")[0];
			city_box1.style="display:none";
		}
		else{
			var str1=document.getElementById("text").value;
			for(var i in city){
				for(var j in city[i]){
					if(str1==j){
						AJAX(str1);
						return;
					}
				}
			}
			// var str=document.getElementsByClassName("text")[0].value;
		 //    console.log(str);
		 //    for(var i in city){
		 //    	if(i==str){
		 //    		AJAX(str);
		 //    		return;
		 //    	}
		 //    	else{
		 //    		for(var j in city[i]){
		 //    			if(j==str){
		 //    				AJAX(str);
		 //    				return;
		 //    			}
		 //    		}
		 //    	}
		 //    }
		    alert("没有该城市气象信息");
		}
	}
}