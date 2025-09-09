// Função para corrigir caracteres de encoding quebrado
export function fixEncoding(text) {
  if (!text) return '';
  return text
    .replace(/¡/g, 'í')
    .replace(/“/g, 'ô')
    .replace(/”/g, 'õ')
    .replace(/‘/g, 'á')
    .replace(/’/g, 'é')
    .replace(/¢/g, 'ã')
    .replace(/§/g, 'ç')
    .replace(/ª/g, 'ê')
    .replace(/º/g, 'ú')
    .replace(/–/g, 'í')
    .replace(/ /g, ' ')
    .replace(/ch  /gi, 'chá ')
    .replace(/  gua/gi, ' água')
    .replace(/sens¡veis/gi, 'sensíveis')
    .replace(/fam¡lia/gi, 'família');
}
