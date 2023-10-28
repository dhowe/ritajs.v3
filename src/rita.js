
import Tagger from './tagger';
import Stemmer from './stemmer';
import Lexicon from './lexicon';
import RiMarkov from './markov';
// import Operator from "../misc/operator";
import RiGrammar from './grammar';
import Analyzer from './analyzer';
import Tokenizer from './tokenizer';
import Concorder from './concorder';
import Conjugator from './conjugator';
import Inflector from './inflector';
import RandGen from './randgen';
import Util from './util';
// import RiScript from './riscript/riscript';

import { Query } from "mingo"
import { CstParser } from "chevrotain"



class RiTa {

  // static addTransform() {
  //   return RiScript.addTransform(...arguments);
  // }

  // static scripting() {
  //   return new RiScript(...arguments);
  // }

  // static articlize(s) {
  //   return RiScript.articlize(s);
  // }
  // static evaluate() {
  //   return RiScript.eval(...arguments);
  // }

  // static getTransforms() {
  //   return RiScript.transforms;
  // }

  static alliterations() {
    return RiTa.lexicon().alliterations(...arguments);
  }

  static analyze() {
    return RiTa.analyzer.analyze(...arguments);
  }

  static concordance() {
    return RiTa.concorder.concordance(...arguments);
  }

  static conjugate() {
    return RiTa.conjugator.conjugate(...arguments);
  }

  static grammar() {
    return new RiGrammar(...arguments);
  }

  static markov() {
    return new RiMarkov(...arguments);
  }


  static hasWord() {
    return RiTa.lexicon().hasWord(...arguments);
  }

  static isAbbrev(input, { caseSensitive = false } = {}) {
    if (typeof input === 'string') {
      if (caseSensitive) return RiTa.ABRV.includes(input.trim());
      let check = input.trim().toLowerCase();
      return RiTa.ABRV.some(a => a.toLowerCase() === check);
    }
  }

  static isAdjective(word) {
    return RiTa.tagger.isAdjective(word);
  }

  static isAdverb(word) {
    return RiTa.tagger.isAdverb(word);
  }

  static isAlliteration() {
    return RiTa.lexicon().isAlliteration(...arguments);
  }

  static isNoun(word) {
    return RiTa.tagger.isNoun(word);
  }

  static isPunct(text) {
    return text && text.length && ONLY_PUNCT.test(text);
  }

  static isQuestion(sentence) { // remove?
    return RiTa.QUESTIONS.includes
      (RiTa.tokenize(sentence)[0].toLowerCase());
  }

  /* static findStem(word) {
    // return true if 1. it is in the dictionary 
    // && 2. it remains the same after stemming
    return RiTa.lexicon().hasWord(word, {fatal: true, strict: true})
       && Stemmer.stem(word) === word;
  }*/

  static isStopWord(w) {
    return RiTa.STOP_WORDS.includes(w.toLowerCase());
  }

  static isRhyme() {
    return RiTa.lexicon().isRhyme(...arguments);
  }

  static isVerb(word) {
    return RiTa.tagger.isVerb(word);
  }

  static kwic() {
    return RiTa.concorder.kwic(...arguments);
  }

  static pastPart() {
    return RiTa.conjugator.pastPart(...arguments);
  }

  static phones() {
    return RiTa.analyzer.analyze(...arguments).phones;
  }

  static pos() { // DOC:
    return RiTa.tagger.tag(...arguments);
  }

  static posInline(words, opts = {}) { // java only?
    opts.inline = true;
    return RiTa.tagger.tag(words, opts);
  }

  static pluralize() {
    return RiTa.inflector.pluralize(...arguments);
  }

  static presentPart() {
    return RiTa.conjugator.presentPart(...arguments);
  }

  static randomOrdering() {
    return RiTa.randomizer.randomOrdering(...arguments);
  }

  static randomSeed() {
    return RiTa.randomizer.seed(...arguments);
  }

  static randomWord() {
    return RiTa.lexicon().randomWord(...arguments);
  }

  static rhymes() { // DOC:
    return RiTa.lexicon().rhymes(...arguments);
  }


  static search() {
    return RiTa.lexicon().search(...arguments);
  }

  static sentences() {
    return RiTa.tokenizer.sentences(...arguments);
  }

  static spellsLike() { // DOC:
    return RiTa.lexicon().spellsLike(...arguments);
  }

  static singularize() {
    return RiTa.inflector.singularize(...arguments);
  }

  static soundsLike() { // DOC:
    return RiTa.lexicon().soundsLike(...arguments);
  }

  static stem() {
    return Stemmer.stem(...arguments);
  }

  static stresses() {
    return RiTa.analyzer.analyze(...arguments).stresses;
  }

  static syllables() {
    return RiTa.analyzer.analyze(...arguments).syllables;
  }

  static tokens() {
    return RiTa.tokenizer.tokens(...arguments);
  }

  static tokenize() {
    return RiTa.tokenizer.tokenize(...arguments);
  }

  static untokenize() {
    return RiTa.tokenizer.untokenize(...arguments);
  }

  ////////////////////////////// niapa /////////////////////////////

  static randi() { 
    return Math.floor(RiTa.randomizer.random(...arguments));
  }

  static random() {
    return RiTa.randomizer.random(...arguments);
  }

  static isVowel(c) {
    return c && c.length === 1 && RiTa.VOWELS.includes(c);
  }

