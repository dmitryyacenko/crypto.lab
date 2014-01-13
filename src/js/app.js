$(function(){
	var gui = require('nw.gui'),
		win = gui.Window.get(),
		closeApp = $('<span>').addClass('closeApp'),
		maximizeApp = $('<span>').addClass('maximizeApp'),
		minimizeApp = $('<span>').addClass('minimizeApp');

	$('body').append(closeApp, maximizeApp, minimizeApp);

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
});