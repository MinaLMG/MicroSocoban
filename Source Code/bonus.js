var levelNum=1,
	levelIndex = levelNum-1,
	widthes=[8,13,19,9],
	heights=[7,8,11,9],
	boxesNum,
	holesNum,
	blocksNum,
	blocks=[[1,2,3,4,5,6,7,8,9,12,16,17,24,25,31,32,33,40,41,44,48,49,50,51,52,53,54,55,56],[8,9,10,11,12,13,14,15,16,17,18,19,20,21,26,27,33,34,39,40,46,47,52,53,54,56,65,67,78,80,84,85,86,87,88,89,90,91,93,94,95,96,97],[5,6,7,8,9,24,28,43,47,60,61,62,66,67,79,86,96,97,98,100,102,103,105,109,110,111,112,113,114,115,119,121,122,124,125,126,127,128,133,134,152,153,154,155,156,157,159,160,161,163,165,166,171,176,182,183,184,185,186,187,188,189,190,195,196,197,198,199,200,201],[1,2,3,4,5,6,7,8,9,10,18,19,27,28,29,31,32,33,36,38,44,45,47,52,53,56,61,65,68,69,70,74,75,76,77]],
	boxes=[[19,22,27,29,35,38],[42,44,48,49,62,69,71,76],[44,65,82,84,136,139],[23,41,49,50,51,59]/*[24, 11, 57, 12, 20, 13]*/],
	levelBoxes=[],
	holes=[[20, 21, 28, 37, 29, 36],[51,25,22,23,24,64,38,77],[131,132,150,151,169,170],[24, 11, 66, 12, 20, 13]],
	rocks=[[18],[37],[164],[60]],
	levelRocks=[],
	boxInfo=[["DB","DW","DD","DQ","DT","EQu"],["es","fr","ip","sp","di","cs","ds","si"],["MOV AX, 1234H","MOV AX,BX","MOV AX,[200]","MOV AX,[BX]","MOV AX,[BX+3]","MOV AX,[SI+3]"],["CF (Carry Flag)","AF (Auxiliary Carry Flag)","PF (Parity Flag)","ZF (Zero Flag)","SF (Sign Flag)","OF (Overflow Flag)",/*"DF (Direction Flag)"*/]],
	holeInfo=[["1 Byte ","2 Bytes ","4 Bytes ","8 Bytes ","10 Bytes ","0 Byte" ],["extra segment","flag register","instruction pointer","stack pointer","destination index","code segment","data segment","source index"],["Immediate addressing mode","Register addressing mode","Direct addressing mode","Register indirect addressing mode (ONLY BX,SI or DI)","Based Relative addressing mode (ONLY BX or BP)","Indexed Relative addressing mode(ONLY SI or DI)"],["Set when there is a carry out, from d7 after an 8-bit operation, or d15 after a 16-bit operation. Used to detect errors in unsigned arithmetic operations.","If there is a carry from d3 to d4 of an operation, this bit is set; otherwise, it is cleared. ","After certain operations, the parity of the result's low-order byte is checked. If the byte has an even number of 1s, it is set to 1; otherwise, it is cleared.","Set to 1 if the result of an arithmetic or logical operation is zero; otherwise, it is cleared.","Binary representation of signed numbers uses the most significant bit as the sign bit.","Set when the result of a signed number operation is too large, causing the high-order bit to overflow into the sign bit.Used only to detect errors in signed arithmetic operations."/*,"Used to control the direction of string operations."*/]],
	questions=["name 15DW('$') will reserve ... bytes.","we can get the adress of the current instruction using .... .","MOV AX,[Bp] is .... adressing mode.","the parity flag checks ... ."],
	choices1=["15","CS,IP","register","the low byte"],
	choices2=["30","DS,IP","indexed relative","the high byte"],
	choices3=["60","DI,SI","based relative","the whole byte"],
	choices4=["4","DS,SI","register indirect","none of the above"],
	rightChoices=["30","CS,IP","based relative","the low byte"],
	questionMarks=[10,6,5,8],
	levelMarks=[30,40,50,60],
	blocksHeights=[80,70,50,60],
	blocksWidthes=[80,70,50,60],
	arrowDown ,
	arrowLeft ,
	arrowRight,
	header,
	grid,
	boxViewerdiv ,
	holeViewerdiv ,
	boxViewerDivMain ,
	holeViewerDivMain ,
	questionHolder,
	resetButton,
	num,
	container,
	boxOrWall,
	index,
	nextPlace,
	nextPlace2,
	startMenu,
	nameTextBox,
	checkSpan,
	startButton,
	userName,
	timersM=[25,22,18,15],
	timerM,
	timersS=[1,1,1,1],
	timerS,
	minutesDiv,
	secondsDiv,
	tI1,
	scoreValue=0;
