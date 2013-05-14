window.onload = function(){

	/**************
	Menu navigation
	***************/

	// About section
	document.getElementsByClassName('about')[0].onclick = function(){
		document.getElementById('about').style.display = 'block'
	}
	document.getElementsByClassName('close')[0].onclick = function(){
		document.getElementById('about').style.display = 'none';
	}

	// List of projects
	PROJECTS = []
	// Get them from the menu
	var p = document.getElementsByClassName('projects')[0].getElementsByTagName('a')
	var summaries = document.getElementsByClassName('projects')[0].getElementsByTagName('summary')
	for (var i = 0; i < p.length; i++) {
		PROJECTS.push(p[i].href);
		// Apply rotation
		transform(p[i], 'rotate(' + 360/p.length*i + 'deg)');
		
		// Flip
		if (i > p.length/4 && i < p.length/4*3){
			transform(p[i].getElementsByTagName('span')[0], 'rotate(180deg)');
			
			rotateSpan = document.createElement('span')
			rotateSpan.innerHTML = summaries[i].innerHTML
			transform(rotateSpan, 'rotate(180deg)');
			
			summaries[i].innerHTML = ""
			summaries[i].appendChild(rotateSpan)
			transform(summaries[i], 'rotate(' + (-360/p.length*i + 180) + 'deg)');
		} else {
			transform(summaries[i], 'rotate(' + -360/p.length*i + 'deg)');
		}
		// auto close on click
		p[i].onclick = function(){
			document.getElementById('about').style.display = 'none';
		}
	};

	/**************************
	Random project button
	**************************/
	var currentProject = 0;
	// Random project click
	document.getElementById('next').onclick = function(evt){
		evt.preventDefault()
		document.getElementById('content').src = PROJECTS[currentProject++%PROJECTS.length];
	}
	// Randomize first
	document.getElementById('content').src = PROJECTS[currentProject++];
}

function transform(el, val){
	el.style['-moz-transform'] =
	el.style['-webkit-transform'] =
	el.style['transform'] =
		val;
}