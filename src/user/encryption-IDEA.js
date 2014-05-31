algorithmStart();

function IDEA() {
	var modulo216 = function(one, two) {
		// 2^16 = 65536
		return getBinZero(dec2bin((bin2dec(one) + bin2dec(two)) % 65536), 16);
	}
	var moduloMulti216 = function(one, two) {
		// 2^16 = 65536
		var result = (bin2dec(one) * bin2dec(two)) % 65536;
		return getBinZero(dec2bin(result==0?65536:result), 16);
	}
	var XOR = function(one, two) {
		return getBinZero(dec2bin(bin2dec(one) ^ bin2dec(two)), 16);
	}

	var get3step = function(st2, k) {
		var one = moduloMulti216(st2[2], k[4]),
			two = modulo216(st2[3], one),
			out2 = moduloMulti216(two, k[5]),
			out1 = modulo216(one, out2);
		return [out1, out2];
	}

	this.openBlock = getRandBin(64, '');
	this.keys = [getRandBin(16, '').full, getRandBin(16, '').full, getRandBin(16, '').full, getRandBin(16, '').full, getRandBin(16, '').full, getRandBin(16, '').full];
	this.step1 = [
		moduloMulti216(this.openBlock.fourthParts[0], this.keys[0]),
		modulo216(this.openBlock.fourthParts[1], this.keys[1]),
		modulo216(this.openBlock.fourthParts[2], this.keys[2]),
		moduloMulti216(this.openBlock.fourthParts[3], this.keys[3])
	];
	this.step2 = [
		this.step1[0],
		this.step1[1],
		XOR(this.step1[0], this.step1[2]),
		XOR(this.step1[1], this.step1[3]),
		this.step1[2],
		this.step1[3]
	];
	this.step3 = get3step(this.step2, this.keys);
	this.step4 = [
		XOR(this.step1[0], this.step3[1]),
		XOR(this.step3[1], this.step1[2]),
		XOR(this.step1[1], this.step3[0]),
		XOR(this.step3[0], this.step1[3]),
	];
}

// Получение всех расчитанных данных по алгоритму
var idea = new IDEA();
console.log(idea);


// Первый шаг
(function() {
	var $block = $('#algorithmBox div:eq(0)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поля ввода
	$block.find('.openBlock').val(idea.openBlock.full);
	$block.find('.AOpenBlock').attr('data-val', idea.openBlock.fourthParts[0]);
	$block.find('.BOpenBlock').attr('data-val', idea.openBlock.fourthParts[1]);
	$block.find('.COpenBlock').attr('data-val', idea.openBlock.fourthParts[2]);
	$block.find('.DOpenBlock').attr('data-val', idea.openBlock.fourthParts[3]);
	
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
	$block.find('.innerA').html(idea.openBlock.fourthParts[0]);
	$block.find('.innerB').html(idea.openBlock.fourthParts[1]);
	$block.find('.innerC').html(idea.openBlock.fourthParts[2]);
	$block.find('.innerD').html(idea.openBlock.fourthParts[3]);

	$block.find('.key1').html(idea.keys[0]);
	$block.find('.key2').html(idea.keys[1]);
	$block.find('.key3').html(idea.keys[2]);
	$block.find('.key4').html(idea.keys[3]);
	
	$block.find('.out1').attr('data-val', idea.step1[0]);
	$block.find('.out2').attr('data-val', idea.step1[1]);
	$block.find('.out3').attr('data-val', idea.step1[2]);
	$block.find('.out4').attr('data-val', idea.step1[3]);

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
	$block.find('.innerA').html(idea.step1[0]);
	$block.find('.innerB').html(idea.step1[1]);
	$block.find('.innerC').html(idea.step1[2]);
	$block.find('.innerD').html(idea.step1[3]);

	$block.find('.out1').attr('data-val', idea.step2[0]);
	$block.find('.out2').attr('data-val', idea.step2[1]);
	$block.find('.out3').attr('data-val', idea.step2[2]);
	$block.find('.out4').attr('data-val', idea.step2[3]);
	$block.find('.out5').attr('data-val', idea.step2[4]);
	$block.find('.out6').attr('data-val', idea.step2[5]);

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
	$block.find('.innerA').html(idea.step2[2]);
	$block.find('.innerB').html(idea.step2[3]);

	$block.find('.key5').html(idea.keys[4]);
	$block.find('.key6').html(idea.keys[5]);

	$block.find('.out1').attr('data-val', idea.step2[0]);
	$block.find('.out2').attr('data-val', idea.step2[1]);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
	});
})();


// Пятый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(4)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поле ввода
	$block.find('.innerA').html(idea.step1[0]);
	$block.find('.innerB').html(idea.step1[1]);
	$block.find('.innerC').html(idea.step3[0]);
	$block.find('.innerD').html(idea.step3[1]);
	$block.find('.innerE').html(idea.step1[2]);
	$block.find('.innerF').html(idea.step1[3]);

	$block.find('.out1').attr('data-val', idea.step4[0]);
	$block.find('.out2').attr('data-val', idea.step4[1]);
	$block.find('.out3').attr('data-val', idea.step4[2]);
	$block.find('.out4').attr('data-val', idea.step4[3]);

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
