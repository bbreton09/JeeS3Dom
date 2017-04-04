// Load Box value on start

function initJeedomValue() {
localStorage.setItem("IP", "https://jeedom");
localStorage.setItem("KEY", "macléAPI");
requestscenes("Jeeble");
}

// Basic HTTP request to launch command

function requestsite(jeedomcmd)
 {
	
var myKeyValue, myIPValue;
	
myKeyValue =  localStorage.getItem("KEY");
myIPValue =  localStorage.getItem("IP");
console.log("KEY Value: " + myKeyValue);
console.log("IP Value: " + myIPValue);
	
var client = new XMLHttpRequest();
client.open("GET", "http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=cmd&id=" + jeedomcmd );
console.log("http://" + myIPValue + "/core/api/jeeApi.php?apikey=" + myKeyValue + "&type=cmd&id=" + jeedomcmd);
client.onreadystatechange = function() {
    if (client.readyState == 4) {
        if(client.status == 200) {
           console.log(client.responseText);
           navigator.vibrate([500, 500, 500]);
        }
    }
};
client.send();
};

function requestscenes(jeedomScenes){
	var myKeyValue, myIPValue;
	
	myKeyValue =  localStorage.getItem("KEY");
	myIPValue =  localStorage.getItem("IP");
	console.log("KEY Value: " + myKeyValue);
	console.log("IP Value: " + myIPValue);
	var element = document.getElementById('scenes');
	 
	var getJSON = function(url) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.responseType = 'json';
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status);
				}
			};
			xhr.send();
		});
	};

	getJSON(myIPValue +'/core/api/jeeApi.php?request={"method":"scenario::all","params":{"apikey":"'+ myKeyValue +'"},"jsonrpc":"2.0"}').then(function(data) {   
		//console.log(data.result);
		var trHTML = '';
		for (var i in data.result) {
			console.log(data.result[i])
			if (data.result[i].group == jeedomScenes) {
				element.innerHTML = trHTML += '<li><a href="'+myIPValue +'/core/api/jeeApi.php?apikey='+ myKeyValue +'&type=scenario&id='+ data.result[i].id +'&action=start">'+ data.result[i].name +'</a></li>';
			}
		}
	}, function(status) {
		console.log('il y a une erreur');
	});
};
