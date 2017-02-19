/*! jQuery JSON plugin v2.5.1 | github.com/Krinkle/jquery-json */
!function($){"use strict";var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},hasOwn=Object.prototype.hasOwnProperty;$.toJSON="object"==typeof JSON&&JSON.stringify?JSON.stringify:function(a){if(null===a)return"null";var b,c,d,e,f=$.type(a);if("undefined"===f)return void 0;if("number"===f||"boolean"===f)return String(a);if("string"===f)return $.quoteString(a);if("function"==typeof a.toJSON)return $.toJSON(a.toJSON());if("date"===f){var g=a.getUTCMonth()+1,h=a.getUTCDate(),i=a.getUTCFullYear(),j=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),m=a.getUTCMilliseconds();return 10>g&&(g="0"+g),10>h&&(h="0"+h),10>j&&(j="0"+j),10>k&&(k="0"+k),10>l&&(l="0"+l),100>m&&(m="0"+m),10>m&&(m="0"+m),'"'+i+"-"+g+"-"+h+"T"+j+":"+k+":"+l+"."+m+'Z"'}if(b=[],$.isArray(a)){for(c=0;c<a.length;c++)b.push($.toJSON(a[c])||"null");return"["+b.join(",")+"]"}if("object"==typeof a){for(c in a)if(hasOwn.call(a,c)){if(f=typeof c,"number"===f)d='"'+c+'"';else{if("string"!==f)continue;d=$.quoteString(c)}f=typeof a[c],"function"!==f&&"undefined"!==f&&(e=$.toJSON(a[c]),b.push(d+":"+e))}return"{"+b.join(",")+"}"}},$.evalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){return eval("("+str+")")},$.secureEvalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered))return eval("("+str+")");throw new SyntaxError("Error parsing JSON, source is not valid.")},$.quoteString=function(a){return a.match(escape)?'"'+a.replace(escape,function(a){var b=meta[a];return"string"==typeof b?b:(b=a.charCodeAt(),"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16))})+'"':'"'+a+'"'}}(jQuery);

$(document).ready(function() {

	$('#city').change(function(event) {
		
		if ($(this).val() === 'izh') {
			setTimeout(function() {
		       window.location.href = "http://propodborauto.ru/izhevsk/"
		      }, 500);
		} else if ($(this).val() === 'krasnodar') {
			setTimeout(function() {
		       window.location.href = "http://propodborauto.ru/krasnodar/"
		      }, 500);
		} else {
			setTimeout(function() {
		       window.location.href = "http://propodborauto.ru"
		      }, 500);
		}

	});
	
	// $(".js-select").select2();

	file = '../site/models-json.json';
    $.ajax({
        url: file,
        //force to handle it as text
        cashe: true,
        dataType: "text",
        success: function(data) {
            
            //data downloaded so we call parseJSON function 
            //and pass downloaded data
            var json = $.parseJSON(data);
            //now json variable contains data in json format
            //let's display a few items
            /*$('#results').html('Plugin name: ' + json.name + '<br />Author: ' + json.author.name);*/


            $.each(json, function(key, val) {
			   $('.select-car-mark').append('<option value="'+val.optionValue+'">'+val.optionTitle+'</option>');
			});
        }
    });

    $('.select-car-mark').on('change', function() {
    	console.log('yep!');
    	thisValue = $(this).val();
    	if (thisValue != "" && thisValue != "Другое") {
    		$('.select-car-model').prop({
    			disabled: false,
    		});
    		$.ajax({
		        url: file,
		        //force to handle it as text
		        cashe: true,
		        dataType: "text",
		        success: function(data) {
		            
		            //data downloaded so we call parseJSON function 
		            //and pass downloaded data
		            var json = $.parseJSON(data);
		            //now json variable contains data in json format
		            //let's display a few items
		            /*$('#results').html('Plugin name: ' + json.name + '<br />Author: ' + json.author.name);*/


		            $.each(json, function(key, val) {
		            	if (val.optionValue == thisValue) {
		            		var modelsData = val.models;
		            	
		            		$('.select-car-model').val('Модель');
		            		$('.select-car-model + .select2').find('.select2-selection__rendered').text('Модель');
		            		$('.select-car-model').html('<option value="">Модель</option><option value="Другое">Другое</option>');
		            		$.each(modelsData, function(key2, val2) {
		            		 	$('.select-car-model').append('<option value="'+val2.optionValue+'">'+val2.optionTitle+'</option>');
		            		});
		            		
		            	}
					});
		        }
		    });
    	}else {
    		$('.select-car-model').prop({
    			disabled: true,
    		});
    	}
    });


	/*$('.s-reviews2').resizecrop({
	      width:283,
	      height:273,
	      vertical:"center"
    });*/

    $(".feedback-carousel").owlCarousel({
 
	      loop:true,
	      margin:50,
	      nav:false,
	      dots: true,
	      stagePadding: 0,
	      autoplay:true,
	      autoplayTimeout:7000,
	      autoplayHoverPause:true,
	      autoplaySpeed: 1000,
	      items: 1
	 
	  });

});