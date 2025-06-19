import dictionary from '../data/dictionary';

export function processTextWithTooltips(text) {
  if (!text) return text;
  
  let processedText = text;
  const words = Object.keys(dictionary);
  
  // Sort words by length (longest first) to avoid partial matches
  const sortedWords = words.sort((a, b) => b.length - a.length);
  
  sortedWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const replacement = `<span class="tooltip-word" data-tooltip="${dictionary[word]}">${word}</span>`;
    processedText = processedText.replace(regex, replacement);
  });
  
  return processedText;
}

export function extractWords(text) {
  if (!text) return [];
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const dictionaryWords = Object.keys(dictionary);
  
  return words.filter(word => 
    dictionaryWords.some(dictWord => 
      dictWord.toLowerCase() === word.toLowerCase()
    )
  );
}