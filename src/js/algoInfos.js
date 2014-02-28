var symmetricAlgorithms = {
	IDEA		: function(){
		var html = '<p>IDEA является блочным алгоритмом шифрования данных, запатентованным швейцарской фирмой Ascom. Фирма, правда, разрешила бесплатное некоммерческое использование своего алгоритма (применяется в общедоступном пакете конфиденциальной версии электронной почты PGP). Здесь в отличие от алгоритма DES не используются S-блоки или таблицы просмотра. В IDEA применяются 52 субключа, каждый длиной 16 бит. Исходный текст в IDEA делится на четыре группы по 16 бит. Для того чтобы комбинировать 16 битные коды, используется три операции: сложение, умножение и исключающее ИЛИ. Сложение представляет собой обычную операцию по модулю 65536 с переносом. При составлении таблицы умножения принимаются специальные меры для того, чтобы операция была обратимой. По этой причине вместо нуля используется код 65536. Рассмотрим алгоритм IDEA.</p>';
		html += '<p>Пусть четыре четверти исходного текста имеют имена A, B, C и D, а 52 субключа - К(1), К(2),…, К(52). Перед реализацией алгоритма выполняются операции:</p>';
		html += '<p><b>А = А*К(1); B = B + K(2); C = C + K(3); D = D * K(4);</b></p>';
		html += '<p>Первый цикл вычислений включает в себя:</p>';
		html += '<p><b>';
			html += 'E = A XOR C; F = B XOR D <br>';
			html += 'E = E * K(5) <br>';
			html += 'F = F + E <br>';
			html += 'F = F * K(6) <br>';
			html += 'E = E + F <br>';
			html += 'A = A XOR F <br>';
			html += 'C = C XOR F <br>';
			html += 'B = B XOR E <br>';
			html += 'D = D XOR E';
		html += '</b></p>';
		html += '<p>Меняем местами В и С.</p>';
		html += '<p>Повторяем это всё 8 раз, используя К(7) - К(12) для второго раза и, соответственно, К(43) - К(48) - для восьмого. После восьмого раза В и С местами не меняются. Выполняем после этого операции:</p>';
		html += '<p><b>';
			html += 'A = A * K(49) <br>';
			html += 'B = B + K(50) <br>';
			html += 'C = C + K(51) <br>';
			html += 'D = D * K(52)';
		html += '</b></p>';
		html += '<p>В результате закодированный текст имеет ту же длину, что и исходный. Схема этого весьма запутанного алгоритма может быть пояснена на рис. 1. По своему характеру алгоритм напоминает процедуры вычисления хэш-функции.</p>';
		html += '<p><center><img src="img/IDEA.png" /></center></p>';
		html += '<p><center>Рис. 1 - Схема реализации алгоритма шифрования IDEA</center></p>';
		html += '<p>При дешифровке используется тот факт, что A XOR B не изменяется, если C A и B будет произведена операция XOR C использованием любого числа. Это утверждение справедливо для любых значений А и В. Операции сложения (слагаемые заменяются их дополнением по модулю 2) и умножения (множители заменяются из обратными величинами по модулю 65537) также допускают инверсию. Первые четыре ключа дешифровки (KD) определяются несколько иначе, чем остальные.</p>';
		html += '<p><b>';
			html += 'KD(1) = 1/K(49) <br>';
			html += 'KD(2) = -K(50) <br>';
			html += 'KD(3) = -K(51) <br>';
			html += 'KD(4) = 1/K(52)';
		html += '</b></p>';
		html += '<p>Последующие операции производятся восемь раз с добавлением 6 к индексу ключей дешифрования и вычитанием 6 из индекса ключей шифрования.</p>';
		html += '<p><b>';
			html += 'KD(5) = K(47) <br>';
			html += 'KD(6) = K(48) <br>';
			html += 'KD(7) = 1/K(43) <br>';
			html += '(8) = -K(45) <br>';
			html += 'KD(9) = -K(44) <br>';
			html += 'KD(10) = 1/K(46)';
		html +='</b></p>';
		html += '<p>Субключи IDEA генерируются следующим образом. 128-битовый ключ IDEA определяет первые восемь субключей (128=8*16). Последующие ключи (44) получаются путем последовательности циклических сдвигов влево этого кода на 25 двоичных разрядов.</p>';
		return html;
	},
	ГОСТ		: '',
	BlowFish	: '',
	RC6			: '',
	DES			: '',
	AES 		: ''
}

var asymmetricAlgorithms = {
	DiffieHellman	: '',
	RSA				: '',
	Elgamal			: ''
}