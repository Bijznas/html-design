var t= new Tab();
t.init();


function Tab(){
	this.tabs = ((document.getElementsByClassName("tab-wrapper")[0]).children[0]).children;
	var that = this;
	
	this.init = function(){;
		for(var i=0; i<that.tabs.length;i++){
			that.tabs[i].onclick = (function(pos){				
				return function(){
					var clickedTab = that.tabs[pos];
					 if(clickedTab.className == ""){
						 for(var j=0; j<that.tabs.length; j++){
							 if(that.tabs[j].className == "active"){
								that.tabs[j].className = "";
								that.tabs[j].style.marginRight = "1px";
								that.tabs[j].style.marginLeft = "0px"; 
							}
						 }
						 clickedTab.className = "active";
						if(pos == that.tabs.length-1){
							 clickedTab.style.marginLeft = "2px";
						}else if(pos != 0){
							clickedTab.style.marginLeft = "2px";
							clickedTab.style.marginRight = "3px";
						}else{
							clickedTab.style.marginLeft = "1px";
							clickedTab.style.marginRight = "3px";
						}												 
					}
					return false;
				}
			})(i);
		}
	}	
}
