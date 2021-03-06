
//Функции после старта и в конце
var curInfo = '';
function algorithmStart() {
	toggleDisabled(false);
	checkExit = true;
	curInfo = $('<div data-name="'+cryptoName[1]+'" data-type="'+cryptoName[0]+'" class="curInfo"><span class="algorithmInfoIcon"></span></div>');

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
		getPage('main algolist', true);
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
	cryptoName[1] // Название выбранного алгоритма
	*/
	var result = '';

	switch(cryptoName[1]) {
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
		case 'IDEA':
			if(cryptoType == 'encryption') {
				result = CryptoJS.TripleDES.encrypt(fileText, cryptoKey).toString();
			} else if(cryptoType == 'decryption') {
				result = CryptoJS.TripleDES.decrypt(fileText, cryptoKey).toString(CryptoJS.enc.Utf8);
			}
		break;
	}
	
	fileWrite('out', result, callback);
}


// Функция возведения числа в степень по модулю
// (a^b) mod c
function moduloM(a, b, c) {
	var r = 1;

	while (b) {
		if (b%2 == 0) {
			b /= 2;
			a = (a * a) % c;
		} else {
			b--;
			r = (r * a) % c;
		}
	}
	return r;
}

// проверка на числовое значение
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// поиск 2 взаимно простых чисел
var simpleFind = function(N) {
	var p = 0,
		q = 0,
		nonsimple = true;
	while(nonsimple){
		var i = Math.floor((Math.random()*N)+2),
			stop = false;
		
		if(i > 2) for(var j = i-1; j >= 1; j--){
			if(!stop){
				var temp = i/j;
				if(temp % 1 === 0 && j != 1) stop = true;
				if(!stop && j == 1) {
					if(p == 0) p = i;
					else if(i != p) {
						q = i;
						nonsimple = false;
					}
				}
			}
		}
	}
	return {p: p, q: q};
}

// Функция для проверки 2 чисел на взаимную простоту
function checkSimple(one, two) {
	if(one <=1 || two <= 1 || one == two || (one / two) % 1 === 0 || (two / one) % 1 === 0)
		return false;
	for(var j = Math.min(one, two); j > 1; j--){
		if((one / j) % 1 === 0 && (two / j) % 1 === 0)
			return false;
	}
	return true;
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
	// Handler negtive number into binary.
	// The code following is really meanless for number itself is depend on it's
	// length. For instance, in bit operation, number will be treated as 32 bit.
	// @see http://stackoverflow.com/questions/4338315/javascript-inverting-a-binary-value-of-a-number
	if(dec >= 0) {
        return dec.toString(2);
    } else {
        //make the number positive
        dec = Math.abs(dec);
        //get the first compliment
        var res = dec ^ parseInt((new Array(dec.toString(2).length+1)).join("1"),2);
        //get the second complimet
        return (res+1).toString(2);
    }
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
	var result = { full: '', left: '', right: '', leftBit: 0, rightBit: 0, fourthParts: ['', '', '', ''] };

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
				if(i < bits/4) {
					result.fourthParts[0] += temp;
				} else {
					result.fourthParts[1] += temp;
				}
			} else {
				result.right += temp;
				if(i < 3*bits/4) {
					result.fourthParts[2] += temp;
				} else {
					result.fourthParts[3] += temp;
				}
			}
		}
	}

	result.leftBit = parseInt(result.left, 2);
	result.rightBit = parseInt(result.right, 2);
	result.fullBit = parseInt(result.full, 2);

	return result;
}

// Функция для дополнения двоичного кода нулями (строка на выходе)
function getBinZero(bin, bits) {
	var len = bin.length;
	for(; len < bits; len++) {
		bin = '0'+bin;
	}
	return bin;
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