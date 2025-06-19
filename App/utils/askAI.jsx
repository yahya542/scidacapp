export default async function handler(req, res) {
  const { topic } = req.body;

  const API_KEY = 'Bearer sk-...'; // Ganti dengan API key kamu
  const MODEL = 'deepseek/deepseek-r1-0528-qwen3-8b:free';

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{
        role: 'user',
        content: `Buat SATU pertanyaan sederhana terkait "${topic}". Format jawabannya HARUS seperti ini:

Pertanyaan: <isi pertanyaan>
Jawaban: <isi jawaban>

Tanpa tambahan kalimat pembuka atau penutup.`
      }]
    }),
  });

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content || '';

  const questionMatch = raw.match(/Pertanyaan\s*:\s*(.+)/i);
  const answerMatch = raw.match(/Jawaban\s*:\s*([\s\S]+)/i);

  return res.status(200).json({
    question: questionMatch?.[1]?.trim() || 'Pertanyaan tidak ditemukan',
    answer: answerMatch?.[1]?.trim() || 'Jawaban tidak ditemukan',
  });
}
