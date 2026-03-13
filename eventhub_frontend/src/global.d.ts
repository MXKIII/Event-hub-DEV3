declare namespace Intl {
  interface ListFormatOptions {
    localeMatcher?: 'lookup' | 'best fit';
    type?: 'conjunction' | 'disjunction' | 'unit';
    style?: 'long' | 'short' | 'narrow';
  }
}