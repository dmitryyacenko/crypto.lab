algorithmStart();

function GOST() {
	this.getEDS = function() {
		while(true) {
			var k = getRandValue(2, this.q-1),
				r = moduloM(this.a, k, this.p) % this.q,
				s = (k * this.hash + this.x * r) % this.q;
			if(r != 0 && s != 0)
				return {
					k: k,
					r: r,
					s: s
				}
		}
	}
	this.checkHash1 = function(h) {
		return (this.hash * h) % this.q == 1;
	}
	this.moduloNegative = function(num, mod) {
		while(true) {
			num += mod;
			if(num >= 0)
				return num % mod;
		}
	}

	// Простые числа
	// 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43...
	var b = [2, 3, 5, 7][Math.floor(Math.random()*4)];
	this.q = [7, 11, 13, 17, 19][Math.floor(Math.random()*5)];
	this.p = this.q * b + 1;
	this.x = getRandValue(2, this.q-1);
	this.hash = getRandValue(2, this.q-1);
}

// Получение всех расчитанных данных по алгоритму
var gost = new GOST();

// Первый шаг
(function() {
	var $block = $('#algorithmBox div:eq(0)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поля ввода
	var $allBlocks = $('#algorithmBox');
	$allBlocks.find('span.p').html(gost.p);
	$allBlocks.find('span.q').html(gost.q);
	$allBlocks.find('span.x').html(gost.x);
	$allBlocks.find('span.hash').html(gost.hash);
	
	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		var userVal = $(this).val();

		if(isNumber(userVal) && userVal > 1 && moduloM(userVal, gost.q, gost.p) == 1) {
			gost.a = userVal;
			$('#algorithmBox input.a').attr('data-val', gost.a);
			$('#algorithmBox span.a').html(gost.a);

			gost.y = moduloM(gost.a, gost.x, gost.p);
			$('#algorithmBox input.y').attr('data-val', gost.y);
			$('#algorithmBox span.y').html(gost.y);


			var eds = gost.getEDS();
			gost.k = eds.k;
			gost.r = eds.r;
			gost.s = eds.s;
			$('#algorithmBox input.k').attr('data-val', gost.k);
			$('#algorithmBox input.r').attr('data-val', gost.r);
			$('#algorithmBox input.s').attr('data-val', gost.s);
			$('#algorithmBox span.k').html(gost.k);
			$('#algorithmBox span.r').html(gost.r);
			$('#algorithmBox span.s').html(gost.s);
		} else {
			$('#algorithmBox input.a').attr('data-val', 'suckMyDick');
		}
		checkEnter($block, $submit, false);
	});
})();


// Второй шаг
(function() {
	var $block = $('#algorithmBox div:eq(1)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Третий шаг
(function() {
	var $block = $('#algorithmBox div:eq(2)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();




// Четвертый шаг
(function() {
	var $block = $('#algorithmBox div:eq(3)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();




// Пятый шаг
(function() {
	var $block = $('#algorithmBox div:eq(4)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		var userVal = $(this).val();

		if(isNumber(userVal) && gost.checkHash1(userVal)) {
			gost.hash1 = userVal;
			$('#algorithmBox input.hash1').attr('data-val', gost.hash1);
			$('#algorithmBox span.hash1').html(gost.hash1);


			gost.u1 = (gost.s * gost.hash1) % gost.q;
			gost.u2 = gost.moduloNegative(-(gost.r * gost.hash1), gost.q);
			$('#algorithmBox input.u1').attr('data-val', gost.u1);
			$('#algorithmBox input.u2').attr('data-val', gost.u2);
			$('#algorithmBox span.u1').html(gost.u1);
			$('#algorithmBox span.u2').html(gost.u2);
		} else {
			$('#algorithmBox input.hash1').attr('data-val', 'suckMyDick');
		}
		checkEnter($block, $submit, false);
	});
})();




// Шестой шаг
(function() {
	var $block = $('#algorithmBox div:eq(5)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Седьмой шаг
(function() {
	var $block = $('#algorithmBox > div:eq(6)'),
		$submit = $block.find('input[type="submit"]');

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
