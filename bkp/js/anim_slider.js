// JavaScript Document
var s = new Slider();
s.init();

function Slider(){
	that = this;
	var widthImg = 1008;
	var currentPos = 0;
	this.nextBut;
	this.prevBut;
	var animNext = new Animator();
	this.intervalIds;
	var slideUl;
	var speedAuto = 4000;
	var sliderSpeed = 1000;
	var no_indi;
	var no_images=0;
	var isSliding= false;
	var isDir= true;
	
	
	this.pinkDiv;
	this.textDiv;
	this.init = function(){
		var parentSlider = document.getElementById("slider_wrapper");
		slideUl = document.getElementById('slider_ul');
		no_images = slideUl.children.length;
		
		that.prevBut = document.createElement('div');
		that.nextBut = document.createElement('div');
		that.prevBut.className="prev";
		that.nextBut.className="next";
		parentSlider.appendChild(that.prevBut);
		parentSlider.appendChild(that.nextBut);
		
		that.pinkDiv = document.createElement('div');
		that.pinkDiv.className = 'pink-div';
		parentSlider.appendChild(that.pinkDiv);
		
		that.textDiv = document.createElement('div');
		that.textDiv.className = 'text-div';
		that.textDiv.innerHTML = slideUl.children[currentPos].children[0].getAttribute('label');
		parentSlider.appendChild(that.textDiv);
		
		
		that.slide();
	}
	
	
	this.slide = function(){
		
			
		that.nextBut.onclick = function(){
			if(currentPos<no_images-1 && !isSliding){
				//clearInterval(that.intervalIds);
				//runAuto();
				
				clearInterval(that.intervalIds);
				currentPos++;
				clickEvent();
			}
		}
		
		that.prevBut.onclick = function(){
			if(currentPos>0 && !isSliding){
				clearInterval(that.intervalIds);
				currentPos--;	
				clickEvent();
			}
			
			
		}
		
		
		
		function clickEvent(){
			isSliding= true;
			that.textDiv.innerHTML = slideUl.children[currentPos].children[0].getAttribute('label');
			if(currentPos==0){
				that.prevBut.style.background = "url('images/prev_disabled.png') no-repeat";
			}else if(currentPos==1){
				that.prevBut.style.background = "url('images/prev.png') no-repeat";
			}else if(currentPos==no_images-1){
				that.nextBut.style.background = "url('images/next_disabled.png') no-repeat";
			}else if(currentPos==no_images-2){
				that.nextBut.style.background = "url('images/next.png') no-repeat";
			}
			animNext.animate(slideUl, {left:-1*currentPos*widthImg}, sliderSpeed, function(){isSliding= false;},that.pinkDiv,that.textDiv);
		}
		runAuto(clickEvent);
		
		
		
		
	}
	setIndicator = function(pos){
		var sel_ind = document.getElementsByClassName("indicator_sel");
		sel_ind[0].className="indicator";
		document.getElementById("indicator"+pos).className="indicator_sel";
	}
	
	runAuto = function(clickEvent){
		that.intervalIds = setInterval(function(){
			if(isDir){		
				currentPos++;
				clickEvent();
			}else{	
				currentPos--;
				clickEvent();
			}
			
			
			if(currentPos==no_images-1){
				isDir= false;	
			}else if(currentPos==0){
				isDir= true;	
			}
			
			
		}, speedAuto);
		
	}
	
}





//Animation class

function Animators(){
	this.element;
	this.props;
	this.duration;
	this.callback;
	this.intervalId;
	that = this;
	var frequency = 50;
	var counter = 0;
	this.factor;
	this.cmargin=0;
	var val=0;
	this.animate = function(el,props,duration,pos,callback){
		that.element = el;
		that.props = props;
		that.duration = duration;
		that.callback = callback;
		that.factor = pos;
		//console.log(that.cmargin+"c");
		that.intervalId = setInterval(that.move, frequency);
		
	}	
	
	this.move = function(){
		
			
		if(that.cmargin>(that.factor*1008*-1)){
				
			if(val > that.props.marginLeft){
				counter++;
				val = that.cmargin+(that.props.marginLeft*counter*frequency)/(that.duration*that.factor);
				that.element.style.marginLeft = val+'px';
			}else{
				clearInterval(that.intervalId);
				counter=0;
				that.cmargin = parseInt(that.element.style.marginLeft.split('px')[0]);
			}
		}else{
			if(val < that.props.marginLeft){
				counter++;
				if(that.factor == 0){
					//console.log(((counter+1)*frequency)-100);
					val = that.cmargin+((counter*frequency)-(counter*5));
				}else{
					val = that.cmargin-(that.props.marginLeft*counter*frequency)/(that.duration*that.factor);
				}
					
				that.element.style.marginLeft = val+'px';
			}else{
				clearInterval(that.intervalId);
				counter=0;
				that.cmargin = parseInt(that.element.style.marginLeft.split('px')[0]);
			}
				
				
			that.element.style.marginLeft = val+'px';
		}
		
		
	}
	
	this.stops = function(){
		clearInterval(that.intervalId);
		counter=0;
		that.cmargin = parseInt(that.element.style.marginLeft.split('px')[0]);
	}
	
	this.finish = function(){
		that.element.style.marginLeft = that.props.marginLeft+'px';
		that.cmargin = that.props.marginLeft;
		//console.log(that.props.marginLeft+'px');
		clearInterval(that.intervalId);
	}
	
}
