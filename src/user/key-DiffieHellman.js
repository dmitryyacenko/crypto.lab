algorithmStart();

function DH() {
	var findPQ = function(min, max) {
		while(true) {
			var q = simpleFind(max);
			if(q > min && q < max)
				return {p: 2*q + 1, q: q}
		}
	}
	this.checkG = function(g) {
		if(!isNumber(g) || g <= 1 || g >= this.PQ.p - 1 || moduloM(g, this.PQ.q, this.PQ.p) == 1)
			return false;
		return true;
	}

	this.PQ = findPQ(10, 32);
}

// Получение всех расчитанных данных по алгоритму
var dh = new DH();

// Первый шаг
(function() {
	var $block = $('#algorithmBox div:eq(0)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поля ввода
	var $allBlocks = $('#algorithmBox');
	$allBlocks.find('.p').html(dh.PQ.p);
	$allBlocks.find('.q').html(dh.PQ.q);


	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		var userVal = $(this).val();

		if(dh.checkG(userVal)) {
			dh.g = userVal;
			$(this).attr('data-val', dh.g);
			$('#algorithmBox .g').html(dh.g);
		} else {
			$(this).attr('data-val', 'suckMyDick');
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
			abonentRandVal = $(this).hasClass('a')?'a':'b';
		
		dh[abonentRandVal] = userVal;
		if(dh.a && dh.b && dh.a >= 3 && dh.b >= 3 && dh.a <= 50 && dh.b <= 50 && dh.a != dh.b) {
			dh.aBig = moduloM(dh.g, dh.a, dh.PQ.p);
			dh.bBig = moduloM(dh.g, dh.b, dh.PQ.p);

			$block.find('.a').attr('data-val', dh.a);
			$block.find('.b').attr('data-val', dh.b);

			$('#algorithmBox .a').html(dh.a);
			$('#algorithmBox .b').html(dh.b);

			$('#algorithmBox input.aBig').attr('data-val', dh.aBig);
			$('#algorithmBox input.bBig').attr('data-val', dh.bBig);

			$('#algorithmBox .aBig').html(dh.aBig);
			$('#algorithmBox .bBig').html(dh.bBig);

			dh.K = moduloM(dh.g, dh.a * dh.b, dh.PQ.p);
			$('#algorithmBox input.K').attr('data-val', dh.K);
		} else {
			$block.find('.a').attr('data-val', 'suckMyDick');
			$block.find('.b').attr('data-val', 'suckMyDick');
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