drawStart();
/*drawLevel();*/
function drawStart(){
	var start = document.createElement("div");
	startMenu=start;
	start.classList.add("start");
	var gameName = document.createElement("div");
	gameName.classList.add("gameName");
	gameName.textContent="Micro socoban game";
	var welcome = document.createElement("p");
	welcome.classList.add("welcome");
	welcome.textContent="hello man, what's your name ?";
	var text = document.createElement("input");
	nameTextBox=text;
	text.type="text";
	var check = document.createElement("span");
	checkSpan=check;
	check.classList.add("check");
	var button = document.createElement("input");
	startButton=button;
	button.type="button";
	button.value="start";
	startButton.onclick=function(){
		if(nameTextBox.value==""){
			checkSpan.textContent="please, enter your name";
			return;
		}
		userName=nameTextBox.value;
		startMenu.remove();
		drawLevel();
	}
	/* drawing the box*/
	var box =document.createElement("div");
	box.classList.add("box","boxInStart");
	container =document.createElement("div");
	container.classList.add("container");
	var background =document.createElement("div");
	background.classList.add("background");
	var leftUp =document.createElement("div");
	leftUp.classList.add("leftUp");
	var leftdown =document.createElement("div");
	leftdown.classList.add("leftdown");
	var up =document.createElement("div");
	up.classList.add("up");
	var down =document.createElement("div");
	down.classList.add("down");
	var right =document.createElement("div");
	right.classList.add("right");
	var left =document.createElement("div");
	left.classList.add("left");
	var upright =document.createElement("div");
	upright.classList.add("upright");
	var upleft =document.createElement("div");
	upleft.classList.add("upleft");
	var downright =document.createElement("div");
	downright.classList.add("downright");
	var downleft =document.createElement("div");
	downleft.classList.add("downleft");
	container.appendChild(background);
	container.appendChild(leftUp);
	container.appendChild(leftdown);
	container.appendChild(up);
	container.appendChild(down);
	container.appendChild(right);
	container.appendChild(left);
	container.appendChild(upright);
	container.appendChild(upleft);
	container.appendChild(downright);
	container.appendChild(downleft);
	box.appendChild(container);
	var rock =document.createElement("div");
	rock.classList.add("rock","rockInStart");
	var main =document.createElement("div");
	main.classList.add("main");
	rock.appendChild(main);
	var hole =document.createElement("div");
	hole.classList.add("hole","holeInStart");
	var main =document.createElement("div");
	main.classList.add("main");
	hole.appendChild(main);	
	var block =document.createElement("div");
	block.classList.add("wall-block","blockInStart");
	var b1 =document.createElement("div");
	b1.classList.add("b1");
	var b2 =document.createElement("div");
	b2.classList.add("b2");
	var b3 =document.createElement("div");
	b3.classList.add("b3");
	var b4 =document.createElement("div");
	b4.classList.add("b4");
	var b5 =document.createElement("div");
	b5.classList.add("b5");
	var b6 =document.createElement("div");
	b6.classList.add("b6");
	var b7 =document.createElement("div");
	b7.classList.add("b7");
	var b8 =document.createElement("div");
	b8.classList.add("b8");
	block.appendChild(b1);
	block.appendChild(b2);
	block.appendChild(b3);
	block.appendChild(b4);
	block.appendChild(b5);
	block.appendChild(b6);
	block.appendChild(b7);
	block.appendChild(b8);
	start.appendChild(gameName);
	start.appendChild(welcome);
	start.appendChild(text);
	start.appendChild(check);
	start.appendChild(button);
	start.appendChild(box);
	start.appendChild(rock);
	start.appendChild(hole);
	start.appendChild(block);
	document.body.appendChild(start);
}
function drawLevel(){
	var width = widthes[levelIndex];
	var height = heights[levelIndex];
	var blocksWidth=blocksWidthes[levelIndex];
	var blocksHeight=blocksHeights[levelIndex];
	for(i=0;i<boxes[levelIndex].length;i=i+1){
		levelBoxes.push(boxes[levelIndex][i]);
	}
	for(i=0;i<rocks[levelIndex].length;i=i+1){
		levelRocks.push(rocks[levelIndex][i]);
	}
	timerM=timersM[levelIndex];
	timerS=timersS[levelIndex];
	header = document.createElement("div");
	header.classList.add("header");
	var name=document.createElement("div");
	name.classList.add("name");
	var text =document.createElement("span");
	text.classList.add("text");
	text.textContent="name:";
	var username =document.createElement("span");
	username.classList.add("username");
	username.textContent=userName;
	name.appendChild(text);
	name.appendChild(username);
	var timer=document.createElement("div");
	timer.classList.add("timer");
	var minutes =document.createElement("span");
	minutes.classList.add("minutes");
	minutesDiv=minutes;
	var seconds =document.createElement("span");
	seconds.classList.add("seconds");
	secondsDiv=seconds;
	timer.appendChild(minutes);
	timer.appendChild(seconds);
	tI1=setInterval(decreaseTime,1000);
	var score =document.createElement("div");
	score.classList.add("score");
	var text =document.createElement("span");
	text.classList.add("text");
	text.textContent="score:";
	num =document.createElement("span");
	num.classList.add("num");
	num.textContent=scoreValue;
	score.appendChild(text);
	score.appendChild(num);
	header.appendChild(name);
	header.appendChild(timer);
	header.appendChild(score);
	document.body.appendChild(header);
	/*****************/
	grid = document.createElement("div");
	grid.classList.add("level");
	grid.style.width=blocksWidth*width;
	grid.style.height=blocksHeight*height;
	boxesNum = levelBoxes.length;
	for(i=0;i<boxesNum;i=i+1){
		var box =document.createElement("div");
		box.classList.add("box");
		box.style.width=blocksWidth;
		box.style.height=blocksHeight;
		container =document.createElement("div");
		container.classList.add("container");
		var background =document.createElement("div");
		background.classList.add("background");
		var leftUp =document.createElement("div");
		leftUp.classList.add("leftUp");
		var leftdown =document.createElement("div");
		leftdown.classList.add("leftdown");
		var up =document.createElement("div");
		up.classList.add("up");
		var down =document.createElement("div");
		down.classList.add("down");
		var right =document.createElement("div");
		right.classList.add("right");
		var left =document.createElement("div");
		left.classList.add("left");
		var upright =document.createElement("div");
		upright.classList.add("upright");
		var upleft =document.createElement("div");
		upleft.classList.add("upleft");
		var downright =document.createElement("div");
		downright.classList.add("downright");
		var downleft =document.createElement("div");
		downleft.classList.add("downleft");
		container.appendChild(background);
		container.appendChild(leftUp);
		container.appendChild(leftdown);
		container.appendChild(up);
		container.appendChild(down);
		container.appendChild(right);
		container.appendChild(left);
		container.appendChild(upright);
		container.appendChild(upleft);
		container.appendChild(downright);
		container.appendChild(downleft);	
		var boxNum = levelBoxes[i]-1,
			boxNumV=Math.floor(boxNum/width),
			boxNumH=boxNum-boxNumV*width;
		box.style.top = boxNumV*blocksHeight;
		box.style.left = boxNumH*blocksWidth
		box.appendChild(container);
		grid.appendChild(box);	
	}
	blocksNum = blocks[levelIndex].length;
	for(i=0;i<blocksNum;i=i+1){
		var block =document.createElement("div");
		block.classList.add("wall-block");
		block.style.width=blocksWidth;
		block.style.height=blocksHeight;
		var b1 =document.createElement("div");
		b1.classList.add("b1");
		var b2 =document.createElement("div");
		b2.classList.add("b2");
		var b3 =document.createElement("div");
		b3.classList.add("b3");
		var b4 =document.createElement("div");
		b4.classList.add("b4");
		var b5 =document.createElement("div");
		b5.classList.add("b5");
		var b6 =document.createElement("div");
		b6.classList.add("b6");
		var b7 =document.createElement("div");
		b7.classList.add("b7");
		var b8 =document.createElement("div");
		b8.classList.add("b8");
		var blockNum = blocks[levelIndex][i]-1,
			blockNumV=Math.floor(blockNum/width),
			blockNumH=blockNum-blockNumV*width;
		block.appendChild(b1);
		block.appendChild(b2);
		block.appendChild(b3);
		block.appendChild(b4);
		block.appendChild(b5);
		block.appendChild(b6);
		block.appendChild(b7);
		block.appendChild(b8);
		block.style.top = blockNumV*blocksHeight;
		block.style.left = blockNumH*blocksWidth;
		grid.appendChild(block);	
	}
	holesNum = holes[levelIndex].length;
	for(i=0;i<holesNum;i=i+1){
		var hole =document.createElement("div");
		hole.classList.add("hole");
		hole.style.width=blocksWidth;
		hole.style.height=blocksHeight;
		var main =document.createElement("div");
		main.classList.add("main");
		hole.appendChild(main);
		var holeNum = holes[levelIndex][i]-1,
			holeNumV=Math.floor(holeNum/width),
			holeNumH=holeNum-holeNumV*width;
		hole.style.top = holeNumV*blocksHeight;
		hole.style.left = holeNumH*blocksWidth;
		grid.appendChild(hole);	
	}
	rocksNum = levelRocks.length;
	for(i=0;i<rocksNum;i=i+1){
		var rock =document.createElement("div");
		rock.classList.add("rock");
		rock.style.width=blocksWidth;
		rock.style.height=blocksHeight;
		var main =document.createElement("div");
		main.classList.add("main");
		rock.appendChild(main);
		var rockNum = levelRocks[i]-1,
			rockNumV=Math.floor(rockNum/width),
			rockNumH=rockNum-rockNumV*width;
		rock.style.top = rockNumV*blocksHeight;
		rock.style.left = rockNumH*blocksWidth;
		grid.appendChild(rock);	
	}
	arrowUp=document.createElement("div");
	arrowUp.classList.add("arrow-up");
	arrowUp.style.top=((grid.style.height).replace('px',''))-(-(60+20));
	var temp1=((grid.style.height).replace('px',''))-(-(60+20));
	/*arrowUp.style.left=((grid.style.width).replace('px',''))/2;
	var temp2=((grid.style.width).replace('px',''))/2;*/
	/****/
	arrowDown=document.createElement("div");
	arrowDown.classList.add("arrow-down");
	arrowDown.style.top=temp1-(-90);
	/*arrowDown.style.left=temp2;*/
	/*****/
	arrowRight=document.createElement("div");
	arrowRight.classList.add("arrow-right");
	arrowRight.style.top=temp1-(-30);
	/*arrowRight.style.left=temp2-(-60);*/
	/*****/
	arrowLeft=document.createElement("div");
	arrowLeft.classList.add("arrow-left");
	arrowLeft.style.top=temp1-(-30);
	/*arrowLeft.style.left=temp2-30;*/
	/*****/
	arrowUp.onclick=function(){
		var rockNum =levelRocks[0];
		var rock = document.querySelector(".rock");
		nextPlace = rockNum-widthes[levelIndex];
		checkRockCollision();
		if(boxOrWall==0){
			levelRocks[0]=rockNum-widthes[levelIndex];
			var top = rock.style.top;
			top=top.replace('px','');
			top-=blocksHeight;
			rock.style.top=top;	
		}else if(boxOrWall==2){
			return;
		}else{
			nextPlace2=nextPlace-widthes[levelIndex];
			checkBoxCollision();
			if(boxOrWall==0){
				checkRockCollision();
				levelRocks[0]=rockNum-widthes[levelIndex];
				var top = rock.style.top;
				top=top.replace('px','');
				top-=blocksHeight;
				rock.style.top=top
				index = levelBoxes.indexOf(nextPlace);
				levelBoxes[index]=nextPlace2;
				var wanted = document.querySelectorAll(".box")[index];
				top = wanted.style.top;
				top=top.replace('px','');
				top-=blocksHeight;
				wanted.style.top=top;
				if(levelBoxes[index]==holes[levelIndex][index]){
					wanted.firstChild.children[0].style.backgroundColor="darkblue";
				}
				else{
					wanted.firstChild.children[0].style.backgroundColor="yellow";
				}
				checkFinished();
			}
		}
	}
	arrowDown.onclick=function(){
		var rockNum =levelRocks[0];
		var rock = document.querySelector(".rock");
		nextPlace = rockNum+widthes[levelIndex];
		checkRockCollision();
		if(boxOrWall==0){
			levelRocks[0]=rockNum+widthes[levelIndex];
			var top = rock.style.top;
			top=top.replace('px','');
			top-=(-blocksHeight);
			rock.style.top=top;
		}else if(boxOrWall==2){
			return;
		}else{
			nextPlace2=nextPlace+widthes[levelIndex];
			checkBoxCollision();
			if(boxOrWall==0){
				checkRockCollision();
				levelRocks[0]=rockNum+widthes[levelIndex];
				var top = rock.style.top;
				top=top.replace('px','');
				top-=(-blocksHeight);
				rock.style.top=top;
				index = levelBoxes.indexOf(nextPlace);
				levelBoxes[index]=nextPlace2;
				var wanted = document.querySelectorAll(".box")[index];
				top = wanted.style.top;
				top=top.replace('px','');
				top-=(-blocksHeight);
				wanted.style.top=top;
				if(levelBoxes[index]==holes[levelIndex][index]){
					wanted.firstChild.children[0].style.backgroundColor="darkblue";
				}else{
					wanted.firstChild.children[0].style.backgroundColor="yellow";
				}
				checkFinished();
			}
		}
	}
	arrowRight.onclick=function(){
		var rockNum =levelRocks[0];
		var rock = document.querySelector(".rock");
		nextPlace = rockNum+1;
		checkRockCollision();
		if(boxOrWall==0){
			levelRocks[0]=rockNum+1;
			var left = rock.style.left;
			left=left.replace('px','');
			left-=(-blocksWidth);
			rock.style.left=left;
		}else if(boxOrWall==2){
			return;
		}else{
			nextPlace2=nextPlace+1;
			checkBoxCollision();
			if(boxOrWall==0){
				checkRockCollision();
				levelRocks[0]=rockNum+1;
				var left = rock.style.left;
				left=left.replace('px','');
				left-=(-blocksWidth);
				rock.style.left=left;
				index = levelBoxes.indexOf(nextPlace);
				levelBoxes[index]=nextPlace2;
				var wanted = document.querySelectorAll(".box")[index];
				left = wanted.style.left;
				left=left.replace('px','');
				left-=(-blocksWidth);
				wanted.style.left=left;
				if(levelBoxes[index]==holes[levelIndex][index]){
					wanted.firstChild.children[0].style.backgroundColor="darkblue";
				}else{
					wanted.firstChild.children[0].style.backgroundColor="yellow";
				}
				checkFinished();
			}
		}
	}
	arrowLeft.onclick=function(){
		var rockNum =levelRocks[0];
		var rock = document.querySelector(".rock");
		nextPlace = rockNum-1;
		checkRockCollision();
		if(boxOrWall==0){
			levelRocks[0]=rockNum-1;
			var left = rock.style.left;
			left=left.replace('px','');
			left-=blocksWidth;
			rock.style.left=left;
		}else if(boxOrWall==2){
			return;
		}else{
			nextPlace2=nextPlace-1;
			checkBoxCollision();
			if(boxOrWall==0){
				checkRockCollision();
				levelRocks[0]=rockNum-1;
				var left = rock.style.left;
				left=left.replace('px','');
				left-=blocksWidth;
				rock.style.left=left;
				index = levelBoxes.indexOf(nextPlace);
				levelBoxes[index]=nextPlace2;
				var wanted = document.querySelectorAll(".box")[index];
				left = wanted.style.left;
				left=left.replace('px','');
				left-=blocksWidth;
				wanted.style.left=left;
				if(levelBoxes[index]==holes[levelIndex][index]){
					wanted.firstChild.children[0].style.backgroundColor="darkblue";
				}else{
					wanted.firstChild.children[0].style.backgroundColor="yellow";
				}
				checkFinished();
			}
		}
	}
	document.body.appendChild(arrowUp);
	document.body.appendChild(arrowDown);
	document.body.appendChild(arrowLeft);
	document.body.appendChild(arrowRight);
	window.onkeyup=function(e){
		if(e.keyCode==37||e.keyCode==65){
				var rockNum =levelRocks[0];
			var rock = document.querySelector(".rock");
			nextPlace = rockNum-1;
			checkRockCollision();
			if(boxOrWall==0){
				levelRocks[0]=rockNum-1;
				var left = rock.style.left;
				left=left.replace('px','');
				left-=blocksWidth;
				rock.style.left=left;
			}else if(boxOrWall==2){
				return;
			}else{
				nextPlace2=nextPlace-1;
				checkBoxCollision();
				if(boxOrWall==0){
					checkRockCollision();
					levelRocks[0]=rockNum-1;
					var left = rock.style.left;
					left=left.replace('px','');
					left-=blocksWidth;
					rock.style.left=left;
					index = levelBoxes.indexOf(nextPlace);
					levelBoxes[index]=nextPlace2;
					var wanted = document.querySelectorAll(".box")[index];
					left = wanted.style.left;
					left=left.replace('px','');
					left-=blocksWidth;
					wanted.style.left=left;
					if(levelBoxes[index]==holes[levelIndex][index]){
						wanted.firstChild.children[0].style.backgroundColor="darkblue";
					}else{
						wanted.firstChild.children[0].style.backgroundColor="yellow";
					}
					checkFinished();
			}
		}
		}else if(e.keyCode==38||e.keyCode==87){
			var rockNum =levelRocks[0];
			var rock = document.querySelector(".rock");
			nextPlace = rockNum-widthes[levelIndex];
			checkRockCollision();
			if(boxOrWall==0){
				levelRocks[0]=rockNum-widthes[levelIndex];
				var top = rock.style.top;
				top=top.replace('px','');
				top-=blocksHeight;
				rock.style.top=top;	
			}else if(boxOrWall==2){
				return;
			}else{
				nextPlace2=nextPlace-widthes[levelIndex];
				checkBoxCollision();
				if(boxOrWall==0){
					checkRockCollision();
					levelRocks[0]=rockNum-widthes[levelIndex];
					var top = rock.style.top;
					top=top.replace('px','');
					top-=blocksHeight;
					rock.style.top=top
					index = levelBoxes.indexOf(nextPlace);
					levelBoxes[index]=nextPlace2;
					var wanted = document.querySelectorAll(".box")[index];
					top = wanted.style.top;
					top=top.replace('px','');
					top-=blocksHeight;
					wanted.style.top=top;
					if(levelBoxes[index]==holes[levelIndex][index]){
						wanted.firstChild.children[0].style.backgroundColor="darkblue";
					}else{
						wanted.firstChild.children[0].style.backgroundColor="yellow";
					}
					checkFinished();
				}
			}
		}else if(e.keyCode==39||e.keyCode==68){
			var rockNum = levelRocks[0];
			var rock = document.querySelector(".rock");
			nextPlace = rockNum+1;
			checkRockCollision();
			if(boxOrWall==0){
				levelRocks[0]=rockNum+1;
				var left = rock.style.left;
				left=left.replace('px','');
				left-=(-blocksWidth);
				rock.style.left=left;
			}else if(boxOrWall==2){
				return;
			}else{
				nextPlace2=nextPlace+1;
				checkBoxCollision();
				if(boxOrWall==0){
					checkRockCollision();
					levelRocks[0]=rockNum+1;
					var left = rock.style.left;
					left=left.replace('px','');
					left-=(-blocksWidth);
					rock.style.left=left;
					index = levelBoxes.indexOf(nextPlace);
					levelBoxes[index]=nextPlace2;
					var wanted = document.querySelectorAll(".box")[index];
					left = wanted.style.left;
					left=left.replace('px','');
					left-=(-blocksWidth);
					wanted.style.left=left;
					if(levelBoxes[index]==holes[levelIndex][index]){
						wanted.firstChild.children[0].style.backgroundColor="darkblue";
					}else{
						wanted.firstChild.children[0].style.backgroundColor="yellow";
					}
					checkFinished();
				}
			}
		}else if(e.keyCode==40||e.keyCode==83){
			var rockNum =levelRocks[0];
			var rock = document.querySelector(".rock");
			nextPlace = rockNum+widthes[levelIndex];
			checkRockCollision();
			if(boxOrWall==0){
				levelRocks[0]=rockNum+widthes[levelIndex];
				var top = rock.style.top;
				top=top.replace('px','');
				top-=(-blocksHeight);
				rock.style.top=top;
			}else if(boxOrWall==2){
				return;
			}else{
				nextPlace2=nextPlace+widthes[levelIndex];
				checkBoxCollision();
				if(boxOrWall==0){
					checkRockCollision();
					levelRocks[0]=rockNum+widthes[levelIndex];
					var top = rock.style.top;
					top=top.replace('px','');
					top-=(-blocksHeight);
					rock.style.top=top;
					index = levelBoxes.indexOf(nextPlace);
					levelBoxes[index]=nextPlace2;
					var wanted = document.querySelectorAll(".box")[index];
					top = wanted.style.top;
					top=top.replace('px','');
					top-=(-blocksHeight);
					wanted.style.top=top;
					if(levelBoxes[index]==holes[levelIndex][index]){
						wanted.firstChild.children[0].style.backgroundColor="darkblue";
					}else{
						wanted.firstChild.children[0].style.backgroundColor="yellow";
					}
					checkFinished();
				}
			}
		}
	}
	/************/
	var boxViewer=document.createElement("div");
	boxViewerDivMain=boxViewer;
	boxViewer.classList.add("boxViewer")
	var boxHeader=document.createElement("div");
	boxHeader.classList.add("boxHeader");
	boxHeader.textContent="box description:";
	var boxDescription=document.createElement("span");
	boxDescription.classList.add("boxDescription")
	boxViewerdiv=boxDescription;
	boxViewer.appendChild(boxHeader);
	boxViewer.appendChild(boxDescription);
	/*************/
	var holeViewer=document.createElement("div");
	holeViewerDivMain=holeViewer;
	holeViewer.classList.add("holeViewer")
	var holeHeader=document.createElement("div");
	holeHeader.classList.add("holeHeader");
	holeHeader.textContent="hole description:";
	var holeDescription=document.createElement("span");
	holeDescription.classList.add("holeDescription");
	holeViewerdiv=holeDescription;
	holeViewer.appendChild(holeHeader);
	holeViewer.appendChild(holeDescription);
	/*************/
	resetButton=document.createElement("div");
	resetButton.classList.add("resetButton");
	resetButton.textContent="Reset current level";
	resetButton.style.top=(arrowLeft.style.top).replace('px','')-(-9);/*((grid.style.height).replace('px',''))*/
	resetButton.onclick=function(){
		boxesNum = levelBoxes.length;
		var boxesToRemove = document.querySelectorAll(".box");
		for(i=boxesNum-1;i>=0;i=i-1){
			boxesToRemove[i].remove();
		}
		for(i=0;i<boxes[levelIndex].length;i=i+1){
			levelBoxes.pop();
		}
		for(i=0;i<boxes[levelIndex].length;i=i+1){
			levelBoxes.push(boxes[levelIndex][i]);
		}
		for(i=0;i<boxesNum;i=i+1){
			var box =document.createElement("div");
			box.classList.add("box");
			box.style.width=blocksWidth;
			box.style.height=blocksHeight;
			container =document.createElement("div");
			container.classList.add("container");
			var background =document.createElement("div");
			background.classList.add("background");
			var leftUp =document.createElement("div");
			leftUp.classList.add("leftUp");
			var leftdown =document.createElement("div");
			leftdown.classList.add("leftdown");
			var up =document.createElement("div");
			up.classList.add("up");
			var down =document.createElement("div");
			down.classList.add("down");
			var right =document.createElement("div");
			right.classList.add("right");
			var left =document.createElement("div");
			left.classList.add("left");
			var upright =document.createElement("div");
			upright.classList.add("upright");
			var upleft =document.createElement("div");
			upleft.classList.add("upleft");
			var downright =document.createElement("div");
			downright.classList.add("downright");
			var downleft =document.createElement("div");
			downleft.classList.add("downleft");
			container.appendChild(background);
			container.appendChild(leftUp);
			container.appendChild(leftdown);
			container.appendChild(up);
			container.appendChild(down);
			container.appendChild(right);
			container.appendChild(left);
			container.appendChild(upright);
			container.appendChild(upleft);
			container.appendChild(downright);
			container.appendChild(downleft);	
			var boxNum = levelBoxes[i]-1,
				boxNumV=Math.floor(boxNum/width),
				boxNumH=boxNum-boxNumV*width;
			box.style.top = boxNumV*blocksHeight;
			box.style.left = boxNumH*blocksWidth
			box.appendChild(container);
			grid.appendChild(box);	
		}
		boxesObjects=document.querySelectorAll(".box");
		for ( i=0;i<boxesObjects.length;i=i+1){
			boxesObjects[i].onmouseover=function(){
				var boxIndex /*= boxesObjects.indexOf(box)*/;
				for(i=0;i<boxesObjects.length;i=i+1){
					if(boxesObjects[i]==this){
						boxIndex=i;
						break;
					}
				}
				boxViewerdiv.textContent=boxInfo[levelIndex][boxIndex];
			}
		}
		rocksNum = levelRocks.length;
		var rocksToRemove = document.querySelectorAll(".rock");
		for(i=rocksNum-1;i>=0;i=i-1){
			rocksToRemove[i].remove();
		}
		for(i=0;i<rocks[levelIndex].length;i=i+1){
			levelRocks.pop();
		}
		for(i=0;i<rocks[levelIndex].length;i=i+1){
			levelRocks.push(rocks[levelIndex][i]);
		}
		for(i=0;i<rocksNum;i=i+1){
			var rock =document.createElement("div");
			rock.classList.add("rock");
			rock.style.width=blocksWidth;
			rock.style.height=blocksHeight;
			var main =document.createElement("div");
			main.classList.add("main");
			rock.appendChild(main);
			var rockNum = levelRocks[i]-1,
				rockNumV=Math.floor(rockNum/width),
				rockNumH=rockNum-rockNumV*width;
			rock.style.top = rockNumV*blocksHeight;
			rock.style.left = rockNumH*blocksWidth;
			grid.appendChild(rock);	
		}
	}
	/*************/
	document.body.appendChild(grid);
	document.body.appendChild(boxViewer);
	document.body.appendChild(holeViewer);
	document.body.appendChild(resetButton);
	boxesObjects=document.querySelectorAll(".box");
	for ( i=0;i<boxesObjects.length;i=i+1){
			boxesObjects[i].onmouseover=function(){
				var boxIndex /*= boxesObjects.indexOf(box)*/;
				for(i=0;i<boxesObjects.length;i=i+1){
					if(boxesObjects[i]==this){
						boxIndex=i;
						break;
					}
				}
				boxViewerdiv.textContent=boxInfo[levelIndex][boxIndex];
			}
	}
	holesObjects=document.querySelectorAll(".hole");
	for ( i=0;i<holesObjects.length;i=i+1){
			holesObjects[i].onmouseover=function(){
				var holeIndex /*= boxesObjects.indexOf(box)*/;
				for(i=0;i<holesObjects.length;i=i+1){
					if(holesObjects[i]==this){
						holeIndex=i;
						break;
					}
				}
				holeViewerdiv.textContent=holeInfo[levelIndex][holeIndex];
			}
	}
	}
