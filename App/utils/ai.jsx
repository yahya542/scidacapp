// utils/ai.js

/**
 * Mengambil pertanyaan dan jawaban dari server Glitch
 * @param {string} topic - Topik yang dikirim user
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

/**
 * Mengevaluasi jawaban user menggunakan AI lewat server Glitch
 * @param {string} question - Pertanyaan dari AI
 * @param {string} correctAnswer - Jawaban AI yang benar
 * @param {string} userAnswer - Jawaban dari user
 * @returns {string} - Hasil evaluasi, misalnya: "Benar", "Hampir benar", "Salah"
 */
export const checkAnswerWithAI = async (question, correctAnswer, userAnswer) => {
  try {
    const res = await fetch('https://creative-worried-produce.glitch.me/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        correctAnswer,
        userAnswer,
      }),
    });

    const data = await res.json();

    if (!data.verdict) {
      return 'Evaluasi tidak tersedia';
    }

    return data.verdict;
  } catch (err) {
    console.error('❌ Error saat evaluasi ke Glitch:', err);
    return 'Terjadi kesalahan saat mengevaluasi jawaban';
  }
};
