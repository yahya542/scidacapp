
import { AI_API_CONFIG } from './apiconfig';
export const getAIQuestionAnswer = async (topic) => {
  try {
    const res = await fetch(AI_API_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        Authorization: AI_API_CONFIG.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_API_CONFIG.model,
        messages: [
          {
            role: 'user',
            content: `Buat SATU pertanyaan sederhana terkait "${topic}". Format jawabannya HARUS seperti ini:
            
Pertanyaan: <isi pertanyaan>
Jawaban: <isi jawaban>

Tanpa tambahan kalimat pembuka atau penutup.`,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('AI error response:', data);
      throw new Error(data.error?.message || 'Gagal panggil AI');
    }

    const raw = data.choices?.[0]?.message?.content || '';
    console.log('AI response (raw):', raw);

    // Regex parsing
    const questionMatch = raw.match(/(?:\*\*)?Pertanyaan\s*:\s*(.+)/i);
    const answerMatch = raw.match(/(?:\*\*)?Jawaban\s*:\s*([\s\S]+)/i);

    return {
      question: questionMatch?.[1]?.trim() || 'Pertanyaan tidak ditemukan',
      answer: answerMatch?.[1]?.trim() || 'Jawaban tidak ditemukan',
    };
  } catch (err) {
    console.error('getAIQuestionAnswer error:', err);
    throw err;
  }
};

export const checkAnswerWithAI = async (question, correctAnswer, userAnswer) => {
  try {
    const res = await fetch(AI_API_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        Authorization: AI_API_CONFIG.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_API_CONFIG.model,
        messages: [
          { role: 'system', content: 'Kamu bertindak sebagai pemeriksa.' },
          {
            role: 'user',
            content:
              `Soal:\n${question}\n\n` +
              `Jawaban benar:\n${correctAnswer}\n\n` +
              `Jawaban user:\n${userAnswer}\n\n` +
              `Nilai 10 jika tepat, 8-9 jika hampir benar, 0-7 jika salah. ` +
              `Balas hanya dengan salah satu kata: Benar, Hampir, atau Salah.`,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('AI checkAnswer error:', data);
      throw new Error(data.error?.message || 'Gagal memeriksa jawaban');
    }

    const verdict = data.choices?.[0]?.message?.content?.trim();
    console.log('Penilaian AI:', verdict);
    return verdict;
  } catch (err) {
    console.error('checkAnswerWithAI error:', err);
    throw err;
  }
};

