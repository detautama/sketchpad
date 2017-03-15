//Grid starting dimension
var rows = 64;
var columns = 64;

//Check the box dimension
var mbWidth = parseFloat($('.magic-box').css('width'));
var mbHeight = parseFloat($('.magic-box').css('height'));

//Color settings
var startColor = "#C9C9C9";
var usedColor = "yellow";

//Operating variables
var clicked = false;
var rand = false;
var eraser = false;
var temp = usedColor;

//Set the size of the pixel
//based on the current size of the Grid
var setFields = function(r,c){
  var boxWidth = (mbWidth / c) +'px';
  var boxHeight = (mbHeight / c) +'px';
  $('.magic-field').css('width', boxWidth);
	$('.magic-field').css('height', boxHeight);
}

// Generate the grid and set base color
var createBox = function (rows, columns) {
	$('div.magic-field').remove();
	var i;
	var boxes = columns * rows
	for (i = 0; i < boxes; i++) {
		$('.magic-box').append('<div class="magic-field"></div>');
	}
}

// Clean the grid
var reset = function () {
	$('.magic-field').css('background-color', startColor);
}

// Change the color of pixels you move the cursor
// when the mouse button is pressed
var paintFields = function (color) {
  	$('.magic-box').on('mouseover', 'div', function() {
        if(clicked) {
        	// Random color functionality
        	if (rand) {
        		$(document).mousemove(function() {
					color = random();
				});
        	}
            $(this).css('background-color', color);
        }
    })
}



$(document).ready(function() {
	// variable needed to trigger painting on click
	$(document).mousedown(function() {
		clicked = true;
	}).mouseup(function() {
		clicked = false;
	});

	$('.colors button').click(function() {
		erase = false;
		rand = false;
		$('.eraser').removeClass('active');
		$('.random').removeClass('active');
		paintFields(usedColor);
	});


	$('.random').on('click', function () {
		if (!rand) {
			usedColor = random();
			erase = false;
			$('.eraser').removeClass('active');
			rand = true;
			$(this).addClass('active');
		} else {
			rand = false;
			paintFields(temp);
			$(this).removeClass('active');
		}
	});

	$('.eraser').on('click', function () {
		if (!erase) {
			rand = false;
			$('.random').removeClass('active');
			erase = true;
			paintFields(usedColor);
			$(this).addClass('active');
		} else {
			erase = false;
			paintFields(temp);
			$(this).removeClass('active');
		}
	});


	createBox(rows, columns);
	paintFields(usedColor);
	setFields(rows, columns);
})