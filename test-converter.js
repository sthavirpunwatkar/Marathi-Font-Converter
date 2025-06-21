// Simple test for Marathi converter
// Run with: node test-converter.js

// Mock the converter functions for testing
const fontMappings = {
  'unicode': {
    name: 'unicode',
    displayName: 'Unicode',
    mapping: {
      unicode_to_font: {},
      font_to_unicode: {}
    }
  },
  'aps-dv-prakash': {
    name: 'aps-dv-prakash',
    displayName: 'APS DV Prakash',
    mapping: {
      unicode_to_font: {
        'अ': 'v',
        'आ': 'vk',
        'इ': 'b',
        'ई': 'bZ',
        'उ': 'm',
        'ऊ': 'm~',
        'ऋ': '`',
        'ए': ',s',
        'ऐ': ',l',
        'ओ': 'vks',
        'औ': 'vkS',
        'क': 'd',
        'ख': 'd[k',
        'ग': 'x',
        'घ': '?k',
        'ङ': '³',
        'च': 'p',
        'छ': 'N',
        'ज': 't',
        'झ': 'T',
        'ञ': 'u',
        'ट': 'V',
        'ठ': 'B',
        'ड': 'M',
        'ढ': '<',
        'ण': '.k',
        'त': 'r',
        'थ': 'Fk',
        'द': 'n',
        'ध': '/k',
        'न': 'u',
        'प': 'i',
        'फ': 'Q',
        'ब': 'c',
        'भ': 'Hk',
        'म': 'e',
        'य': ';',
        'र': 'j',
        'ल': 'y',
        'व': 'o',
        'श': "'k",
        'ष': '"k',
        'स': 'l',
        'ह': 'g',
        'ा': 'k',
        'ि': 'h',
        'ी': 'h',
        'ु': 'q',
        'ू': 'w',
        'ृ': '`',
        'े': 's',
        'ै': 'S',
        'ो': 'ks',
        'ौ': 'kS',
        '्': '~',
        'ं': 'a',
        'ः': '%',
        '।': 'A',
        '॥': 'AA',
        'ऽ': 'd_',
        'ॐ': 'vke~',
        '०': '0',
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9'
      },
      font_to_unicode: {
        'v': 'अ',
        'vk': 'आ',
        'b': 'इ',
        'bZ': 'ई',
        'm': 'उ',
        'm~': 'ऊ',
        '`': 'ऋ',
        ',s': 'ए',
        ',l': 'ऐ',
        'vks': 'ओ',
        'vkS': 'औ',
        'd': 'क',
        'd[k': 'ख',
        'x': 'ग',
        '?k': 'घ',
        '³': 'ङ',
        'p': 'च',
        'N': 'छ',
        't': 'ज',
        'T': 'झ',
        'u': 'ञ',
        'V': 'ट',
        'B': 'ठ',
        'M': 'ड',
        '<': 'ढ',
        '.k': 'ण',
        'r': 'त',
        'Fk': 'थ',
        'n': 'द',
        '/k': 'ध',
        'i': 'प',
        'Q': 'फ',
        'c': 'ब',
        'Hk': 'भ',
        'e': 'म',
        ';': 'य',
        'j': 'र',
        'y': 'ल',
        'o': 'व',
        "'k": 'श',
        '"k': 'ष',
        'l': 'स',
        'g': 'ह',
        'k': 'ा',
        'h': 'ि',
        'q': 'ु',
        'w': 'ू',
        's': 'े',
        'S': 'ै',
        'ks': 'ो',
        'kS': 'ौ',
        '~': '्',
        'a': 'ं',
        '%': 'ः',
        'A': '।',
        'AA': '॥',
        'd_': 'ऽ',
        'vke~': 'ॐ',
        '0': '०',
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९'
      }
    }
  }
};

