algorithmStart();

function RSA() {
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
	var getHash = function(m, n) {
		var result;
		for(var k in m)
			result = Math.pow(m[k] + (k==0?0:result),2) % n;

		return result;
	}
	this.checkSimple = function(one, two) {
		if(one <=1 || two <= 1 || one == two || (one / two) % 1 === 0 || (two / one) % 1 === 0)
			return false;
		for(var j = Math.min(one, two); j > 1; j--){
			if((one / j) % 1 === 0 && (two / j) % 1 === 0)
				return false;
		}
		return true;
	}
	this.checkD = function(d) {
		return (this.e * d) % this.phi == 1;
	}
	this.megaModulo = function(h, d, n) {
		var b = 1;

		while (d) {
			if (d%2 == 0) {
				d /= 2;
				h = (h * h) % n;
			} else {
				d--;
				b = (b * h) % n;
			}
		}
		return b;
	}

	this.inner = simpleFind(17);
	this.n = this.inner.p * this.inner.q;
	this.phi = (this.inner.p - 1)*(this.inner.q - 1);
	this.m = [getRandValue(2, 50), getRandValue(2, 50), getRandValue(2, 50), getRandValue(2, 50), getRandValue(2, 50)];
	this.hash = getHash(this.m, this.n);
}

// Получение всех расчитанных данных по алгоритму
var rsa = new RSA();
console.log(rsa);

// Первый шаг
(function() {
	var $block = $('#algorithmBox div:eq(0)'),
		$submit = $block.find('input[type="submit"]');

	// Заполнить поля ввода
	var $allBlocks = $('#algorithmBox');
	$allBlocks.find('.p').html(rsa.inner.p);
	$allBlocks.find('.q').html(rsa.inner.q);
	$allBlocks.find('.phi').html(rsa.phi);
	$allBlocks.find('.n').html(rsa.n);
	$allBlocks.find('.m').html(rsa.m.join(' '));


	$block.find('.nVal').attr('data-val', rsa.n);
	
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
	$block.find('.phi').attr('data-val', rsa.phi);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, false);
	});
})();


// Третий шаг
(function() {
	var $block = $('#algorithmBox > div:eq(2)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		var userVal = $(this).val();

		if(userVal % 1 === 0 && userVal > 1 && userVal < rsa.phi && rsa.checkSimple(rsa.phi, userVal)) {
			rsa.e = userVal;
			$block.find('.eVal').attr('data-val', rsa.e);
			$('#algorithmBox .e').html(rsa.e);
		} else {
			$block.find('.eVal').attr('data-val', 'suckMyDick');
		}
		checkEnter($block, $submit, false);
	});
})();


// Четвертый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(3)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		var userVal = $(this).val();

		if(userVal % 1 === 0 && rsa.checkD(userVal)) {
			rsa.d = userVal;
			rsa.S = rsa.megaModulo(rsa.hash, rsa.d, rsa.n);


			$block.find('.dVal').attr('data-val', rsa.d);
			$('#algorithmBox .d').html(rsa.d);

			$('#algorithmBox .SVal').attr('data-val', rsa.S);
			$('#algorithmBox .S').html(rsa.S);
		} else {
			$block.find('.dVal').attr('data-val', 'suckMyDick');
		}
		checkEnter($block, $submit, false);
	});
})();


// Пятый шаг
(function() {
	var $block = $('#algorithmBox > div:eq(4)'),
		$submit = $block.find('input[type="submit"]');

	$('#algorithmBox .hash').attr('data-val', rsa.hash);
	$('#algorithmBox .h').html(rsa.hash);

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
	});
})();


// Шестой шаг
(function() {
	var $block = $('#algorithmBox > div:eq(5)'),
		$submit = $block.find('input[type="submit"]');

	// Проверка введенных данных
	$block.on('input', 'input[type=text]', function() {
		checkEnter($block, $submit, true);
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
