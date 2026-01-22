export interface KatakanaChar {
  char: string;
  romaji: string;
}

export interface KatakanaRow {
  name: string;
  displayName: string;
  chars: KatakanaChar[];
}

export const katakanaData: KatakanaRow[] = [
  {
    name: "vowels",
    displayName: "Vowels (ア行)",
    chars: [
      { char: "ア", romaji: "a" },
      { char: "イ", romaji: "i" },
      { char: "ウ", romaji: "u" },
      { char: "エ", romaji: "e" },
      { char: "オ", romaji: "o" },
    ],
  },
  {
    name: "ka",
    displayName: "Ka Row (カ行)",
    chars: [
      { char: "カ", romaji: "ka" },
      { char: "キ", romaji: "ki" },
      { char: "ク", romaji: "ku" },
      { char: "ケ", romaji: "ke" },
      { char: "コ", romaji: "ko" },
    ],
  },
  {
    name: "sa",
    displayName: "Sa Row (サ行)",
    chars: [
      { char: "サ", romaji: "sa" },
      { char: "シ", romaji: "shi" },
      { char: "ス", romaji: "su" },
      { char: "セ", romaji: "se" },
      { char: "ソ", romaji: "so" },
    ],
  },
  {
    name: "ta",
    displayName: "Ta Row (タ行)",
    chars: [
      { char: "タ", romaji: "ta" },
      { char: "チ", romaji: "chi" },
      { char: "ツ", romaji: "tsu" },
      { char: "テ", romaji: "te" },
      { char: "ト", romaji: "to" },
    ],
  },
  {
    name: "na",
    displayName: "Na Row (ナ行)",
    chars: [
      { char: "ナ", romaji: "na" },
      { char: "ニ", romaji: "ni" },
      { char: "ヌ", romaji: "nu" },
      { char: "ネ", romaji: "ne" },
      { char: "ノ", romaji: "no" },
    ],
  },
  {
    name: "ha",
    displayName: "Ha Row (ハ行)",
    chars: [
      { char: "ハ", romaji: "ha" },
      { char: "ヒ", romaji: "hi" },
      { char: "フ", romaji: "fu" },
      { char: "ヘ", romaji: "he" },
      { char: "ホ", romaji: "ho" },
    ],
  },
  {
    name: "ma",
    displayName: "Ma Row (マ行)",
    chars: [
      { char: "マ", romaji: "ma" },
      { char: "ミ", romaji: "mi" },
      { char: "ム", romaji: "mu" },
      { char: "メ", romaji: "me" },
      { char: "モ", romaji: "mo" },
    ],
  },
  {
    name: "ya",
    displayName: "Ya Row (ヤ行)",
    chars: [
      { char: "ヤ", romaji: "ya" },
      { char: "ユ", romaji: "yu" },
      { char: "ヨ", romaji: "yo" },
    ],
  },
  {
    name: "ra",
    displayName: "Ra Row (ラ行)",
    chars: [
      { char: "ラ", romaji: "ra" },
      { char: "リ", romaji: "ri" },
      { char: "ル", romaji: "ru" },
      { char: "レ", romaji: "re" },
      { char: "ロ", romaji: "ro" },
    ],
  },
  {
    name: "wa",
    displayName: "Wa Row (ワ行)",
    chars: [
      { char: "ワ", romaji: "wa" },
      { char: "ヲ", romaji: "wo" },
      { char: "ン", romaji: "n" },
    ],
  },
  {
    name: "ga",
    displayName: "Ga Row (ガ行)",
    chars: [
      { char: "ガ", romaji: "ga" },
      { char: "ギ", romaji: "gi" },
      { char: "グ", romaji: "gu" },
      { char: "ゲ", romaji: "ge" },
      { char: "ゴ", romaji: "go" },
    ],
  },
  {
    name: "za",
    displayName: "Za Row (ザ行)",
    chars: [
      { char: "ザ", romaji: "za" },
      { char: "ジ", romaji: "ji" },
      { char: "ズ", romaji: "zu" },
      { char: "ゼ", romaji: "ze" },
      { char: "ゾ", romaji: "zo" },
    ],
  },
  {
    name: "da",
    displayName: "Da Row (ダ行)",
    chars: [
      { char: "ダ", romaji: "da" },
      { char: "ヂ", romaji: "di" },
      { char: "ヅ", romaji: "du" },
      { char: "デ", romaji: "de" },
      { char: "ド", romaji: "do" },
    ],
  },
  {
    name: "ba",
    displayName: "Ba Row (バ行)",
    chars: [
      { char: "バ", romaji: "ba" },
      { char: "ビ", romaji: "bi" },
      { char: "ブ", romaji: "bu" },
      { char: "ベ", romaji: "be" },
      { char: "ボ", romaji: "bo" },
    ],
  },
  {
    name: "pa",
    displayName: "Pa Row (パ行)",
    chars: [
      { char: "パ", romaji: "pa" },
      { char: "ピ", romaji: "pi" },
      { char: "プ", romaji: "pu" },
      { char: "ペ", romaji: "pe" },
      { char: "ポ", romaji: "po" },
    ],
  },
];
