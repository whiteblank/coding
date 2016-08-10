function showPic(){
	var ulist=document.getElementById("navpac");
	var list=ulist.getElementsByTagName("li");
	var image1=document.getElementById("image1");
	var image2=document.getElementById("image2");
	var image3=document.getElementById("image3");
	var image4=document.getElementById("image4");
	var image5=document.getElementById("image5");

		image1.style.top="0px";
		image2.style.top="280px";
		image3.style.top="560px";
		image4.style.top="840px";
		image5.style.top="1120px";
		list[0].onmouseover=function(){
			moveElement("image1",0,50);
			moveElement("image2",280,50);
			moveElement("image3",560,50);
			moveElement("image4",840,50);
			moveElement("image5",1120,50);
		}
		list[1].onmouseover=function(){
			moveElement("image1",-280,50);
			moveElement("image2",0,50);
			moveElement("image3",280,50);
			moveElement("image4",560,50);
			moveElement("image5",840,50);
			
		}
		list[2].onmouseover=function(){
			moveElement("image1",-560,50);
			moveElement("image2",-280,50);
			moveElement("image3",0,50);
			moveElement("image4",280,50);
			moveElement("image5",560,50);
			
		}
		list[3].onmouseover=function(){
			moveElement("image1",-840,50);
			moveElement("image2",-560,50);
			moveElement("image3",-280,50);
			moveElement("image4",0,50);
			moveElement("image5",280,50);
			
		}
		list[4].onmouseover=function(){
			moveElement("image1",-1120,50);
			moveElement("image2",-840,50);
			moveElement("image3",-560,50);
			moveElement("image4",-280,50);
			moveElement("image5",0,50);
			
		}
	}

function moveElement(name,final_y,interval){
	var elem=document.getElementById(name);
	if(elem.move){
		clearTimeout(elem.move);
	}
	if(!elem.style.top){
		elem.style.top="0px";
		}
	var ypos=parseInt(elem.style.top);
	
	var dist=0;
	if(ypos==final_y){
		return true;
	}
	if(ypos<final_y){
		dist=Math.ceil((final_y-ypos)/3);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		dist=Math.ceil((-final_y+ypos)/3);
		ypos=ypos-dist;

	}

	elem.style.top=ypos+"px";
	var repeat="moveElement('"+name+"',"+final_y+","+interval+")";
	elem.move=setTimeout(repeat,interval);
}

window.onload=showPic();
/////////////////////