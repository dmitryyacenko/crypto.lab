$(function(){
	var content = $('#content'),
		userName = '', // Имя пользователя
		userGroup = '', // Группа пользователя
		curPage = '',
		animSpeed = 600,
		allWindows = {};

	// Окно логина
	getPage('login', true);



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
	function window(){
		this.className = '';
		this.content = '';
		this.title = '';

		this.top = 'auto';
		this.bottom = 'auto';
		this.left = 'auto';
		this.right = 'auto';
		this.width = 'auto';
		this.height = 'auto';

		this.create = function(){
			$('<div>').css({
				position: 'absolute',
				top: this.top,
				bottom: this.bottom,
				left: this.left,
				right: this.right,
				width: this.width,
				height: this.height
			})
			.addClass('window ' + this.className)
			.appendTo(content)
			.html(this.content);
		}
	}

	// Набор стандартных окон
	function defaultWindow(name){
		var item = new window();
			item.className = name;
		switch(name){
			case 'login':
				item.title = 'Авторизация';
				item.top = 90;
				item.left = 15;
				item.right = 15;
				item.height = 175;
				item.content += '<input name="name" type="text" placeholder="ФИО" />';
				item.content += '<input name="group" type="text" placeholder="ГРУППА" />';
				item.content += '<input type="submit" value="ОК" />';
				break;
			case 'main':
				item.title = 'Главная';
				item.top = 90;
				item.left = 15;
				item.width = 400;
				item.height = 400;
				item.content += 'Текст';
				item.content += ' Еще текст </br>';
				item.content += 'И еще';
				break;
			case 'file':
				item.title = 'Выбрать файл';
				item.top = 90;
				item.left = 15;
				item.right = 15;
				item.height = 400;
				item.content += 'Текст';
				item.content += ' Еще текст </br>';
				item.content += 'И еще';
				break;
			case 'user':
				item.title = 'Информация о юзере';
				item.bottom = 15;
				item.left = 15;
				item.width = 100;
				item.content += userName + ' (' + userGroup + ')';
			default:
				break;
		}
		return item;
	}

	// Создание страницы
	// title - строка
	// windows - 
	// clear - 
	function getPage(windows, clear){
		windows = windows.split(" ");

		if(!userName && !userGroup && windows[0] != 'login'){
			getPage('login', true);
			return;
		}

		content.fadeOut(animSpeed, function(){
			if(clear){
				$(this).empty();
				$('<h2>').appendTo(content);
			}
			
			for(k in windows){
				var windowName = windows[k];

				// Если окно ранее еще не создавалось
				if(typeof allWindows[windowName] == 'undefined')
					allWindows[windowName] = defaultWindow(windowName);

				allWindows[windowName].create();
			}

			$('h2', content).html(allWindows[windows[0]].title);

			$(this).fadeIn(animSpeed);
		});
	}
	/* /ФУНКЦИИ */
});