function convertMarathiText(inputText, sourceFont, targetFont) {
  if (sourceFont === 'unicode' && targetFont !== 'unicode') {
    return convertUnicodeToFont(inputText, targetFont);
  } else if (sourceFont !== 'unicode' && targetFont === 'unicode') {
    return convertFontToUnicode(inputText, sourceFont);
  } else if (sourceFont !== 'unicode' && targetFont !== 'unicode') {
    const unicodeText = convertFontToUnicode(inputText, sourceFont);
    return convertUnicodeToFont(unicodeText, targetFont);
  } else {
    return inputText;
  }
}

function convertUnicodeToFont(text, targetFont) {
  const fontInfo = fontMappings[targetFont];
  if (!fontInfo) {
    console.error(`Font mapping not found for: ${targetFont}`);
    return text;
  }
  
  const mapping = fontInfo.mapping.unicode_to_font;
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    let matched = false;
    
    // Try to match multi-character sequences first (longest match)
    for (let len = Math.min(4, text.length - i); len > 0; len--) {
      const char = text.substr(i, len);
      if (mapping[char]) {
        result += mapping[char];
        i += len;
        matched = true;
        break;
      }
    }
    
    // If no match found, keep original character
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  
  return result;
}

function convertFontToUnicode(text, sourceFont) {
  const fontInfo = fontMappings[sourceFont];
  if (!fontInfo) {
    console.error(`Font mapping not found for: ${sourceFont}`);
    return text;
  }
  
  const mapping = fontInfo.mapping.font_to_unicode;
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    let matched = false;
    
    // Try to match multi-character sequences first (longest match)
    for (let len = Math.min(4, text.length - i); len > 0; len--) {
      const char = text.substr(i, len);
      if (mapping[char]) {
        result += mapping[char];
        i += len;
        matched = true;
        break;
      }
    }
    
    // If no match found, keep original character
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  
  return result;
}

// Test cases
const testCases = [
  {
    name: "Simple Unicode to APS",
    input: "नमस्कार",
    sourceFont: "unicode",
    targetFont: "aps-dv-prakash",
    expected: "ueLdkj"
  },
  {
    name: "Simple APS to Unicode",
    input: "ueLdkj",
    sourceFont: "aps-dv-prakash",
    targetFont: "unicode",
    expected: "नमस्कार"
  },
  {
    name: "Complex Unicode to APS",
    input: "मराठी भाषा",
    sourceFont: "unicode",
    targetFont: "aps-dv-prakash",
    expected: "ejkBh f'kk"
  },
  {
    name: "Numbers Unicode to APS",
    input: "१२३४५",
    sourceFont: "unicode",
    targetFont: "aps-dv-prakash",
    expected: "12345"
  }
];

console.log("🧪 Testing Marathi Font Converter\n");

let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`);
  console.log(`Input: "${testCase.input}" (${testCase.sourceFont} → ${testCase.targetFont})`);
  
  const result = convertMarathiText(testCase.input, testCase.sourceFont, testCase.targetFont);
  
  console.log(`Expected: "${testCase.expected}"`);
  console.log(`Result:   "${result}"`);
  
  if (result === testCase.expected) {
    console.log("✅ PASSED\n");
    passedTests++;
  } else {
    console.log("❌ FAILED\n");
  }
});

console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log("🎉 All tests passed! The converter is working correctly.");
} else {
  console.log("⚠️  Some tests failed. Please check the implementation.");
}

// Additional round-trip test
console.log("\n🔄 Round-trip Test:");
const roundTripText = "नमस्कार मराठी भाषा";
const toAps = convertMarathiText(roundTripText, "unicode", "aps-dv-prakash");
const backToUnicode = convertMarathiText(toAps, "aps-dv-prakash", "unicode");

console.log(`Original: "${roundTripText}"`);
console.log(`To APS:   "${toAps}"`);
console.log(`Back:     "${backToUnicode}"`);
console.log(`Round-trip successful: ${roundTripText === backToUnicode ? "✅" : "❌"}`); 