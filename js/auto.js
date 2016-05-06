(function(window, document){
	var slide = '', time=0, timer;
	var nodes = {
		root : document.querySelector('#impress'),
		body : document.querySelector('body'),
		timer : document.querySelector('#img-timer')
	};
	var size = {
		w : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		h : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	};
	var api = impress();

	// image list
	var images = ['ludyssee.jpg', 'dobble.gif', 'camemberts.jpg', 'boring-stunning.jpg', 'team.jpg', 'cadre.jpg', 'echecs2.jpg', 'soirees-jeux.jpg'];

	// Slides creation
	for (var i=0; i<images.length; i++) {
		slide = '<div class="step slide" data-x="' + (size.w*2+200)*i + '" data-y="-'+ (size.h+200) +'">';
		slide += '<img src="img/' + images[i] + '"/>';
		slide += '</div>';
		nodes.temp = document.createElement('div');
		nodes.temp.innerHTML = slide;
		nodes.root.appendChild(nodes.temp.childNodes[0]);
		delete nodes.temp;
	}

	// wire up the play button
	nodes.timer.addEventListener('click', function(){
		if( nodes.timer.className == "") {
			nodes.timer.className = "play-btn";
			stopTimer();
		} else {
			nodes.timer.className = "";
			launchTimer();
		}
	});

	// Launch impress
	api.init();

	function launchTimer(){
		time = parseInt(nodes.timer.childNodes[0].innerHTML, 10);
		timer = setInterval(function(){
			time++;
			nodes.timer.childNodes[0].innerHTML = time;
			nodes.timer.dataset.progress = Math.floor( time/5 ) * 25;
			if(nodes.timer.dataset.progress == 100){
				api.next();
				time = 0;
			}
		}, 1000);
	}

	function stopTimer(){
		timer = clearInterval(timer);
	}
})(window, document);
