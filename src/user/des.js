var numAutoComplete = 8;

// Перестановка ключа
var PK1 = [
	57, 49, 41, 33, 25, 17, 9,  1,
	58, 50, 42, 34, 26, 18, 10, 2,
	59, 51, 43, 35, 27, 19, 11, 3,
	60, 52, 44, 36, 63, 55, 47, 39,
	31, 23, 15, 7,  62, 54, 46, 38,
	30, 22, 14, 6,  61, 53, 45, 37,
	29, 21, 13, 5,  28, 20, 12, 4
];

// Перестановка ключа со сжатием
var PK2 = [
	14, 17, 11, 24, 1,  5,
	3,  28, 15, 6,  21, 10,
	23, 19, 12, 4,  26, 8,
	16, 7,  27, 20, 13, 2,
	41, 52, 31, 37, 47, 55,
	30, 40, 51, 45, 33, 48,
	44, 49, 39, 56, 34, 53,
	46, 42, 50, 36, 29, 32
];

// Перестановка с расширением
var EBLOCK = [
	32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9,
	8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17,
	16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25,
	24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1
];


// 8 S-блоков
var SBLOCK = [
	[
		14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
		0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
		4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
		15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
	],
	[
		15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 
		3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
		0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 
		13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
	],
	[
		10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 
		13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
		13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 
		1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
	],
	[
		7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 
		13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
		10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 
		3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
	],
	[
		2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 
		14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
		4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 
		11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
	],
	[
		12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 
		10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
		9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 
		4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
	],
	[
		4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 
		13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
		1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 
		6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
	],
	[
		13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 
		1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
		7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 
		2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
	]
];


// Функция сложения по модулю два
function moduloTwo(one, two) {
	var len = one.length,
		result = '';

	for(var i = 0; i < len; i++) {
		if(one[i] == 1 && two[i] == 1 || one[i] == 0 && two[i] == 0) {
			result += 0;
		} else if (one[i] == 0 && two[i] == 1 || one[i] == 1 && two[i] == 0) {
			result += 1;
		}
	}

	return result;
}

// Перевод из двоичной системы и десятичную
function bin2dec(bin) {
	return parseInt(bin, 2);
}
// Перевод из десятичной системы и двоичную
function dec2bin(dec) {
	return dec.toString(2);
}

// Получить случайное число
function getRandValue(min, max) {
	return Math.round(min - 0.5 + Math.random()*(max-min+1));
}

// Получить случайную 64-битовую последовательность
function getRandBin(bits, type) {
	var result = { full: '', left: '', right: '' };

	for(var i = 0, temp = ''; i < bits; i++){
		temp = Math.round(Math.random()).toString();
		result.full += temp;

		if(type=='key') {
			if(i % 8 == 7) {
				result.left += temp;
			} else if (i < 54) {
				result.right += temp;
			}
		} else {
			if(i < bits/2) {
				result.left += temp;
			} else {
				result.right += temp;
			}
		}
	}

	return result;
}


function DES() {
	// Функция для получения расширенного блока
	_getEBlock = function(instr, block) {
		var len = block.length,
			result = '';

		for(var i = 0; i < len; i++) {
			result += instr[block[i]-1];
		}
		
		return result;
	}

	// Получить вход и выход на S-блоках
	_getRandSBlock = function(key, eblock) {
		var rand = getRandValue(0, 7),
			lenBlock = eblock.length,
			fullBlock = moduloTwo(key, eblock),
			splitBlock = [];

		// Разбиение на 8 S-блоков
		for(var i = 0, temp = ''; i < lenBlock; i++) {
			temp += fullBlock[i];
			if((i+1) % 6 == 0) {
				splitBlock.push(temp);
				temp = '';
			}
		}

		var inner = splitBlock[rand];


		// Получение выходной последовательности
		var col = bin2dec(inner[1] + inner[2] + inner[3] + inner[4]),
			row = bin2dec(inner[0] + inner[5]),
			outer = dec2bin(SBLOCK[rand][col+row*16]);

		// Выходной блок должен быть длиной 4 двоичных числа
		outer = ['','000','00','0',''][outer.length] + outer;

		return {
			num: rand,
			full: fullBlock,
			split: splitBlock,
			inner: inner,
			outer: outer
		};
	}

	this.openBlock = getRandBin(64, '');
	this.EopenBlock = _getEBlock(this.openBlock.right, EBLOCK);
	this.key = getRandBin(64, 'key');
	this.SBlock = _getRandSBlock(this.key.right, this.EopenBlock);
}

