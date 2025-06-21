/**
 * Meminta pertanyaan dan jawaban dari AI melalui server Glitch.
 * @param {string} topic - Topik yang ingin dikirim ke AI.
 * @returns {{question: string, answer: string}}
 */

export const getAIQuestionAnswer = async (topic) => {
  try {
    const res = await fetch('https://creative-worried-produce.glitch.me/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!res.ok) {
      console.error('❌ Gagal dari server Glitch:', res.status);
      return {
        question: 'Tidak bisa mengambil pertanyaan',
        answer: 'Silakan coba beberapa saat lagi.',
      };
    }

    const data = await res.json();

    if (!data.question || !data.answer) {
      console.warn('⚠️ Data kosong dari AI:', data);
      return {
        question: 'Pertanyaan tidak ditemukan',
        answer: 'Jawaban tidak tersedia.',
      };
    }

    return {
      question: data.question,
      answer: data.answer,
    };
  } catch (error) {
    console.error('❌ Error fetch ke Glitch:', error);
    return {
      question: 'Terjadi kesalahan saat menghubungi AI',
      answer: 'Silakan periksa koneksi internet atau coba lagi nanti.',
    };
  }
};

import nlp from 'compromise';

export const checkAnswerWithAI = async (question, correctAnswer, userAnswer) => {
  const normalize = (text) => nlp(text).normalize({punctuation: true}).text().toLowerCase();

  const ai = normalize(correctAnswer);
  const user = normalize(userAnswer);

  console.log('🧪 AI:', ai);
  console.log('🧪 User:', user);

  const isSame = ai.includes(user) || user.includes(ai);
  const overlap = ai.split(' ').filter((word) => user.includes(word));
  const overlapScore = overlap.length / ai.split(' ').length;

  if (isSame || overlapScore >= 0.75) return 'Benar';
  if (overlapScore >= 0.5) return 'Hampir';
  return 'Salah';
};

                                                                                                            