  static isConsonant(c) {
    return (c && c.length === 1 && !RiTa.VOWELS.includes(c)
      && IS_LETTER.test(c));
  }

  static capitalize(s) {
    return s ? s[0].toUpperCase() + s.substring(1) : '';
  }

  static lexicon() { // lazy load
    if (typeof RiTa._lexicon === 'undefined') {
      if (typeof __NOLEX__ !== 'undefined') { // used by webpack, don't shorten
        RiTa._lexicon = new Lexicon(RiTa);
      }
      else {
        RiTa._lexicon = new Lexicon(RiTa, require('./rita_dict'));
      }
    }
    return RiTa._lexicon;
  }
}

// BACKREFS
RiMarkov.parent = RiTa;
RiGrammar.parent = RiTa;
//RiScript.parent = RiTa;
Stemmer.parent = RiTa;

// CLASSES
RiTa.RiGrammar = RiGrammar;
RiTa.RiMarkov = RiMarkov;
//RiTa.RiScript = RiScript;
// RiTa.Operator = Operator;
RiTa.Stemmer = Stemmer;
RiTa.Util = Util;

// COMPONENTS
RiTa.tagger = new Tagger(RiTa);
RiTa.analyzer = new Analyzer(RiTa);
RiTa.concorder = new Concorder(RiTa);
RiTa.tokenizer = new Tokenizer(RiTa);
RiTa.inflector = new Inflector(RiTa);
RiTa.conjugator = new Conjugator(RiTa);
RiTa.randomizer = new RandGen(RiTa);

// LAZY-LOADS
RiTa._lexicon = undefined;

// MESSAGES
RiTa.SILENT = false;
RiTa.SILENCE_LTS = false;
RiTa.CDN = 'https://www.unpkg.com/rita/';

// CONSTANTS
RiTa.PHONES = ['aa', 'ae', 'ah', 'ao', 'aw', 'ay', 'b', 'ch', 'd', 'dh', 'eh', 'er', 'ey', 'f', 'g', 'hh', 'ih', 'iy', 'jh', 'k', 'l', 'm', 'n', 'ng', 'ow', 'oy', 'p', 'r', 's', 'sh', 't', 'th', 'uh', 'uw', 'v', 'w', 'y', 'z', 'zh'];
RiTa.VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'DEV';
RiTa.HAS_LEXICON = typeof __NOLEX__ === 'undefined';
RiTa.FIRST = 1;
RiTa.SECOND = 2;
RiTa.THIRD = 3;
RiTa.PAST = 4;
RiTa.PRESENT = 5;
RiTa.FUTURE = 6;
RiTa.SINGULAR = 7;
RiTa.PLURAL = 8;
RiTa.NORMAL = 9;
RiTa.STRESS = '1';
RiTa.NOSTRESS = '0';
RiTa.PHONE_BOUNDARY = '-';
RiTa.WORD_BOUNDARY = " ";
RiTa.SYLLABLE_BOUNDARY = "/";
RiTa.SENTENCE_BOUNDARY = "|";
RiTa.VOWELS = "aeiou";
RiTa.ABRV = ["Adm.", "Capt.", "Cmdr.", "Col.", "Dr.", "Gen.", "Gov.", "Lt.", "Maj.", "Messrs.", "Mr.", "Mrs.", "Ms.", "Prof.", "Rep.", "Reps.", "Rev.", "Sen.", "Sens.", "Sgt.", "Sr.", "St.", "A.k.a.", "C.f.", "I.e.", "E.g.", "Vs.", "V.", "Jan.", "Feb.", "Mar.", "Apr.", "Mar.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
RiTa.QUESTIONS = ["was", "what", "when", "where", "which", "why", "who", "will", "would", "who", "how", "if", "is", "could", "might", "does", "are", "have"];
RiTa.STOP_WORDS = ["and", "a", "of", "in", "i", "you", "is", "to", "that", "it", "for", "on", "have", "with", "this", "be", "not", "are", "as", "was", "but", "or", "from", "my", "at", "if", "they", "your", "all", "he", "by", "one", "me", "what", "so", "can", "will", "do", "an", "about", "we", "just", "would", "there", "no", "like", "out", "his", "has", "up", "more", "who", "when", "don't", "some", "had", "them", "any", "their", "it's", "only", "which", "i'm", "been", "other", "were", "how", "then", "now", "her", "than", "she", "well", "also", "us", "very", "because", "am", "here", "could", "even", "him", "into", "our", "much", "too", "did", "should", "over", "want", "these", "may", "where", "most", "many", "those", "does", "why", "please", "off", "going", "its", "i've", "down", "that's", "can't", "you're", "didn't", "another", "around", "must", "few", "doesn't", "the", "every", "yes", "each", "maybe", "i'll", "away", "doing", "oh", "else", "isn't", "he's", "there's", "hi", "won't", "ok", "they're", "yeah", "mine", "we're", "what's", "shall", "she's", "hello", "okay", "here's", "less", "didn't", "said", "over", "this", "that", "just", "then", "under", "some" ];

RiTa.INFINITIVE = 1;
RiTa.GERUND = 2;

// For tokenization, Can't -> Can not, etc.
RiTa.SPLIT_CONTRACTIONS = false;

// Set to false to reduce memory use (likely slower)
RiTa.CACHING = true;

const ONLY_PUNCT = /^[\p{P}|\+|-|<|>|\^|\$|\ufffd|`]*$/u;
const IS_LETTER = /^[a-z\u00C0-\u00ff]+$/;


export default RiTa;
