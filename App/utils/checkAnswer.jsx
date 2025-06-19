export default async function handler(req, res) {
  const { question, correctAnswer, userAnswer } = req.body;

  const API_KEY = 'Bearer sk-...'; // Ganti juga
  const MODEL = 'deepseek/deepseek-r1-0528-qwen3-8b:free';

  const prompt = `Soal:\n${question}\n\nJawaban benar:\n${correctAnswer}\n\nJawaban user:\n${userAnswer}\n\nNilai 10 jika tepat, 8-9 jika hampir benar, 0-7 jika salah. Balas hanya dengan salah satu kata: Benar, Hampir, atau Salah.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: 'Kamu bertindak sebagai pemeriksa.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await response.json();
  const verdict = data.choices?.[0]?.message?.content?.trim();

  return res.status(200).json({ verdict });
}
