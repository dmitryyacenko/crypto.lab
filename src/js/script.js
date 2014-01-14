$(function(){
	var content = $('#content'),
		userName = '', // Имя пользователя
		userGroup = '', // Группа пользователя
		curPage = '',
		animSpeed = 600,
		allWindows = {},
		debugMode = true;

	if(debugMode){
		$('header').append(' (DEBUG mode)');
		userName = 'debugName';
		userGroup = 'debugGroup';

		// Главное окно
		getPage('main user', true);
	}
	else {
		// Окно логина
		getPage('login', true);
	}


	/* ОБРАБОТЧИКИ */
	// Залогиниться
	$('.login', content).on('click', 'input[type=submit]', function(){
		var parent = $(this).parent();
		if(authorization($('input[name=name]', parent), $('input[name=group]', parent))){
			// Главная страница
			getPage('main user', true);
		}
	});

	// Главная
	$('#navHome').on('click', function(){
		getPage('main user', true);
	});

	// Открыть файл
	$('#navFile').on('click', function(){
		getPage('file', true);
	});
	/* /ОБРАБОТЧИКИ */




	/* ФУНКЦИИ */
	function authorization(name, group){
		if(name.val().length < 5){
			name.addClass('error');
			name.focus();
			return false;
		}
		if(group.val().length < 1){
			group.addClass('error');
			group.focus();
			return false;
		}

		userName = name.val();
		userGroup = group.val();
		return true;
	}

	// Объект окна
	function myWindow(){
		this.className = '';
		this.content = '';
		this.title = '';
		this.styles = {
			position: 'absolute',
			backgroundColor: '#FFFFFF',
			boxShadow: '0 1px 0 1px #e6e6e6',
			borderRadius: 2,
			padding: 15,
			overflow: 'hidden'
		}

		this.create = function(){
			$('<div>').css(this.styles)
			.addClass('window ' + this.className)
			.appendTo(content)
			.html(this.content);
		}

		this.changeStyle = function(newStyles){
			$.extend(this.styles, newStyles);

			if(this.className != ''){
				var getBlock = $('.'+this.className, content);
				if(getBlock)
					getBlock.animate(this.styles, animSpeed);
			}
		}
	}

	// Набор стандартных окон
	function defaultWindow(name){
		var item = new myWindow();
			item.className = name;
		switch(name){
			case 'login':
				item.title = 'Авторизация';
				item.content += '<input name="name" type="text" placeholder="ФИО" />';
				item.content += '<input name="group" type="text" placeholder="ГРУППА" />';
				item.content += '<input type="submit" value="ОК" />';
				item.changeStyle({
					top: 90,
					left: 15,
					right: 15,
					height: 175
				});
				break;
			case 'main':
				item.title = 'Главная';
				item.content += 'Привет, юный падаван!';
				item.content += '<p>В этой программе я познакомлю тебя с различными криптографическими алгоритмами. Покажу, как как они работают и дам тебе почувствовать себя на месте каждого из них, словом, ты будешь шифровать информацию вручную!</p>';
				item.content += '<p>Но не пугайся. К каждому алгоритму есть описание, которое поможет тебе решить задачу и порадовать преподавателя! :)</p>';
				item.changeStyle({
					top: 90,
					left: 15,
					right: 15,
					bottom: 95
				});
				break;
			case 'file':
				item.title = 'Выбрать файл';
				item.content += 'Текст';
				item.content += ' Еще текст </br>';
				item.content += 'И еще';
				item.changeStyle({
					top: 90,
					left: 15,
					right: 15,
					bottom: 100
				});
				break;
			case 'user':
				item.title = 'Информация о юзере';
				item.content += '<b>' + userName + '</b>' + ' (' + userGroup + ')';
				item.changeStyle({
					bottom: 15,
					left: 15,
					padding: 5
				});
			case 'description':
				item.title = 'Описание'
			default:
				break;
		}
		return item;
	}

	// Создание страницы
	function getPage(windows, clear){
		windows = windows.split(" ");

		// Если уже находится на этой странице, не перезагружать
		if(windows[0] === curPage)
			return;

		// Если еще не залогинился, не пускать дальше страницы логина
		if(!userName && !userGroup && windows[0] != 'login'){
			getPage('login', true);
			return;
		}

		// Запись названия текущего окна
		curPage = windows[0];

		// Плавное затухание старой страницы
		content.fadeOut(animSpeed, function(){
			// Очистка контента
			if(clear){
				$(this).empty();
				$('<h2>').appendTo(content);
			}

			// Перебор и отрисовка запрошенных страниц
			for(k in windows){
				var windowName = windows[k];

				// Если окно ранее еще не создавалось
				if(typeof allWindows[windowName] == 'undefined')
					allWindows[windowName] = defaultWindow(windowName);

				// Создает окно
				allWindows[windowName].create();
			}

			// Заголовок
			$('h2', content).html(allWindows[windows[0]].title);

			// Плавное появление страницы
			$(this).fadeIn(animSpeed, function(){
				// Подстановка скроллов
				scrolls.get();
			});
		});
	}
	/* /ФУНКЦИИ */





	/* ПЛАГИНЫ */
	function scrolls() {
		this.name = '.window';
		this.update = function(){
			$(this.name).perfectScrollbar('update');
		}
		this.get = function(){
			$(this.name).perfectScrollbar({
				wheelSpeed:30,
				suppressScrollX: true
			});
		}
	}
	var scrolls = new scrolls();

	$(window).resize(function(){
		scrolls.update();
	});

	/* /ПЛАГИНЫ */
});
