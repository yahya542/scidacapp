const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Tes koneksi
app.get('/', (req, res) => {
  res.send('🚀 Studora-AI backend aktif! Gunakan POST /generate');
});

app.post('/generate', async (req, res) => {
  const topic = req.body.topic;
  if (!topic) {
    return res.status(400).json({ error: 'Topik wajib diisi.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.OPENROUTER_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          {
            role: 'user',
            content: 'Buat SATU pertanyaan sederhana tentang "' + topic + '" lalu jawab. Format HARUS seperti ini:\n\n' +
              'Pertanyaan: <isi>\nJawaban: <isi>\n\n' +
              'Jangan beri pembuka atau penjelasan tambahan.'
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[OpenRouter ERROR]', data);
      return res.status(502).json({ error: 'Gagal dari OpenRouter', detail: data });
    }

    // Kompatibel tanpa optional chaining
    let raw = '';
    if (
      data &&
      data.choices &&
      Array.isArray(data.choices) &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      raw = data.choices[0].message.content;
    }

    const questionMatch = raw.match(/Pertanyaan\s*:\s*(.+)/i);
    const answerMatch = raw.match(/Jawaban\s*:\s*([\s\S]+)/i);

    res.json({
      question: questionMatch && questionMatch[1] ? questionMatch[1].trim() : 'Pertanyaan tidak ditemukan',
      answer: answerMatch && answerMatch[1] ? answerMatch[1].trim() : 'Jawaban tidak ditemukan'
    });

  } catch (err) {
    console.error('[ERROR]', err.message);
    res.status(500).json({ error: 'Gagal memproses permintaan', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log('✅ Studora-AI backend berjalan di port', PORT);
});
