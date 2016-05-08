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
	var images = [
		'ludyssee.jpg',
		'dobble.png',
		'dobble.gif',
		'camemberts.jpg',
		'boring-stunning.jpg',
		'team.jpg',
		'diverse-team.jpg',
		'happy-project-team.jpg',
		'cadre.jpg',
		'echecs2.jpg',
		'soirees-jeux.jpg',
		'coopaname-5-avril.jpg',
		'reseaux-pro.jpg',
		'reaction-en-chaine.jpg',
		'reaction-en-chaine2.jpg',
		'panama-papers.jpg',
		'coopaname-ceas.png',
		'prospects.jpg',
		'we-need-you.jpg',
	];

	// Slides creation
	for (var i=0; i<images.length; i++) {
		slide = '<div class="step slide" data-x="' + (size.w*2+200)*(i%4) + '" data-y="'+ ((size.h*2)*Math.floor(i/4) - 400) +'">';
		slide += '<img src="img/' + images[i] + '"/>';
		slide += '</div>';
		nodes.temp = document.createElement('div');
		nodes.temp.innerHTML = slide;
		nodes.root.appendChild(nodes.temp.childNodes[0]);
		delete nodes.temp;
	}

	// add a final overview
	slide = '<div id="overview" class="step" data-x="' + (size.w*2+200)*1.5 + '" data-y="'+ (size.h+200)*2 +'" data-scale="10">';
	slide += '<h1>Merci&nbsp;!</h1>';
	slide += '</div>';
	nodes.temp = document.createElement('div');
	nodes.temp.innerHTML = slide;
	nodes.root.appendChild(nodes.temp.childNodes[0]);
	delete nodes.temp;

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

	// When slide is changed, restart the gif animation if needed
	nodes.root.addEventListener('impress:stepleave', function(e){
		// get the next slide
		var next = nodes.root.querySelector('.active:not(.present)');
		if( next && next.childNodes.length && next.childNodes[0].src.substr(-3,3) == 'gif' ){
			var src = next.childNodes[0].src;
			next.childNodes[0].src = "";
			next.childNodes[0].src = src;
		}
	});
	nodes.root.addEventListener('impress:stepenter', function(e){
		if( e.target.childNodes.length && e.target.childNodes[0].src.substr(-3,3) == 'gif' ){
			var src = e.target.childNodes[0].src;
			e.target.childNodes[0].src = "";
			e.target.childNodes[0].src = src;
		}
	});

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
