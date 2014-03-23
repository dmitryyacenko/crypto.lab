
//Функции после старта и в конце
var curInfo = '';
function algorithmStart() {
	toggleDisabled(false);
	checkExit = true;
	curInfo = $('<div data-name="DES" data-type="encryption" class="curInfo"><span class="algorithmInfoIcon"></span></div>');

	$('body').append(curInfo);
}
function algorithmBreak() {
	toggleDisabled(true);
	checkExit = false;
	if(typeof curInfo == 'object'){
		curInfo.remove();
	}
}
function algorithmFinal() {
	processFile(function(){
		algorithmBreak();
		getPage('algolist', true);
		dialogNotice('ok');
	});
}


// Зашифровать/расшифровать файл
function processFile(callback) {
	/*
	fileText // Текст из файла
	cryptoKey // Стандартный секретный ключ для алгоритмов
	cryptoMode // Режим прохождения алгоритмов [manual, auto]
	cryptoType // Тип шифрования [encryption, decryption]
	cryptoName // Название выбранного алгоритма
	*/
	var result = '';

	switch(cryptoName) {
		case 'DES':
			if(cryptoType == 'encryption') {
				result = CryptoJS.TripleDES.encrypt(fileText, cryptoKey).toString();
			} else if(cryptoType == 'decryption') {
				result = CryptoJS.TripleDES.decrypt(fileText, cryptoKey).toString(CryptoJS.enc.Utf8);
			}
		break;
	}
	
	fileWrite('out', result, callback);
}



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