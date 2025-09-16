export function fixEncoding(text) {
	if (!text) return '';
	return text
		.replace(/Ch\s{1,2}/gi, 'chá ')
		.replace(/_gua/gi, 'água')
		.replace(/sonol\^ncia/gi, 'sonolência')
		.replace(/Al¡vio/gi, 'Alívio')
		.replace(/ins“nia/gi, 'insônia')
		.replace(/sens¡veis/gi, 'sensíveis')
		.replace(/fam¡lia/gi, 'família')
		.replace(/\^/g, 'ê')
		.replace(/“/g, 'ô')
		.replace(/”/g, 'õ')
		.replace(/¡/g, 'í');
}
