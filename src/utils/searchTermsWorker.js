// This module manages a list of search terms.
// It allows adding new search terms to the list and ensures that each term is unique.

export let searchTerms = [];

export function addSearchTerm(term) {
  if (!searchTerms.includes(term)) {
    searchTerms.push(term);
  }
}
