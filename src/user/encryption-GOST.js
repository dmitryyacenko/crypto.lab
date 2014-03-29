// algorithmStart();
var cryptoKey = 'LolChto',
	numAutoComplete = 8;

// Использование ключей в раундах
var ROUND_KEY = [
	1, 2, 3, 4, 5, 6, 7, 8,
	1, 2, 3, 4, 5, 6, 7, 8,
	1, 2, 3, 4, 5, 6, 7, 8,
	8, 7, 6, 5, 4, 3, 2, 1
];

// S-блок для функции из сети Фейстелля
var S_BOX = [
	[6,12,7,1,5,15,13,8,4,10,9,14,0,3,11,2],
	[14,11,4,12,6,13,15,10,2,3,8,1,0,7,5,9],
	[13,11,4,1,3,15,5,9,0,10,14,7,6,8,2,12],
	[7,13,10,1,0,8,9,15,14,4,6,12,11,2,5,3],
	[1,15,13,0,5,7,10,4,9,2,3,14,6,11,8,12],
	[4,10,9,2,13,8,0,14,6,11,1,12,7,15,5,3],
	[4,11,10,0,7,2,1,13,3,6,8,5,9,12,15,14],
	[5,8,1,13,10,3,4,2,14,15,12,7,6,0,9,11]
];

function GOST() {

	// Функция для получения полного ключа и подключей
	var _getKey = function(key) {
		var keyLen = key.length,
			result = {pass: key, full: '', parts: []},
			tmpParts = '';

		// Дополнение ключа до 32 символов
		for(var i = 0; i < 32; i++) {
			var ID = i % keyLen;

			result.full += key[ID];
			tmpParts += key[ID];

			// Разбиение на 8 частей
			if(i % 4 == 3) {
				result.parts.push(parseInt(bin2hex(tmpParts), 16));
				tmpParts = '';
			}
		}
		return result;
	};

	// Получение уникальных рандомных значений
	var _getUnic = function() {
		return {
			round: getRandValue(9, 30),
			Ai: getRandBin(32, ''),
			SBoxNum: getRandValue(1, 8)
		}
	}

	// Результат сложения по модулю 2^32
	var _getFeistell = function(one, two) {
		// 2^32 = 4294967296
		var modulo = (one + two) % 4294967296,
			moduloBin = dec2bin(modulo),
			moduloParts = [],
			SInner = (modulo).toString(16),
			SFirstResult = 0,
			SFullResult = parseInt(getRandBin(32, '').full, 2),
			result = (SFullResult << 11) | (SFullResult >> 21);


		if(moduloBin.length < 32) {
			for(var i = moduloBin.length; i < 32; i++) {
				moduloBin = '0' + moduloBin;
			}
		}

		if(SInner.length < 8) {
			for(var i = SInner.length; i < 8; i++) {
				SInner = '0' + SInner;
			}
		}

		SFirstResult = S_BOX[0][hex2dec(SInner[0])];

		var tmp = '';
		for(var k in moduloBin) {
			tmp += moduloBin[k];
			if(k % 4 == 3) {
				moduloParts.push(tmp);
				tmp = '';
			}
		}

		return {
			modulo: modulo,
			moduloBin: moduloBin,
			moduloParts: moduloParts,
			SInner: SInner,
			SFirstResult: SFirstResult,
			SFullResult: SFullResult,
			result: result
		};
	}


	this.unicVals = _getUnic();
	this.openBlock = getRandBin(64, '');
	this.key = _getKey(cryptoKey);
	this.roundKey = {num: ROUND_KEY[this.unicVals.round - 1], val: this.key.parts[ROUND_KEY[this.unicVals.round - 1] - 1]};
	this.feistell = _getFeistell(this.roundKey.val, this.unicVals.Ai.fullBit)
}

// Получение всех расчитанных данных по алгоритму
var gost = new GOST();

console.log(gost.key);

// Первый шаг
(function() {
	var $block = $('#algorithmBox div:eq(0)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поля ввода
	$block.find('.openBlock').val(gost.openBlock.full);
	$block.find('.LeftOpenBlock').attr('data-val', gost.openBlock.left);
	$block.find('.RightOpenBlock').attr('data-val', gost.openBlock.right);
	
	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Второй шаг
(function() {
	var $block = $('#algorithmBox div:eq(1)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поле ввода
	$block.find('.userPass').val(gost.key.pass);
	$block.find('.fullKey').attr('data-val', gost.key.full);
	
	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Третий шаг
(function() {
	var $block = $('#algorithmBox > div:eq(2)'),
		$submit = $block.find('input[type="submit"]');

	// Отобразить все ключи
	$block.find('.keyPlace').html(gost.key.parts.join('&emsp;'));

	// Таблица выбора ключа
	$block.find('div.getKeyTable').html(getTable(8, ROUND_KEY, false));

	// Заполнить поле ввода
	$block.find('.roundKey')
		.attr('placeholder', 'Подключ '+gost.unicVals.round+' раунда')
		.attr('data-val', gost.roundKey.val);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
	});
})();


// Четвертый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(3)'),
		$submit = $block.find('input[type="submit"]');

	// Исходные данные
	$block.find('.moduloEx').html('Ключ: ' + gost.roundKey.val + '<br>Входной блок: ' + gost.unicVals.Ai.fullBit);
	
	// Заполнить поле ввода
	$block.find('.modulo').attr('data-val', gost.feistell.modulo);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Пятый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(4)'),
		$submit = $block.find('input[type="submit"]');


	// Таблица S-блока
	var table = [];
	for(var k in S_BOX) {
		table.push('S<sub>' + (parseInt(k) + 1) + '</sub>');
		table = table.concat(S_BOX[k]);
	}
	$block.find('div.getSBlock').html(getTable(17, table, false));

	// Исходные данные
	$block.find('.sfirstEx').html('Восемь 4-битовых подпоследовательностей (HEX): '+gost.feistell.SInner+'<br>Напишите число, соответствующее выходу 1 S-блока');
	
	// Заполнить поле ввода
	$block.find('.sfirst').attr('data-val', gost.feistell.SFirstResult);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
	});
})();


// Шестой шаг
(function() {
	var $block = $('#algorithmBox > div:eq(5)'),
		$submit = $block.find('input[type="submit"]');

	// Исходные данные
	$block.find('.feistellEx').html('f(L<sub>i</sub>, K<sub>i</sub>) = ' + gost.feistell.SFullResult);
	
	// Заполнить поле ввода
	$block.find('.modulo').attr('data-val', gost.feistell.result);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
	});
})();


// Обработка кликов на кнопку Далее
$('#algorithmBox').on('click', 'input[type=submit]', function() {
	var destination = $(this).attr('data-destination');
	
	if(destination == 'final') {
		algorithmFinal();
	} else {
		$('#algorithmBox > div').fadeOut(animSpeed, function() {
			setTimeout(function() {
				$('#algorithmBox > div:eq('+destination+')').fadeIn(animSpeed);
			}, 10);
		})
	}
});
