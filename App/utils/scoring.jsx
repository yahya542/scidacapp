/* // utils/scoring.js

export const getScore = (userAns, correctAns) => {
  const clean = s => s.trim().toLowerCase();

  if (clean(userAns) === clean(correctAns)) return 10;

  // Levenshtein Distance sederhana
  const lev = (a, b) => {
    const matrix = [];
    for (let i = 0; i <= a.length; i++) matrix[i] = [i];
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }

    const distance = matrix[a.length][b.length];
    const similarity = 1 - distance / Math.max(a.length, b.length);
    return similarity >= 0.4 ? 8 : 0;
  };

  return lev(clean(userAns), clean(correctAns));
};  */

export const getScore = (userAns, correctAns) => {
  const clean = s => (s || '').toString().trim().toLowerCase();
  const a = clean(userAns);
  const b = clean(correctAns);

  console.log('Cleaned User:', a);
  console.log('Cleaned Correct:', b);

  if (a === b) return 10;

  const lev = (a, b) => {
    const matrix = [];
    for (let i = 0; i <= a.length; i++) matrix[i] = [i];
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }

    const distance = matrix[a.length][b.length];
    const similarity = 1 - distance / Math.max(a.length, b.length);
    console.log('Distance:', distance, 'Similarity:', similarity);

    return similarity >= 0.7 ? 5 : 0;
  };

  return lev(a, b);
};
