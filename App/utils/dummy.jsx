

export function generateDummyQA(topic) {
  return {
    question: `Apa yang kamu ketahui tentang ${topic}?`,
    answer: `'${topic}.`,
  };
}

export function checkAnswer(userAnswer, correctAnswer) {
  // Versi simple: cuma cocokin teks (bisa pakai NLP nanti kalau serius)
  const cleanedUserAnswer = userAnswer.trim().toLowerCase();
  const cleanedCorrectAnswer = correctAnswer.trim().toLowerCase();

  return cleanedUserAnswer === cleanedCorrectAnswer;
}
