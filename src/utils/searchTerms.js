export let searchTerms = [];

export function addSearchTerm(term) {
  if (!searchTerms.includes(term)) {
    searchTerms.push(term);
  }
}