// Получение всех расчитанных данных по алгоритму
var des = new DES();


// проверка правильного ввода
// autocomplete - автоматически дозаполнить поле, если numAutoComplete символов введено верно
function checkEnter(block, submit, autocomplete) {
	var result = 1;

	block.find('input.check').each(function() {
		var need = $(this).attr('data-val'),
			cur = $(this).val(),
			len = cur.length;
		
		// Автозаполнение поля
		if(autocomplete && len >= numAutoComplete) {
			var auto = 1;
			for(var i = 0; i < len; i++) {
				if (cur[i] == need[i]) {
					auto *= 1;
				} else {
					auto *= 0;
				}
			}

			if(auto) {
				$(this).val(need);
			}
		}

		// Проверка на совпадение символов
		if($(this).attr('data-val') != $(this).val()) {
			result *= 0;
			return;
		} else {
			result *= 1;
		}
	});


	if(result) {
		submit.removeAttr('disabled');
	} else {
		submit.attr('disabled','disabled');
	}
}

// Табличный билдер :)
// Принимает количество столбцов, массив, true/false для нумерации столбцов и строк
// Возвращает готовую таблицу
function getTable(cols, arr, head) {
	var len = arr.length,
		result = '<table class="'+(head?'head':'')+'">';

	for(var i = 0, k = 0; i < len; i++) {
		var row = i % cols;
		// Строим первую строку
		if(head && i == 0) {
			result += '<tr><td></td>';
				for(var j = 0; j < cols; j++) {
					result += '<td>'+j+'</td>';
				}
			result += '</tr>';
		}

		// Начало строки
		if(row == 0) {
			result += '<tr>'+(head?('<td>'+(k++)+'</td>'):'');
		}

		// Содержимое ячейки
		result += '<td>'+arr[i]+'</td>';

		// Конец строки
		if(row == cols-1) {
			result += '</tr>';
		}
	}
	result += '</table>';

	return result;
}




// Первый шаг
(function() {
	var $block = $('#algorithmBox div:eq(0)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поля ввода
	$block.find('.openBlock').val(des.openBlock.full);
	$block.find('.LeftOpenBlock').attr('data-val', des.openBlock.left);
	$block.find('.RightOpenBlock').attr('data-val', des.openBlock.right);
	
	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});


})();


// Второй шаг
(function() {
	var $block = $('#algorithmBox div:eq(1)'),
		$submit = $block.find('input[type="submit"]');

	// Получить таблицу перестановки
	$block.find('div.getExpansion').html(getTable(12, EBLOCK, false));

	// Заполнить поле ввода
	$block.find('.RightOpenBlock').val(des.openBlock.right);
	$block.find('.ExtRightOpenBlock').attr('data-val', des.EopenBlock);
	
	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
	});
})();


// Третий шаг
(function() {
	var $block = $('#algorithmBox > div:eq(2)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поле ввода
	$block.find('.ExtRightOpenBlock').val(des.EopenBlock);
	$block.find('.Key').val(des.key.right);
	$block.find('.inSBLOCK').attr('data-val', des.inSBlock);
	
	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
	});
})();


// Четвертый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(3)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поле ввода
	$block.find('div.getSblock').html('<p>Подстановка на примере S-блока '+(1+des.SBlock.num)+'</p>'+getTable(16, SBLOCK[des.SBlock.num], true));

	$block.find('.innerBlock').val(des.SBlock.inner);
	$block.find('.outerBlock').attr('data-val', des.SBlock.outer);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();