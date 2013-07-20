var info = "Info: ", count = 0;

(function ($) {
    "use strict";
    
    function Scene(element, word, settings) {
    	this.element = element;
    	this.word = word;
    	this.settings = settings;
        
        this.init();

        return this;
    };
    
    Scene.prototype = {
    	init: function () {
	
    		this.changeSound();
    		this.changeColor();
    		this.changeWord();
    	},
       	changeColor: function() {
   	      	if (count >= colors.length) {
   	      		count = 0;
	    	}	
			$('.container').css('background-color',colors[count]);    		
	   		count++;
    	},
    	changeWord: function() {
    		var new_word = this.word.replace(/-/g,'<span class="target">-</span>');
    		$('.target-word').html(new_word);
    	},
    	changeSound: function() {
    		var randomTrack = Math.floor(Math.random() * 5) + 1;
    		var track = soundManager.getSoundById('track_'+randomTrack);
    		
    		$('.head').off('click');
    		$('.head').on('click', function() {
    			ga('send', 'event', 'User Click', 'Killed Hyphen', 'Head Clicked');
    			var img_src = '/images/Smoke.gif';
    			img_src = img_src.replace(/\?.*$/,"")+"?x="+Math.random();
    			var smoke_count = 1;
    			$('span.target').each(function() {
	    			$('.area-inner').append('<div id="smoke_'+smoke_count+'" class="smoke"><img src="'+img_src+'" /></smoke>');
					var position = $(this).position();
					var font_size = parseInt($('span.target').css('line-height'), 10);
					$('#smoke_'+smoke_count).css('left',(position.left - 80));
					$('#smoke_'+smoke_count).css('top',(position.top - (200-(font_size/1.4))));
					smoke_count++;	
    			});
    			
    			$('span.target').fadeTo(41,0);
    			$('.head').off('click');
    			track.play({
  					onfinish: function() {												
						var wordIndex = Math.floor(Math.random()*leftOver.length);
    					var newWord = leftOver[wordIndex];
																	
    					$('.area-inner').scene(newWord);
						leftOver.splice(wordIndex, 1);
						
						if (leftOver.length == 0){
							wordList.forEach(function(word){
								leftOver.push(word);
							});
						}
  					}
				});
				setTimeout(function() {
					$('.smoke').remove();
				}, 1000);
    		});
    	}
    };
    
    $.fn.scene = function (word, options) {
    	var settings = $.extend({}, word, options);
    	return new Scene(this, word, settings);
    };
}(jQuery));
