// Uni2APS Conversion Logic
// This script converts Unicode Devanagari text to legacy APS-DV-Prakash font encoding.
// The conversion logic is based on standard Unicode-to-legacy font mapping patterns.

export function convertUnicodeToAps(text: string): string {
  let modified_substring = text;

  const array_one = [
    // Half-letters
    '‘', '’', '“', '”', '(', ')', '{', '}', '=', '।', '?', 'ः', '÷', '×', '’',
    'क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़', 'य़',
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः',
    'क', 'ख', 'ग', 'घ', 'ङ',
    'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म',
    'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
    'ऑ', 'ऑ', 'ऽ'
  ];

  const array_two = [
    // Corresponding APS characters
    '^', ']', '“', '”', '(', ')', '{', '}', '=', '|', '?', ':', '÷', '×', '’',
    'क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़', 'य़',
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अ:',
    'क', 'ख', 'ग', 'घ', 'ङ',
    'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म',
    'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह',
    'आ', 'आ', 'ऽ'
  ];

  for (let i = 0; i < array_one.length; i++) {
    const regex = new RegExp(array_one[i], 'g');
    modified_substring = modified_substring.replace(regex, array_two[i]);
  }

  // Code for 'र' conversion
  modified_substring = modified_substring.replace(/क़/g, "क़");
  modified_substring = modified_substring.replace(/ख़/g, "ख़");
  modified_substring = modified_substring.replace(/ग़/g, "ग़");
  modified_substring = modified_substring.replace(/ज़/g, "ज़");
  modified_substring = modified_substring.replace(/ड़/g, "ड़");
  modified_substring = modified_substring.replace(/ढ़/g, "ढ़");
  modified_substring = modified_substring.replace(/फ़/g, "फ़");
  modified_substring = modified_substring.replace(/य़/g, "य़");
  modified_substring = modified_substring.replace(/%/g, "%");

  let position_of_i = modified_substring.indexOf("ि");
  while (position_of_i != -1) {
    let character_left_to_i = modified_substring.charAt(position_of_i - 1);
    modified_substring = modified_substring.replace(character_left_to_i + "ि", "ि" + character_left_to_i);
    position_of_i = modified_substring.search(/ि/, position_of_i + 1);
  }

  // Matras
  modified_substring = modified_substring.replace(/ा/g, "e");
  modified_substring = modified_substring.replace(/ि/g, "d");
  modified_substring = modified_substring.replace(/ी/g, "h");
  modified_substring = modified_substring.replace(/ु/g, "q");
  modified_substring = modified_substring.replace(/ू/g, "w");
  modified_substring = modified_substring.replace(/ृ/g, "„");
  modified_substring = modified_substring.replace(/े/g, "s");
  modified_substring = modified_substring.replace(/ै/g, "S");
  modified_substring = modified_substring.replace(/ो/g, "es");
  modified_substring = modified_substring.replace(/ौ/g, "eS");
  modified_substring = modified_substring.replace(/ं/g, "A");
  modified_substring = modified_substring.replace(/ः/g, "%");
  modified_substring = modified_substring.replace(/्/g, "d");

  // Code for 'र' conversion
  modified_substring = modified_substring.replace(/dÔ/g, "Ôd");
  modified_substring = modified_substring.replace(/dó/g, "ód");

  let position_of_wrong_ee = modified_substring.indexOf("d");
  while (position_of_wrong_ee != -1) {
    let char_after_ee = modified_substring.charAt(position_of_wrong_ee + 1);
    let char_after_after_ee = modified_substring.charAt(position_of_wrong_ee + 2);
    if (char_after_after_ee == 'd') {
      let last_char = modified_substring.charAt(position_of_wrong_ee + 3);
      if (last_char == 'e' || last_char == 's' || last_char == 'S' || last_char == 'h' || last_char == 'w') {
        modified_substring = modified_substring.replace("d" + char_after_ee + "d", char_after_ee + "d" + "d");
      }
    }
    position_of_wrong_ee = modified_substring.search(/d/, position_of_wrong_ee + 1);
  }

  position_of_wrong_ee = modified_substring.indexOf("d");
  while (position_of_wrong_ee != -1) {
    let char_after_ee = modified_substring.charAt(position_of_wrong_ee + 1);
    let char_after_after_ee = modified_substring.charAt(position_of_wrong_ee + 2);
    if (char_after_after_ee == 'd') {
      modified_substring = modified_substring.replace("d" + char_after_ee + "d", char_after_ee + "d" + "d");
    }
    position_of_wrong_ee = modified_substring.search(/d/, position_of_wrong_ee + 1);
  }

  // Characters
  modified_substring = modified_substring.replace(/अ/g, "अ");
  modified_substring = modified_substring.replace(/आ/g, "आ");
  modified_substring = modified_substring.replace(/इ/g, "इ");
  modified_substring = modified_substring.replace(/ई/g, "ई");
  modified_substring = modified_substring.replace(/उ/g, "उ");
  modified_substring = modified_substring.replace(/ऊ/g, "ऊ");
  modified_substring = modified_substring.replace(/ऋ/g, "ऋ");
  modified_substring = modified_substring.replace(/ए/g, "ए");
  modified_substring = modified_substring.replace(/ऐ/g, "ऐ");
  modified_substring = modified_substring.replace(/ओ/g, "ओ");
  modified_substring = modified_substring.replace(/औ/g, "औ");
  modified_substring = modified_substring.replace(/अं/g, "अं");
  modified_substring = modified_substring.replace(/अ:/g, "अ:");
  modified_substring = modified_substring.replace(/क/g, "क");
  modified_substring = modified_substring.replace(/ख/g, "ख");
  modified_substring = modified_substring.replace(/ग/g, "ग");
  modified_substring = modified_substring.replace(/घ/g, "घ");
  modified_substring = modified_substring.replace(/ङ/g, "ङ");
  modified_substring = modified_substring.replace(/च/g, "च");
  modified_substring = modified_substring.replace(/छ/g, "छ");
  modified_substring = modified_substring.replace(/ज/g, "ज");
  modified_substring = modified_substring.replace(/झ/g, "झ");
  modified_substring = modified_substring.replace(/ञ/g, "ञ");
  modified_substring = modified_substring.replace(/ट/g, "ट");
  modified_substring = modified_substring.replace(/ठ/g, "ठ");
  modified_substring = modified_substring.replace(/ड/g, "ड");
  modified_substring = modified_substring.replace(/ढ/g, "ढ");
  modified_substring = modified_substring.replace(/ण/g, "ण");
  modified_substring = modified_substring.replace(/त/g, "त");
  modified_substring = modified_substring.replace(/थ/g, "थ");
  modified_substring = modified_substring.replace(/द/g, "द");
  modified_substring = modified_substring.replace(/ध/g, "ध");
  modified_substring = modified_substring.replace(/न/g, "न");
  modified_substring = modified_substring.replace(/प/g, "प");
  modified_substring = modified_substring.replace(/फ/g, "फ");
  modified_substring = modified_substring.replace(/ब/g, "ब");
  modified_substring = modified_substring.replace(/भ/g, "भ");
  modified_substring = modified_substring.replace(/म/g, "म");
  modified_substring = modified_substring.replace(/य/g, "य");
  modified_substring = modified_substring.replace(/र/g, "र");
  modified_substring = modified_substring.replace(/ल/g, "ल");
  modified_substring = modified_substring.replace(/व/g, "व");
  modified_substring = modified_substring.replace(/श/g, "श");
  modified_substring = modified_substring.replace(/ष/g, "ष");
  modified_substring = modified_substring.replace(/स/g, "स");
  modified_substring = modified_substring.replace(/ह/g, "ह");
  modified_substring = modified_substring.replace(/ /g, " ");
  modified_substring = modified_substring.replace(/क़/g, "़क");
  modified_substring = modified_substring.replace(/ख़/g, "़ख");
  modified_substring = modified_substring.replace(/ग़/g, "़ग");
  modified_substring = modified_substring.replace(/ज़/g, "़ज");
  modified_substring = modified_substring.replace(/ड़/g, "़ड");
  modified_substring = modified_substring.replace(/ढ़/g, "़ढ");
  modified_substring = modified_substring.replace(/फ़/g, "़फ");
  modified_substring = modified_substring.replace(/य़/g, "़य");
  modified_substring = modified_substring.replace(/्/g, "d");

  // Repha
  modified_substring = modified_substring.replace(/Ù/g, " ");
  modified_substring = modified_substring.replace(/ƒ/g, " ");
  modified_substring = modified_substring.replace(/र्‍/g, " ");
  modified_substring = modified_substring.replace(/þ/g, " ");

  // Final replacements
  modified_substring = modified_substring.replace(/त्र/g, "Ç");
  modified_substring = modified_substring.replace(/क्ष/g, "্ষ");
  modified_substring = modified_substring.replace(/ज्ञ/g, "ज्ञ");
  modified_substring = modified_substring.replace(/श्र/g, "श्र");
  modified_substring = modified_substring.replace(/र्व/g, "oZ");

  return modified_substring;
}
