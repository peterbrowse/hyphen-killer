var info = "Info: ";

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
    		var color = colors[Math.floor(Math.random()*colors.length)];
    		$('.container').css('background-color',color);
    	},
    	changeWord: function() {
    		var split_word = this.word.split("-");
    		var new_word = split_word[0]+"<span class='target'>-</span>"+split_word[1];
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
    			$('.area-inner').append('<div class="smoke"><img src="'+img_src+'" /></smoke>');
    			var position = $('span.target').position();
    			var font_size = parseInt($('span.target').css('line-height'), 10);
    			$('.smoke').css('left',(position.left - 80));
    			$('.smoke').css('top',(position.top - (200-(font_size/1.4))));
    			$('span.target').fadeTo(41,0);
    			$('.head').off('click');
    			track.play({
  					onfinish: function() {
    					var newWord = wordList[Math.floor(Math.random()*wordList.length)];
    					$('.area-inner').scene(newWord);
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