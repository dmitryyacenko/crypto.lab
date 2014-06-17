var algorithms = {
	// Шифрования
	encryption: {
		sym: {
			IDEA: 'IDEA',
			GOST: 'ГОСТ 28147-89',
			DES: 'DES'
		},
		asym: {RSA: 'RSA'}
	},
	// Электронная цифровая подпись
	eds: {
		RSA: 'RSA',
		GOST: 'ГОСТ Р34.10-94'
	},
	// Распределение ключей
	key: {
		DiffieHellman: 'Diffie-Hellman',
		MentalPoker: 'Ментальный Покер'
	}
};