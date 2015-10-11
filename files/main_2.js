/*
AUTHOR   : SimplePixel
URL      : http://themeforest.net/user/SimplePixel
TEMPLATE : Nagi - Coming Soon Template
VERSION  : 1.0

TABLE OF CONTENTS
1.0 TEMPLATE SETTINGS
2.0 FUNCTIONS
3.0 window.resize FUNCTION
4.0 window.load FUNCTION
	4.1 activate word rotator plugin
5.0 window.scroll FUNCTION
6.0 document.ready FUNCTION
	6.1 change menu sequence
	6.2 subscribe button clicked
	6.3 close subscribe button clicked
	6.4 to-countdown button clicked
	6.5 to-home button clicked
	6.6 menu button clicked
	6.7 menu list clicked
	6.8 activate slideshow background using backstretch
	6.9 activate slideshow background with kenburns effect
	6.10 activate single image background + particleground effect
	6.11 activate single image background + star effect (constellation)
	6.12 activate YouTube video background
	6.13 activate self hosted video background
	6.14 activate counter-up for statistic in service section
	6.15 activate countdown
	6.16 activate magnific popup image gallery
	6.17 init carousel for portfolio
	6.18 init carousel for services
	6.19 validate and submit subscribe form
	6.20 validate and submit contact us form
*/

