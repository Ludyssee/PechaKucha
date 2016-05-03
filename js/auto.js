(function(window, document){
	var nbImg = 4, slide = '', time=0, timer;
	var nodes = {
		root : document.querySelector('#impress'),
		body : document.querySelector('body'),
		timer : document.querySelector('#img-timer')
	};
	var size = {
		w : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		h : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	};
	var api = impress()

	// Slides creation
	for (var i=0; i<nbImg; i++) {
		slide = '<div class="step slide" data-x="' + (size.w*2+200)*i + '" data-y="-'+ (size.h+200) +'">';
		slide += '<img src="img/' + (i+1) + '.jpg"/>';
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

			if(time / 5 < 1){
				nodes.timer.style.borderColor = 'transparent';
			}
			if(time / 5 == 1){
				nodes.timer.style.borderTopColor = 'rgba(0,183,229,0.9)';
			}
			if(time / 5 == 2){
				nodes.timer.style.borderRightColor = 'rgba(0,183,229,0.9)';
			}
			if(time / 5 == 3){
				nodes.timer.style.borderBottomColor = 'rgba(0,183,229,0.9)';
			}
			if(time / 5 == 4){
				nodes.timer.style.borderLeftColor = 'rgba(0,183,229,0.9)';
				api.next();
				time = 0;
			}
		}, 1000);
	}

	function stopTimer(){
		timer = clearInterval(timer);
	}
})(window, document);
