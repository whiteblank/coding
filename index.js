function showPic(){
	var ulist=document.getElementById("navpac");
	var list=ulist.getElementsByTagName("li");
	var image=document.getElementById("image");
	var silderbar=document.getElementById("sildebar");
		silderbar.style.top="0px";
		list[0].onmouseover=function(){
			moveElement("image",0,50);
		}
		list[1].onmouseover=function(){
			moveElement("image",-280,50);
		}
		list[2].onmouseover=function(){
			moveElement("image",-560,50);
		}
		list[3].onmouseover=function(){
			moveElement("image",-840,50);
		}
		list[4].onmouseover=function(){
			moveElement("image",-1020,50);
		}
	}

function moveElement(name,final_y,interval){
	var elem=document.getElementById(name);
	if(elem.move){
		clearTimeout(elem.move);
	}
	var ypos=parseInt(elem.style.top);
	var dist=0;
	if(ypos==final_y){
		return true;
	}
	if(ypos<final_y){
		dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		dist=Math.ceil((-final_y+ypos)/10);
		ypos=ypos-dist;
	}
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+name+"',"+final_y+","+interval+")";
	elem.move=setTimeout(repeat,interval);
}

window.onload=showPic();