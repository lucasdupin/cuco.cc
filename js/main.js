window.onload = function(){
	var currentProject = 0;
	document.getElementById('next').onclick = function(evt){
		evt.preventDefault()
		document.getElementById('content').src = PROJECTS[currentProject++];
	}
	document.getElementById('content').src = PROJECTS[currentProject++];
}

var shuffle = function(array) {
	var i, j, tmp, _i, _ref;
	for (i = _i = 0, _ref = array.length; _i < _ref; i = _i += 1) {
		j = Math.floor(Math.random() * (i + 1));
		tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
	return array;
};


PROJECTS = shuffle([
		"http://cuco.cc/projects/obeijo",
		"http://cuco.cc/projects/bailarinainfinita",
		"http://cuco.cc/projects/slot",
		"http://diarioaleatorio.co/"
])