function checkRockCollision(){
	var indexInArr = blocks[levelIndex].indexOf(nextPlace)
if(indexInArr!==-1){
	boxOrWall=2;
	index=indexInArr;
	return;
}else{
	indexInArr=levelBoxes.indexOf(nextPlace);
	if(indexInArr!==-1){
		boxOrWall=1;
		index=indexInArr;
		return;
	}
	boxOrWall=0;
	index=-1;
}
}
function checkBoxCollision(){
	var indexInArr = blocks[levelIndex].indexOf(nextPlace2)
if(indexInArr!==-1){
	boxOrWall=2;
	index=indexInArr;
	return;
}else{
	indexInArr=levelBoxes.indexOf(nextPlace2);
	if(indexInArr!==-1){
		boxOrWall=1;
		index=indexInArr;
		return;
	}
	boxOrWall=0;
	index=-1;
}
}
function decreaseTime(){
	timerS=timerS-1;
	if(timerS<0)
		{
			timerS+=60;
			timerM-=1;
			if(timerM<0){
				clearInterval(tI1);
				return;
			}
		}
	var stringM,
		stringS;
	if(timerM<10){
		stringM='0'+timerM;
	}else{
		stringM=timerM;
	}
	if(timerS<10){
			stringS='0'+timerS;
	}else{
			stringS=timerS;
		}
	stringS=":"+stringS;
	minutesDiv.textContent=stringM;
	secondsDiv.textContent=stringS;
}
function checkFinished(){
	for(i=0;i<levelBoxes.length;i=i+1){
		if(levelBoxes[i]!==holes[levelIndex][i]){
			return;
		}
	}
	clearInterval(tI1);
	if(timerM!=0 || timerS!=0){
		scoreValue=scoreValue+timerM+1;
	}
	updateScore();
	drawQuestion();
}
function removeLastLevel(){
	header.remove();
	arrowUp.remove();
	arrowDown.remove();
	arrowRight.remove();
	arrowLeft.remove();
	grid.remove();
	questionHolder.remove();
	resetButton.remove();
	levelRocks=[];
	levelBoxes=[]
}
function drawQuestion(){
	questionHolder = document.createElement("div");
	questionHolder.classList.add("questionHolder");
	container = document.createElement("div");
	container.classList.add("container");
	var question = document.createElement("div");
	question.classList.add("question");
	question.textContent=questions[levelIndex];
	var number = document.createElement("span");
	number.classList.add("number");
	number.textContent="("+questionMarks[levelIndex]+"marks)";
	question.appendChild(number);
	var choice1 = document.createElement("div");
	choice1.classList.add("choice1");
	choice1.classList.add("choice");
	choice1.textContent=choices1[levelIndex];
	var choice2 = document.createElement("div");
	choice2.classList.add("choice2");
	choice2.classList.add("choice");
	choice2.textContent=choices2[levelIndex];
	var choice3 = document.createElement("div");
	choice3.classList.add("choice3");
	choice3.classList.add("choice");
	choice3.textContent=choices3[levelIndex];
	var choice4 = document.createElement("div");
	choice4.classList.add("choice4");
	choice4.classList.add("choice");
	choice4.textContent=choices4[levelIndex];
	container.appendChild(question);
	container.appendChild(choice1);
	container.appendChild(choice2);
	container.appendChild(choice3);
	container.appendChild(choice4);
	questionHolder.appendChild(container);
	document.body.appendChild(questionHolder);
	var choices=document.querySelectorAll(".choice");
	var rightChoice = rightChoices[levelIndex];
	for(i=0;i<choices.length;i=i+1){
		choices[i].onclick=function(){
			var answer = document.createElement("div");
			if(rightChoice==this.textContent){
				answer.textContent="Right Answer";
				answer.classList.add("rightAnswer");
				scoreValue+=questionMarks[levelIndex];
				updateScore();
			}else{
				answer.textContent="Wrong Answer";
				answer.classList.add("wrongAnswer");
			}
			container.appendChild(answer);
			setTimeout(afterAnswer,1000);
			return;
		}
	}
	resetButton.onclick=null;
	window.onkeyup=null;
	arrowUp.onclick=null;
	arrowDown.onclick=null;
	arrowRight.onclick=null;
	arrowLeft.onclick=null;
}
function afterAnswer(){
	scoreValue+=levelMarks[levelIndex];
	updateScore();
	levelNum++;
	levelIndex++;
	if(levelNum<=boxes.length){
		removeLastLevel();
		drawLevel();
	}
	else
	{
		container.remove();
		container =document.createElement("div");
		container.classList.add("container");
		var yourScore =document.createElement("div");
		yourScore.classList.add("yourScore");
		yourScore.textContent="your final score:";
		var yourScoreValue =document.createElement("div");
		yourScoreValue.classList.add("yourScoreValue");
		yourScoreValue.textContent=scoreValue;
		container.appendChild(yourScore);
		container.appendChild(yourScoreValue);
		questionHolder.appendChild(container);
	}
}
function updateScore(){
	num.textContent=scoreValue;
}