import Constants from 'expo-constants';

const OPENROUTER_KEY = Constants.expoConfig.extra.OPENROUTER_KEY;

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
        'Authorization': `Bearer ${OPENROUTER_KEY}`, // ⬅️ Tambahan penting di sini
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