(function($) {
	"use strict";
	
	/*-- ================================ --
		1.0 TEMPLATE SETTINGS
	/*-- ================================ --*/
	$.bg_type = 2;
	/*
	* 1. Backstretch slideshow background
	* 2. Slideshow background with Kenburns Effect
	* 3. Single image background + particleground effect
	* 4. Single image background + star effect (constellation)
	* 5. YouTube video background
	* 6. Self hosted video background
	*/
	$.launch_date = [7,9,2016];											//-- launch date [d,m,yyyy], for example 7 September 2016 : [7,9,2016]
	$.bg_urls = ["img/slideshow/sample3.jpg","img/slideshow/sample4.jpg"];
	$.youtube_url = "";													//-- just the last words after https://www.youtube.com/watch?v=
	$.self_host_video_path = "";										//-- self hosted video path
	$.self_host_video_filename = "";									//-- self hosted video filename "WITHOUT .MP4 EXTENSION"
	$.enable_tilt_effect = false;										//-- enabling tilt effect on "main title"
	$.enable_wordrotator = true;										//-- enabling wordrotator on "main title"
	$.wordrotator_words = ['<span class="">We have </span>  <br> <span class="highlight">moved </span>to <br> a new<br><span class="highlight">venture </span>', 'Stay<br><span class="highlight">Tuned! </span>'];	//-- Array of words, for main title
	
	
	/*-- ================================ --
		2.0 FUNCTIONS
	/*-- ================================ --*/
	function AdjustHomeSectionPos(){
		if($(window).width() < 768){
			$('.home-section').css({
				marginTop:'80px'
			});
			$('.home-section .intro').css({
				marginTop:0
			});
		}
		else{
			$('.home-section').css({
				marginTop:0
			});
		}
	}
	function SetSkillProgressBar(init){
		$('.skill-container').find('.progress-bar-skill span').each(function(index, element) {
			if(init){
				$(this).css({
					width:$(this).attr('data-percent')
				});
			}
			else{
				$(this).css({
					width:'0%'
				});
			}
        });
	}
	function TiltEffect(){
		var center_pos_x = $(window).width()/2;
		var max_degree = 10;
		
		$('.home-section').on('mousemove',function(e){
			//-- get cursor distance
			var distance = e.pageX - center_pos_x;
			var tilt_degree = (distance/(center_pos_x-max_degree))*max_degree;
			
			//-- tilt the home-section text
			$('.home-section .intro, .home-section .countdown').css({
				transform:'rotate3d(0, 1, 0, '+tilt_degree+'deg)'
			});
		});
	}
	function ChangeMenuSequence(){
		//-- execute this function only on extra small devices
		if($(window).width() < 768){
			$('.menu-home').insertBefore('.menu-contact');
			$('.menu-about').insertBefore('.menu-contact');
			$('.menu-service').insertBefore('.menu-contact');
			
			//-- change countdown sequence
			$('.hours_dash .dash_title').insertAfter('.hours_dash .digit:last-child');
		}
	}
	
	/*-- ================================ --
		3.0 window.resize FUNCTION
	/*-- ================================ --*/
	$(window).resize(function(e) {
		//-- adjust home-section position
		AdjustHomeSectionPos();
		
		//-- re-initialize owl carousel
		var re_init_carousel = setTimeout(function(){
			var owl_portfolio = $(".portfolio-container").data('owlCarousel');
			owl_portfolio.reinit({
				singleItem:true,
				navigation:false,
				pagination:false,
				transitionStyle : "fade"
			});
			
			var owl_service = $(".service-container").data('owlCarousel');
			owl_service.reinit({
				singleItem:true,
				navigation:false,
				pagination:false,
				transitionStyle : "fade"
			});
			
			clearTimeout(this);
		},1000);
	});
	//-- end window.resize function
	
	/*-- ================================ --
		4.0 window.load FUNCTION
	/*-- ================================ --*/
	$(window).load(function(e) {
		//-- hide preloader
		$('.preloader').addClass('is-hidden');
		
		//-- show home section
		var show_home = setTimeout(function(){
			$('.home-section').addClass('is-visible');
			$('nav.menu .icon-container').removeClass('entrance');
			
			//-- 4.1 activate word rotator plugin
			if($.enable_wordrotator){
				$("#wordsrotator").wordsrotator({
    				autoLoop: true,                  										//-- auto rotate words
    				randomize: false,                										//-- show random entries from the words array
    				stopOnHover: false,              										//-- stop animation on hover
    				changeOnClick: false,            										//-- force animation run on click
    				animationIn: "flipInY",          										//-- css class for entrace animation
    				animationOut: "fadeOut",        										//-- css class for exit animation
    				speed: 4000,               		 										//-- delay in milliseconds between two words
    				words: $.wordrotator_words  											//-- Array of words, it may contain HTML values
				});
			}
			
			clearTimeout(this);
		},500);
		
		//-- remove entrance class
		var remove_entrance = setTimeout(function(){
			$('.home-section').removeClass('entrance');
			
			clearTimeout(this);
		},2500);
    });
	//-- end window.load function
	
	/*-- ================================ --
		5.0 window.scroll FUNCTION
	/*-- ================================ --*/
	$(window).scroll(function(e) {
		
    });
	//-- end window.scroll function
	
	
	/*-- ================================ --
		6.0 document.ready FUNCTION
	/*-- ================================ --*/
	$(document).ready(function(e) {
		//-- 6.1 change menu sequence
		ChangeMenuSequence();
		
		//-- 6.2 subscribe button clicked
		$('.subscribe-button').on('click',function(){
			$('.subscribe-popup').addClass('is-visible');
		});
		
		//-- 6.3 close subscribe button clicked
		$('.close-subscribe').on('click',function(){
			$('.subscribe-popup').removeClass('is-visible');
		});
		
		//-- 6.4 to-countdown button clicked
		$('.to-countdown').on('click',function(){
			if($(window).width() < 768){
				$('.home-section .intro').css({
					marginTop:-($('.home-section .intro').height()+130)
				});	
			}
			else{
				$('.home-section').css({
					marginTop:-($(window).height())
				});
			}
		});
		
		//-- 6.5 to-home button clicked
		$('.to-home').on('click',function(){
			if($(window).width() < 768){
				$('.home-section .intro').css({
					marginTop:0
				});	
			}
			else{
				$('.home-section').css({
					marginTop:'0%'
				});
			}
		});
		
		//-- 6.6 menu button clicked
		$('nav.menu .icon-container').on('click',function(){
			if($(this).hasClass('open')){
				$(this).removeClass('open');
			}
			else{
				$(this).addClass('open');
			}
		});
		
		//-- 6.7 menu list clicked
		$('.menu-list a').each(function(index, element) {
            $(this).on('click',function(){
				var current_section = $('.menu-list').find('.active').data('section');
				var next_section = $(this).data('section');
				
				//-- hide current section
				$('.menu-list').find('.active').removeClass('active');
				$('.'+current_section+'-section').removeClass('is-visible');
				
				//-- reset progress bar in about-section
				SetSkillProgressBar(false);
				
				//-- show next section
				$(this).addClass('active');
				$('.'+next_section+'-section').addClass('is-visible');
				
				if(next_section == "about"){
					//-- animate progress bar
					SetSkillProgressBar(true);
				}
				else if(next_section == "service"){
					//-- restart the counter
					$('.counter-up').countTo('restart');
				}
				
				//-- hide the menu list (only on extra small devices)
				if($(window).width() < 768){
					$('nav.menu .icon-container').trigger('click');
				}
			});
        });
		
		//-- 6.8 activate slideshow background using backstretch
		if($.bg_type == 1){
			$(".bg-container").backstretch($.bg_urls,{
				duration:6000,
				fade:'normal'
			});
		}
		//-- 6.9 activate slideshow background with kenburns effect
		else if($.bg_type == 2){
			var i=0;
			for(i;i<$.bg_urls.length;i++){
				var html_code = '<img src="'+$.bg_urls[i]+'" alt="bg-'+i+'" />';
				
				//-- append image to bg-container
				$('.bg-container').append(html_code);	
			}
			
			//-- activate kenburns
			$(".bg-container").kenburnsy({
        		fullscreen: true
        	});
		}
		//-- 6.10 activate single image background + particleground effect
		else if($.bg_type == 3){
			$(".bg-container").backstretch([
				$.bg_urls
			],{
				duration:6000,
				fade:'normal'
			});
			
			$('.bg-container').attr('id','bg-container');
			particleground(document.getElementById('bg-container'), {
    			dotColor: 'white',
    			lineColor: 'white',
				particleRadius: 3,
				lineWidth: 0.5,
				parallaxMultiplier: 10,
				density: 13000,
				minSpeedX: 0.5,
    			maxSpeedX: 1.0,
    			minSpeedY: 0.5,
    			maxSpeedY: 1.0
  			});
		}
		//-- 6.11 activate single image background + star effect (constellation)
		else if($.bg_type == 4){
			$(".bg-container").backstretch([
				$.bg_urls
			],{
				duration:6000,
				fade:'normal'
			});
			
			var canvas = '<canvas id="bg-canvas"> </canvas>';
			$('.bg-container').prepend(canvas);
			
			//-- init star effect
			if($(window).width() < 700){
					$('canvas').constellation({
					distance: 40
				});
			}
			else{
				$('canvas').constellation();
			}
		}
		//-- 6.12 activate YouTube video background
		else if($.bg_type == 5){
			//-- put the video to the body
			var vid_elem = '<a id="video" class="player" data-property="{videoURL:\''+$.youtube_url+'\',containment:\'.bg-container\', showControls:false, autoPlay:true, loop:true, mute:true, startAt:0, opacity:1, addRaster:false, quality:\'large\'}"></a>';
			
			$('body').prepend(vid_elem);
			
			//-- activate plugin
			if($(window).width() >= 1200){
				/*
				* Please note that this player doesn’t work as background for devices due to the restriction policy adopted by all on 
				* managing multimedia files via javascript. It fallsback to the default Youtube player if used as player (not applied to the body).
				*/
				
				$('.player').mb_YTPlayer();
			}
			else{
				$(".bg-container").backstretch([
					$.bg_urls
				],{
					duration:6000,
					fade:'normal'
				});
			}
		}
		//-- 6.13 activate self hosted video background
		else if($.bg_type == 6){
			var videobackground = new $.backgroundVideo($('.bg-container'), {
        		"align": "centerXY",
				"width": 1280,
        		"height": 720,
        		"path": $.self_host_video_path,
        		"filename": $.self_host_video_filename,
        		"types": ["mp4"]
      		});
		}
		
		//-- 6.14 activate counter-up for statistic in service section
		$('.counter-up').countTo();
		
		//-- activate tilt effect
		if($.enable_tilt_effect){
			TiltEffect();
		}
		
		//-- 6.15 activate countdown
		$('.countdown-container').countDown({
			targetDate: {
				'day': 		$.launch_date[0],
				'month': 	$.launch_date[1],
				'year': 	$.launch_date[2],
				'hour': 	0,
				'min': 		0,
				'sec': 		0
			},
			omitWeeks: true
		});
				
		//-- 6.16 activate magnific popup image gallery
        $('.popup-image').magnificPopup({ 
  			type: 'image',
			gallery: {
				enabled: true,
  				tPrev: 'prev',
  				tNext: 'next',
				tCounter: '%curr% / %total%'
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		//-- 6.17 init carousel for portfolio
		$.portfolio_carousel = $('.portfolio-container');
		$.portfolio_carousel.owlCarousel({
			singleItem:true,
			navigation:false,
			pagination:false,
			transitionStyle : "fade"
		});
		//-- portfolio carousel custom control
		$('.next-portfolio').on('click',function(){
			$.portfolio_carousel.trigger('owl.next');
		});
		$('.prev-portfolio').on('click',function(){
			$.portfolio_carousel.trigger('owl.prev');
		});
		
		//-- 6.18 init carousel for services
		$.service_carousel = $('.service-container');
		$.service_carousel.owlCarousel({
			singleItem:true,
			navigation:false,
			pagination:false,
			transitionStyle : "fade"
		});
		//-- services carousel custom control
		$('.next-service').on('click',function(){
			$.service_carousel.trigger('owl.next');
		});
		$('.prev-service').on('click',function(){
			$.service_carousel.trigger('owl.prev');
		});
		
		//-- 6.19 validate and submit subscribe form
		$('.subscribe-form').validate({
			rules: {
	        	EMAIL: {
	            	required: true,
	                email: true
	            }
	        },
			messages: {
				EMAIL: {
					required: "Please insert your email address",
					email: "Your email address is not valid"
				}
			},
			highlight: function(element, errorClass, validClass) {
				$(element).addClass('form-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass('form-error');
			},
			errorPlacement: function(error, element) {
    			
 			},
			submitHandler: function(form) {							
				var url_dest = $(form).attr('action');
				var form_data = $(form).serialize();
				var form_method = $(form).attr('method');
			
				//-- show loading
				$('.subscribe-notif').show().append('<label class="loading-subscribe">Please wait</label>');
				$('.loading-subscribe').fadeIn('fast');
			
				$.ajax({
					type: form_method,
	        		url: url_dest,
	        		data: form_data,
	        		cache : false,
	        		dataType : 'json',
	        		contentType: "application/json; charset=utf-8",
	        		error : function(err) { alert("Could not connect to the registration server. Please try again later."); },
	        		success : function(data) {
	            		if(data.result == "success"){
							//-- reset form
							$(form).trigger('reset');
							
							//-- set element to focusout and remove error class
							$('.subscribe-email').focusout();
							$(form).find('.form-error').removeClass('form-error');
					
							//-- hide loading
							$('.loading-subscribe').fadeOut('fast',function(){
								//-- show notif
								$('.subscribe-notif').append('<label class="subscribe-notif-success">Thank you for subscribing us.</label>');
								$('.subscribe-notif-success').fadeIn('fast').delay(5000).fadeOut('fast',function(){
									$(this).remove();
									$('.loading-subscribe').remove();
								});
							});
						}
						else{
							//-- reset form
							$(form).trigger('reset');
					
							//-- hide loading
							$('.loading-subscribe').fadeOut('fast',function(){
								//-- show notif
								$('.subscribe-notif').append('<label class="subscribe-notif-error">Error.</label>');
								$('.subscribe-notif-error').fadeIn('fast').delay(5000).fadeOut('fast',function(){
									$(this).remove();
									$('.loading-subscribe').remove();
								});
							});
						}
	        		}
				});
							
				return false;
			}
		});
		//-- end validate and submit subscribe form
		
		
		//-- 6.20 validate and submit contact us form
		$('.contact-form').validate({
			rules: {
	        	email: {
	            	required: true,
	                email: true
	            },
				name: {
	            	required: true
	            },
				message: {
	            	required: true
	            }
	        },
			highlight: function(element, errorClass, validClass) {
				$(element).addClass('form-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass('form-error');
			},
			errorPlacement: function(error, element) {
    			
 			},
			submitHandler: function(form) {
				var url_dest = $(form).attr('action');
				var form_data = $(form).serialize();
				
				//-- show loading
				$('.contact-notif').show().append('<label class="loading-contact">Please wait</label>');
				$('.loading-contact').fadeIn('fast');
			
				$.post(url_dest,form_data,function(data){
					var success = data;
					
					if(success){
						//-- reset form
						$(form).trigger('reset');
					
						//-- hide loading
						$('.loading-contact').fadeOut('fast',function(){
							//-- show notif
							$('.contact-notif').append('<label class="contact-notif-success">Thank you for contacting us. We will reply you shortly.</label>');
							$('.contact-notif-success').fadeIn('fast').delay(5000).fadeOut('fast',function(){
								$(this).remove();
								$('.loading-contact').remove();
							});
						});
					}
					else{
						//-- reset form
						$(form).trigger('reset');
						
						//-- hide loading
						$('.loading-contact').fadeOut('fast',function(){
							//-- show notif
							$('.contact-notif').append('<label class="contact-notif-error">Error.</label>');
							$('.contact-notif-error').fadeIn('fast').delay(5000).fadeOut('fast',function(){
								$(this).remove();
								$('.loading-contact').remove();
							});
						});
					}
				});
				
				return false;
			}
		});
		//-- end validate and submit contact us form
    });
	//-- end document.ready function
})(jQuery);