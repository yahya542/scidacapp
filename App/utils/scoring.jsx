// utils/scoring.js

/**
 * Menilai kemiripan jawaban user dengan jawaban benar.
 *
 * • Skor 10  → jawaban persis sama (case‑insensitive, trimmed).
 * • Skor 8   → jawaban hampir sama (similarity ≥ 0.8).
 * • Skor 0   → sisanya.
 *
 * @param {string} userAns   Jawaban dari user
 * @param {string} correctAns Jawaban benar
 * @returns {0|8|10}
 */
export const getScore = (userAns, correctAns) => {
  const norm = (s) => (s ?? '').toString().trim().toLowerCase();
  const ua = norm(userAns);
  const ca = norm(correctAns);

  if (!ua || !ca) return 0;        // tidak ada jawaban ⇒ 0
  if (ua === ca) return 10;        // persis sama ⇒ 10

  // ――― Levenshtein Distance ―――
  const lev = (a, b) => {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return dp[m][n];
  };

  const distance = lev(ua, ca);
  const similarity = 1 - distance / Math.max(ua.length, ca.length);

  return similarity >= 0.8 ? 8 : 0;
};