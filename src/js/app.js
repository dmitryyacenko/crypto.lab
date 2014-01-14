$(function(){
	var gui = require('nw.gui'),
		win = gui.Window.get(),
		closeApp = $('<span>').addClass('closeApp'),
		maximizeApp = $('<span>').addClass('maximizeApp'),
		minimizeApp = $('<span>').addClass('minimizeApp'),
		zoomIn = $('<span>').addClass('zoomIn'),
		zoomOut = $('<span>').addClass('zoomOut');

	$('body').append(closeApp, maximizeApp, minimizeApp, zoomIn, zoomOut);

	win.on('maximize', function() {
		if(maximizeApp.hasClass('maximizeApp'))
			maximizeApp.removeClass('maximizeApp');
		if(!maximizeApp.hasClass('unmaximizeApp'))
			maximizeApp.addClass('unmaximizeApp');
	});
	win.on('unmaximize', function() {
		if(maximizeApp.hasClass('unmaximizeApp'))
			maximizeApp.removeClass('unmaximizeApp');
		if(!maximizeApp.hasClass('maximizeApp'))
			maximizeApp.addClass('maximizeApp');
	});

	closeApp.on('click', function(){
		gui.App.quit();
	});
	maximizeApp.on('click', function(){
		if(maximizeApp.hasClass('maximizeApp'))
			win.maximize();
		else
			win.unmaximize();
	});
	minimizeApp.on('click', function(){
		win.minimize();
	});


	$(zoomIn).on('click', function(){
		if(win.zoomLevel < 1.5)
			win.zoomLevel += 0.5;
	});
	$(zoomOut).on('click', function(){
		if(win.zoomLevel > -1.5)
			win.zoomLevel -= 0.5;
	});
});