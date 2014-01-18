var gui = require('nw.gui'),
	path = require('path'),
	fs = require('fs'),

	win = gui.Window.get(),
	programPath = path.dirname(process.execPath);

$(function(){
	var closeApp = $('<span>').addClass('closeApp'),
		maximizeApp = $('<span>').addClass('maximizeApp'),
		minimizeApp = $('<span>').addClass('minimizeApp'),
		zoomIn = $('<span>').addClass('zoomIn'),
		zoomOut = $('<span>').addClass('zoomOut');

	// Запуск окна
	win.show();

	// Функции для дебага (вызов правым кликом)
	if(debugMode){
		var menu = new gui.Menu();

		// Пункты меню
		menu.append(new gui.MenuItem({ 
			label: 'Обновить',
			click: function() {
				win.reload();
			}
		}));
		menu.append(new gui.MenuItem({ 
			label: 'Скриншот',
			click: function() {
				win.capturePage(function(img){
					var base64Data = img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
						date = new Date(),
						dd = date.getMonth()+1; // Месяц
					    dd += ''+date.getDate(); // День
					    dd += ''+date.getHours(); // Час
					    dd += ''+date.getMinutes(); // Минута
					    dd += ''+date.getSeconds(); // Секунда
					fs.writeFile(programPath+'\\screenshot'+dd+'.png', base64Data, 'base64', function(err) {
						if(err){
							alert('Скриншот сделать не удалось');
						} else {
							alert('Скриншот сохранен по адресу:\n'+programPath+'\\screenshot'+dd+'.png');
						}
					});
				}, 'png');
			}
		}));
		menu.append(new gui.MenuItem({ 
			label: 'Консоль',
			click: function() {
				win.showDevTools();
			}
		}));
	
		$(document).mousedown(function(e){
			if( e.button == 2 ) {
			  menu.popup(e.clientX, e.clientY);
			  return false;
			}
			return true;
		}); 
	}

	// Вставка кнопок управления окном
	$('body').append(closeApp, maximizeApp, minimizeApp, zoomIn, zoomOut);




	/* ОБРАБОТЧИКИ */

	// Обработка развертывания окна
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

	// Обработка клика по кнопке закрытия окна
	closeApp.on('click', function(){
		win.close();
	});
	// Обработка клика по кнопке развертывания окна
	maximizeApp.on('click', function(){
		if(maximizeApp.hasClass('maximizeApp'))
			win.maximize();
		else
			win.unmaximize();
	});
	// Обработка клика по кнопке скрытия окна
	minimizeApp.on('click', function(){
		win.minimize();
	});

	// Обработка клика по кнопкам зума
	var zoomVal = 0;
	zoomIn.on('click', function(){
		if(win.zoomLevel < 1.5){
			zoomVal += 0.5;
			win.zoomLevel = [zoomVal];
		}
	});
	zoomOut.on('click', function(){
		if(win.zoomLevel > -1.5){
			zoomVal -= 0.5;
			win.zoomLevel = [zoomVal];
		}
	});
	/* /ОБРАБОТЧИКИ */
});