import dictionary from '../data/dictionary';

// This function is no longer used for pre-processing but kept for potential future use
export function processTextWithTooltips(text) {
  // Return text as-is since we now handle tooltips dynamically
  return text;
}

// Utility function to check if a word exists in dictionary
export function isWordInDictionary(word) {
  return dictionary.hasOwnProperty(word.toLowerCase());
}

// Utility function to get definition
export function getDefinition(word) {
  return dictionary[word.toLowerCase()] || null;
}

// Extract dictionary words from text (for analysis)
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