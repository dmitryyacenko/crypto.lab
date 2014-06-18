algorithmStart();

function MP() {
	var findP = function(min, max) {
		for(;;) {
			var p = simpleFind(max).p;
			if(p > min && p < max)
				return p;
		}
	}
	var getABG = function(p) {
		for(;;) {
			var a = getRandValue(1, p - 1),
				b = getRandValue(1, p - 1),
				g = getRandValue(1, p - 1);
			if(checkABG(a, b, g, p)) {
				this.alpha = a;
				this.beta = b;
				this.gamma = g;
				return {a: a, b: b, g: g};
			}
		}
	}

	checkABG = function(a, b, g, p) {
		var isNan = !a || !b || !g,
			identical = a == b || a == g || b == g,
			negative = a <= 1 || b <= 1 || g <= 1,
			moreThanNeed = a > p - 1 || b > p - 1 || g > p - 1;
		if(isNan || identical || negative || moreThanNeed)
			return false;

		return true;
	}

	this.p = findP(16, 32);
	var abg = getABG(this.p);
	this.alpha = abg.a;
	this.beta = abg.b;
	this.gamma = abg.g;
	this.Ualice = this.beta;
}

// Получение всех расчитанных данных по алгоритму
var mp = new MP();

// Первый шаг
(function() {
	var $block = $('#algorithmBox div:eq(0)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поля ввода
	var $allBlocks = $('#algorithmBox');
	$allBlocks.find('span.p').html(mp.p);
	$allBlocks.find('span.alpha').html(mp.alpha);
	$allBlocks.find('span.beta').html(mp.beta);
	$allBlocks.find('span.gamma').html(mp.gamma);

	$allBlocks.find('input.alpha').attr('data-val', mp.alpha);
	$allBlocks.find('input.beta').attr('data-val', mp.beta);
	$allBlocks.find('input.gamma').attr('data-val', mp.gamma);


	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		var userVal = $(this).val(),
			valName = $(this).hasClass('Ca')?'Ca':'Cb';

		mp[valName] = userVal;
		if(mp.Ca && mp.Cb && mp.Ca != mp.Cb && isNumber(mp.Ca) && isNumber(mp.Cb) && checkSimple(mp.Ca, mp.p - 1) && checkSimple(mp.Cb, mp.p - 1)) {
			$('#algorithmBox span.Ca').html(mp.Ca);
			$('#algorithmBox span.Cb').html(mp.Cb);
			$('#algorithmBox input.Ca').attr('data-val', mp.Ca);
			$('#algorithmBox input.Cb').attr('data-val', mp.Cb);


			mp.u1 = moduloM(mp.alpha, mp.Ca, mp.p);
			mp.u2 = moduloM(mp.beta, mp.Ca, mp.p);
			mp.u3 = moduloM(mp.gamma, mp.Ca, mp.p);
			$('#algorithmBox input.u1').attr('data-val', mp.u1);
			$('#algorithmBox input.u2').attr('data-val', mp.u2);
			$('#algorithmBox input.u3').attr('data-val', mp.u3);
			$('#algorithmBox span.u1').html(mp.u1);
			$('#algorithmBox span.u2').html(mp.u2);
			$('#algorithmBox span.u3').html(mp.u3);


			mp.v1 = moduloM(mp.u1, mp.Cb, mp.p);
			mp.v2 = moduloM(mp.u2, mp.Cb, mp.p);
			mp.v3 = moduloM(mp.u3, mp.Cb, mp.p);
			$('#algorithmBox input.v1').attr('data-val', mp.v1);
			$('#algorithmBox input.v2').attr('data-val', mp.v2);
			$('#algorithmBox input.v3').attr('data-val', mp.v3);
			$('#algorithmBox span.v1').html(mp.v1);
			$('#algorithmBox span.v2').html(mp.v2);
			$('#algorithmBox span.v3').html(mp.v3);
		} else {
			$('#algorithmBox input.Ca').attr('data-val', 'suckMyDick');
			$('#algorithmBox input.Cb').attr('data-val', 'suckMyDick');
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
		var userVal = $(this).val(),
			valName = $(this).hasClass('Da')?'Da':'Db';
		
		mp[valName] = userVal;
		if(mp.Da && mp.Db && mp.Da != mp.Db && isNumber(mp.Da) && isNumber(mp.Db) && (mp.Da*mp.Ca) % (mp.p - 1) == 1 && (mp.Db*mp.Cb) % (mp.p - 1) == 1) {
			$('#algorithmBox span.Da').html(mp.Da);
			$('#algorithmBox span.Db').html(mp.Db);
			$('#algorithmBox input.Da').attr('data-val', mp.Da);
			$('#algorithmBox input.Db').attr('data-val', mp.Db);

			mp.w1 = moduloM(mp.v1, mp.Da, mp.p);
			$('#algorithmBox input.w1').attr('data-val', mp.w1);
			$('#algorithmBox span.w1').html(mp.w1);

			mp.z = moduloM(mp.w1, mp.Db, mp.p);
			$('#algorithmBox input.z').attr('data-val', mp.z);
			$('#algorithmBox span.z').html(mp.z);
		} else {
			$('#algorithmBox input.Da').attr('data-val', 'suckMyDick');
			$('#algorithmBox input.Db').attr('data-val', 'suckMyDick');
		}
		checkEnter($block, $submit, false);
	});
})();

// Третий шаг
(function() {
	var $block = $('#algorithmBox > div:eq(2)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();

// Четвертый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(3)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Пятый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(4)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Шестой шаг
(function() {
	var $block = $('#algorithmBox > div:eq(5)'),
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
		checkEnter($block, $submit, false);
	});
})();


// Восьмой шаг
(function() {
	var $block = $('#algorithmBox > div:eq(7)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
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
