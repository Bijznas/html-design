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
	var speedAuto = 7000;
	var sliderSpeed = 1000;
	var no_indi;
	(this.indicator = function(){
		no_indi = document.getElementsByClassName("ind");
		var wrapper = document.createElement('div');
		wrapper.className="ind_wrapper";
		document.getElementById("slide").appendChild(wrapper);
		
		for(var i = 0; i<no_indi.length;i++){
			var indicator = document.createElement('div');
			indicator.className="indicator";
			indicator.id="indicator"+i;
			wrapper.appendChild(indicator);
			
			indicator.onclick=(function(pos){
				
				return function(){
					
					setIndicator(pos);
					clearInterval(that.intervalIds);
					runAuto();		
					currentPos = pos;
					if(animNext.element){
						animNext.stops();
					}
					
					animNext.animate(slideUl, {marginLeft:-1*currentPos*widthImg}, sliderSpeed,currentPos, function(){console.log("Completed...");});
				}
				
			})(i);
					
		}
		
	})();
	
	var iss = document.getElementById('indicator0');
	iss.className = "indicator_sel";
	
	
	
	this.init = function(){
		slideUl = document.getElementById('ulslide');
		that.prevBut = document.createElement('div');
		that.nextBut = document.createElement('div');
		var parentSlider = document.getElementById("slide");
		
		that.prevBut.className="prev";
		that.nextBut.className="next";
		
		parentSlider.appendChild(that.prevBut);
		parentSlider.appendChild(that.nextBut);
				
		that.nextBut.onclick = function(){
			if(currentPos<no_indi.length-1){
				clearInterval(that.intervalIds);
				runAuto();
					
				currentPos++;
				setIndicator(currentPos);
				if(animNext.element){
					animNext.stops();
				}
					
				animNext.animate(slideUl, {marginLeft:-1*currentPos*widthImg}, sliderSpeed,currentPos, function(){console.log("Completed...");});
			}
		}
		
		that.prevBut.onclick = function(){
			if(currentPos>0){
				clearInterval(that.intervalIds);
				runAuto();
				
				currentPos--;
				setIndicator(currentPos);
				if(animNext.element){
					animNext.stops();
				}	
				animNext.animate(slideUl, {marginLeft:-1*currentPos*widthImg}, 1000,currentPos, function(){console.log("Completed...");});
			}
		}
		runAuto();
		
		
		
		
	}
	setIndicator = function(pos){
		var sel_ind = document.getElementsByClassName("indicator_sel");
		sel_ind[0].className="indicator";
		document.getElementById("indicator"+pos).className="indicator_sel";
	}
	
	runAuto = function(){
		that.intervalIds = setInterval(function(){
			if(currentPos<3){		
				currentPos++;
				setIndicator(currentPos);
				if(animNext.element){
					animNext.stops();
				}
					
				animNext.animate(slideUl, {marginLeft:-1*currentPos*widthImg}, 1000,currentPos, function(){console.log("Completed...");});
			}else{
				setIndicator(0);
				currentPos = 0;
				
				if(animNext.element){
					animNext.stops();
				}	
				animNext.animate(slideUl, {marginLeft:-1*currentPos*widthImg}, 500,currentPos, function(){console.log("Completed...");});
			}
			
			
		}, speedAuto);
		
	}
	
}





//Animation class

function Animator(){
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
