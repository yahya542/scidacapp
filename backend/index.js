const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topik wajib diisi.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          {
            role: 'user',
            content: `Buat SATU pertanyaan sederhana tentang "${topic}" lalu jawab. Format HARUS seperti ini:\n\n` +
                     `Pertanyaan: <isi>\nJawaban: <isi>\n\n` +
                     `Jangan beri pembuka atau penjelasan tambahan.`,
          }
        ]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gagal dari OpenRouter:', data);
      return res.status(500).json({ error: 'Gagal dari OpenRouter' });
    }

    const raw = data.choices?.[0]?.message?.content || '';
    console.log('AI Response:', raw);

    const questionMatch = raw.match(/Pertanyaan\s*:\s*(.+)/i);
    const answerMatch = raw.match(/Jawaban\s*:\s*([\s\S]+)/i);

    res.json({
      question: questionMatch?.[1]?.trim() || 'Pertanyaan tidak ditemukan',
      answer: answerMatch?.[1]?.trim() || 'Jawaban tidak ditemukan',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Gagal memproses permintaan' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Studora AI (DeepSeek - OpenRouter) running on port ${PORT}`);
});
