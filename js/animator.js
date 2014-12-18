// JavaScript Document
function Animator(){
	var that = this;
	this.element;
	this.element2;
	this.element3;
	this.props;
	this.duration;
	this.callback;
	this.intervalId;
	
	var frequency = 50;
	var counter = 0;
	this.ydirection=false;
	this.xdirection=false;
	var posi;
	var val=0;
	var numPlayers=2;
	var factor;
	
	this.animate = function(el,props,duration,clb_function,el2,el3){
		that.element = el;
		that.element2 = el2;
		that.element3 = el3;
		that.element.style.left = window.getComputedStyle(that.element,null).getPropertyValue("left");
		that.props = props;
		that.props.left = that.props.left;
		that.duration = duration;
		that.callback = clb_function;
		
		
		
		factor = that.props.left - parseFloat(that.element.style.left.split('px')[0]);
		that.element2.style.left = factor+'px';
		that.element3.style.left = -factor+'px';
		that.intervalId = setInterval(that.move, frequency);
	}	
	
	this.move = function(){
			counter++;
			if(counter > (that.duration/frequency)){
				clearInterval(that.intervalId);
				counter=0;
				that.callback();
			}else{
				
				var valleft = factor/(that.duration/frequency);
			
				that.element.style.left = parseFloat(that.element.style.left.split('px')[0]) +valleft + 'px';
				
				that.element2.style.left = parseFloat(that.element2.style.left.split('px')[0]) -valleft + 'px';	
				if(counter>(that.duration/frequency)/2){
					that.element3.style.left = parseFloat(that.element3.style.left.split('px')[0]) +(valleft*2) + 'px';	
				}
				
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

//module.exports = Animator;