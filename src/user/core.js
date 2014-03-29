
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
		case 'GOST':
			var gost = new ClassGost();
			if(cryptoType == 'encryption') {
				result = gost.Encode(fileText, cryptoKey);
			} else if(cryptoType == 'decryption') {
				result = gost.Decode(fileText, cryptoKey);
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

// Перевод из двоичной системы в десятичную
function bin2dec(bin) {
	return parseInt(bin, 2);
}
// Перевод из десятичной системы в двоичную
function dec2bin(dec) {
	return dec.toString(2);
}
// Перевод из десятичной системы в 16-ричную
function dec2hex(n){
	return Number(n).toString(16);
}
// Перевод из 16-ричной системы в десятичную
function hex2dec(hex){ 
	return parseInt(hex,16); 
}
// Перевод из двоичной системы в 16-ричную
function bin2hex(s) {
	//  discuss at: http://phpjs.org/functions/bin2hex/
	// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// bugfixed by: Onno Marsman
	// bugfixed by: Linuxworld
	// improved by: ntoniazzi (http://phpjs.org/functions/bin2hex:361#comment_177616)
	//   example 1: bin2hex('Kev');
	//   returns 1: '4b6576'
	//   example 2: bin2hex(String.fromCharCode(0x00));
	//   returns 2: '00'
	var i, l, o = '', n;
	s += '';
	for (i = 0, l = s.length; i < l; i++) {
		n = s.charCodeAt(i).toString(16);
		o += n.length < 2 ? '0' + n : n;
	}
	return o;
}

// Получить случайное число
function getRandValue(min, max) {
	return Math.round(min - 0.5 + Math.random()*(max-min+1));
}

// Получить случайную 64-битовую последовательность
function getRandBin(bits, type) {
	var result = { full: '', left: '', right: '', leftBit: 0, rightBit: 0 };

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

	result.leftBit = parseInt(result.left, 2);
	result.rightBit = parseInt(result.right, 2);
	result.fullBit = parseInt(result.full, 2);

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