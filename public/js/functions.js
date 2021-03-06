var static_images = [
		'/images/Hova.png',
		'/images/Smoke.gif'
	], 
	wordList = [],
	leftOver = [],
	colors = [
		'#d70000',
		'#ff9000',
		'#ffd200',
		'#69e000',
		'#691ea2',
		'#000000',
		'#d80089',
		'#00cdb2',
		'#000a6b',
		'#ff0000'
	];

if(Modernizr.audio.mp3) {
	var audio = [
		'/audio/audio_1.mp3',
		'/audio/audio_2.mp3',
		'/audio/audio_3.mp3',
		'/audio/audio_4.mp3',
		'/audio/audio_5.mp3'
	];
} else {
	var audio = [
		'/audio/audio_1.ogg',
		'/audio/audio_2.ogg',
		'/audio/audio_3.ogg',
		'/audio/audio_4.ogg',
		'/audio/audio_5.ogg'
	];
}

$.getJSON('/get_word', function(words) {
	words.forEach(function(word) {
		wordList.push(word.word);
		leftOver.push(word.word);
	});
	soundInit(function(ready){
		if(ready) {
			preload();
		}
	});
});

soundManager.setup({
	url: "/js/plugins/swf/",
	useHTML5Audio: true,
	preferFlash: false,
	flashVersion: 9,
	useHighPerformance: true,
	debugMode: false,
	debugFlash: false,
	flashLoadTimeout: 1000
});

function soundInit(callback) {
	soundManager.ontimeout(function(status) {
		soundManager.flashLoadTimeout = 0;
  		soundManager.onerror = {};
    	soundManager.reboot(); 
	});

	soundManager.onready(function() {
		callback(1);
	});
}

function shuffle(array){
	var counter = array.length, temp, index;
	
	while (counter > 0){
		index = (Math.random() * counter--) | 0;
		
		
		temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	
	return array;
}

function preload() {
	
	shuffle(colors);
	shuffle (audio);
	
	var wordIndex = Math.floor(Math.random()*leftOver.length);
	var word = leftOver[wordIndex];
	leftOver.splice(wordIndex, 1);
		
	var loader = new PxLoader();
	var audio_count = 1;
	
	//Audio
	audio.forEach(function(item){
		loader.add(new PxLoaderSound('track_'+audio_count,item));
		audio_count = audio_count + 1;
	});

	//Static Images	
	static_images.forEach(function(item) {
		loader.add(new PxLoaderImage(item));
	});
	
	loader.addCompletionListener(function(e) {
		$('.area-inner').scene(word);
	});
	
	loader.start();
};

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

$(document).ready(function() {
	$('.social').delay(2000).fadeTo(200,1);
});