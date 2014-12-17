//LFT-Project JS DOcument 

var parent = document.getElementById('body-container');
var light = document.getElementById('image');
var img = document.getElementById('imageto');
var lbox = new LightBox(parent,light);
lbox.init(parent,light);

function LightBox(parent, refImages){
	var that = this;
	this.parent = parent;
	this.opacityBackground;
	this.divContainer;
	this.imageView = refImages;
	this.cancelButton;
	this.init = function(){
		that.imageView.onclick = function(){
			that.opacityBackground = document.createElement("div");
			that.opacityBackground.className = "opacity-background";
			that.parent.appendChild(that.opacityBackground);
			
			that.divContainer = document.createElement("div");
			that.divContainer.className = "light-box";
			that.parent.appendChild(that.divContainer);
			
			var image = document.createElement("img");
			image.setAttribute("src",img.getAttribute('src'));
			that.divContainer.appendChild(image);
			
			that.cancelButton = document.createElement("div");
			that.cancelButton.className="cancel-button";
			that.parent.appendChild(that.cancelButton);
			
			
			that.cancelButton.onclick=function(){
				that.divContainer.removeChild(image);
				that.parent.removeChild(that.divContainer);
				that.parent.removeChild(that.opacityBackground);
				that.parent.removeChild(that.cancelButton);
			}
		}
		
		
		
		
		
		
		
		
	}
	
	
}



function LightBoxc(){
	this.zoomIcon = document.getElementById("image");
	this.parent = (document.getElementsByClassName("body-wrapper")[0]);
	var productImageLocation =  this.zoomIcon.parentNode.attributes.src.value;
	var that = this;
	this.init = function(){
		this.zoomIcon.onclick = function(){
			var productImageBackgroundDiv = document.createElement("div");
			productImageBackgroundDiv.className = "light-box-background";
			that.parent.appendChild(productImageBackgroundDiv);
			
			var productImageDiv = document.createElement("div");
			productImageDiv.className = "light-box";
			that.parent.appendChild(productImageDiv);
			
			var productImage = document.createElement("img");
			productImage.setAttribute("src",productImageLocation);
			(productImageDiv).appendChild(productImage);
			
			var crossButton = document.createElement("div");
			crossButton.className="light-box-cross-button";
			that.parent.appendChild(crossButton);
			
			crossButton.onclick=function(){
				that.parent.removeChild(productImageBackgroundDiv);
				that.parent.removeChild(productImageDiv);
				that.parent.removeChild(crossButton);
			}
						
			return false;
		}
	}
}
