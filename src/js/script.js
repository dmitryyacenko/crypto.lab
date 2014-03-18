var userName = '', // Имя пользователя
	userGroup = '', // Группа пользователя
	curPage = '', // Название открытой страницы
	animSpeed = 300, // Скорость всех анимаций
	allWindows = {}, // Набор объектов открытых ранее окошек
	contId = 'content', // ID основного контейнера, с которым ведется работа

	fileText = '', // Содержимое файла будет помещаться сюда
	fileId = 'navFile', // ID области, которая будет анимироваться при загрузке файла
	fileMaxSize = 128, // Максимальный размер файла, КБ
	fileType = 'text/plain', // Тип загружаемого файла

	debugMode = false; // Дебаг. Когда true - игнорирует некоторые проверки


$(function(){
	var content = $('#'+contId),
		$overWindow = $('#overWindow');

	if(debugMode){
		$('header').append(' (DEBUG mode)');
		userName = 'debugName';
		userGroup = 'debugGroup';

		// Главное окно
		getPage('main file', true);

		toggleDisabled();
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
			getPage('main file', true);

			toggleDisabled();
		}
	});

	// Главная
	$('#navHome').on('click', function(){
		getPage('main file', true);
	});

	// Алгоритмы
	$('#navAlgolist').on('click', function(){
		getPage('algolist', true);
	});

	/* Открыть файл
	$('#navFile').on('click', function(){
		getPage('file', true);
	});
	*/


	// Открыть аккордеон
	$('body').on('click', '.algorithmType, .algorithmSubtype', function() {
		$(this).next().slideToggle(animSpeed);
	});
	// Получение информации об алгоритме
	$('body').on('click', '.algorithmItem .info', function() {
		var algoName = $(this).parent().attr('data-name'),
			algoType = $(this).parent().attr('data-type');
		showAlgoInfo(algoName, algoType);
	});
	// Закрыть информацию об алгоритме
	$('body').on('click', '#overWindow .close', function() {
		var parent = $(this).parent();
			children = parent.children('div');

		parent.fadeOut(animSpeed, function() {
			children.find('.window').html('')
		})
		
		children.css({
			transform: 'scale(0.5)',
			opacity: 0
		})
	});
	/* /ОБРАБОТЧИКИ */




	/* ФУНКЦИИ */
	function authorization(name, group){
		if(name.val().length < 2){
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
		this.styles = {};

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
	function defaultWindow(name, title){
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
					right: 15
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
					bottom: 15,
					width: '46%'
				});
				break;
			case 'file':
				item.title = 'Загрузка файла';
				item.content += 'Чтобы загрузить файл, просто перетащи его в окно программы. ';
				item.content += 'Но знай, есть несколько небольших ограничений.';
				item.content += 'Файл должен иметь:<br />';
				item.content += '1) расширение *.txt<br />';
				item.content += '2) размер не более ' + fileMaxSize + ' КБ';
				item.changeStyle({
					top: 90,
					left: '50%',
					right: 15,
					bottom: 15
				});
				break;
			case 'algolist':
				item.title = 'Выбор алгоритма для шифрования';

				item.content += '<div class="algorithmType">Алгоритмы шифрования</div>';
				item.content += '<div class="oneLevel">';
					item.content += '<div class="algorithmSubtype">Симметричные</div>';
					item.content += '<div class="twoLevel">';
						for(k in algorithms.encryption.sym){
							var name = algorithms.encryption.sym[k];
							item.content += '<div data-name="'+name+'" data-type="encryption" class="algorithmItem">'+name+'<span class="info"></span></div>';
						}
					item.content += '</div>';

					item.content += '<div class="algorithmSubtype">Асимметричные</div>';
					item.content += '<div class="twoLevel">';
						for(k in algorithms.encryption.asym){
							var name = algorithms.encryption.asym[k];
							item.content += '<div data-name="'+name+'" data-type="encryption" class="algorithmItem">'+name+'<span class="info"></span></div>';
						}
					item.content += '</div>';
				item.content += '</div>';

				item.content += '<div class="algorithmType">Алгоритмы ЭЦП</div>';
				item.content += '<div class="oneLevel">';
					for(k in algorithms.eds){
						var name = algorithms.eds[k];
						item.content += '<div data-name="'+name+'" data-type="eds" class="algorithmItem">'+name+'<span class="info"></span></div>';
					}
				item.content += '</div>';

				item.content += '<div class="algorithmType">Алгоритмы распределения ключей</div>';
				item.content += '<div class="oneLevel">';
					for(k in algorithms.key){
						var name = algorithms.key[k];
						item.content += '<div data-name="'+name+'" data-type="key" class="algorithmItem">'+name+'<span class="info"></span></div>';
					}
				item.content += '</div>';

				item.changeStyle({
					top: 90,
					left: 15,
					right: 15,
					bottom: 15,
					backgroundColor: '#D9D9D9'
				});
				break;
			default:
				break;
		}

		if(name != 'user' && item.title && title != 0){
			item.content = '<h3>' + item.title + '</h3>' + item.content;
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
		content.css({
			opacity: 0,
			transform: 'scale(0.5)'
		})


		// Очистка контента
		if(clear){
			content.empty();
			$('<h2>').appendTo(content);
		}

		// Перебор и отрисовка запрошенных окон
		for(k in windows){
			var windowName = windows[k];

			// Если окно ранее еще не создавалось
			if(typeof allWindows[windowName] == 'undefined')
				allWindows[windowName] = defaultWindow(windowName, k);

			// Создает окно
			allWindows[windowName].create();
		}

		// Заголовок
		$('h2', content).html(allWindows[windows[0]].title);

		// Плавное появление страницы
		setTimeout(function(){
			// Инфа о юзере
			if(userName && userGroup && !$('.user_info')[0]){
				$('body').append('<div title="'+userName+' ('+userGroup+')" class="user_info"></div>')
			}

			content.css({
				opacity: 1,
				transform: 'scale(1)'
			});
		}, animSpeed);

	}


	// Показать информацию об алгоритме
	function showAlgoInfo(name, type) {
		var info = $('#'+name+'[data-type='+type+']').html();

		// Если данные не найдены, не выводить ничего
		if(!info) return;

		$('.window', $overWindow).html(info);

		$overWindow.fadeIn(animSpeed)
		.children().css({
			transform: 'scale(1)',
			opacity: 1
		})
	}


	// Сделать неактивными/активными элементы
	function toggleDisabled() {
		$('.disabled, .undisabled').toggleClass('disabled undisabled');
	}

	/* /ФУНКЦИИ */
});
