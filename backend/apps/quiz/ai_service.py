import requests
from django.conf import settings


class AIService:
    BASE_URL = 'https://api.openrouter.ai/v1/chat/completions'
    
    @classmethod
    def _get_headers(cls):
        return {
            'Authorization': f'Bearer {settings.OPENROUTER_API_KEY}',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://studora.app',
            'X-Title': 'Studora App'
        }
    
    @classmethod
    def generate_question(cls, topic):
        """Generate a question and answer based on topic"""
        if not settings.OPENROUTER_API_KEY:
            # Fallback jika tidak ada API key
            return {
                'question': f'Apa yang kamu ketahui tentang {topic}?',
                'answer': f'Ini adalah jawaban contoh tentang {topic}'
            }
        
        prompt = f"""Buatkan 1 pertanyaan singkat dan jawabannya tentang topik: {topic}

Format output HARUS seperti ini:
PERTANYAAN: [pertanyaan singkat]
JAWABAN: [jawaban singkat]

Pastikan pertanyaan objektif dan jawabannya jelas."""

        try:
            response = requests.post(
                cls.BASE_URL,
                headers=cls._get_headers(),
                json={
                    'model': settings.OPENROUTER_MODEL,
                    'messages': [{'role': 'user', 'content': prompt}],
                    'max_tokens': 500
                },
                timeout=30
            )
            response.raise_for_status()
            
            content = response.json()['choices'][0]['message']['content']
            
            # Parse response
            question = ""
            answer = ""
            
            lines = content.split('\n')
            for line in lines:
                line = line.strip()
                if line.startswith('PERTANYAAN:'):
                    question = line.replace('PERTANYAAN:', '').strip()
                elif line.startswith('JAWABAN:'):
                    answer = line.replace('JAWABAN:', '').strip()
            
            if not question or not answer:
                # Fallback parsing
                parts = content.split('JAWABAN:')
                if len(parts) >= 2:
                    question = parts[0].replace('PERTANYAAN:', '').strip()
                    answer = parts[1].strip()
            
            return {
                'question': question or f'Apa yang kamu ketahui tentang {topic}?',
                'answer': answer or f'Jawaban tentang {topic}'
            }
            
        except Exception as e:
            print(f"AI Service Error: {e}")
            return {
                'question': f'Apa yang kamu ketahui tentang {topic}?',
                'answer': f'Ini adalah jawaban contoh tentang {topic}'
            }
    
    @classmethod
    def check_answer(cls, question, correct_answer, user_answer):
        """Check user answer against correct answer"""
        if not settings.OPENROUTER_API_KEY:
            # Fallback simple check
            similarity = cls._simple_similarity(correct_answer.lower(), user_answer.lower())
            if similarity > 0.8:
                return {'verdict': 'benar', 'score': 10, 'feedback': 'Jawaban kamu benar!'}
            elif similarity > 0.5:
                return {'verdict': 'hampir', 'score': 8, 'feedback': 'Hampir benar!'}
            else:
                return {'verdict': 'salah', 'score': 0, 'feedback': 'Jawaban kamu kurang tepat'}
        
        prompt = f"""Evaluasi jawaban user berikut:

PERTANYAAN: {question}
JAWABAN BENAR: {correct_answer}
JAWABAN USER: {user_answer}

Beri penilaian dalam format:
VERDICT: [benar/hampir/salah]
SCORE: [0-10]
FEEDBACK: [penjelasan singkat]

Kriteria:
- benar: jawaban user benar atau mendekati 90%
- hampir: jawaban user 50-80% benar
- salah: jawaban user kurang dari 50% benar"""

        try:
            response = requests.post(
                cls.BASE_URL,
                headers=cls._get_headers(),
                json={
                    'model': settings.OPENROUTER_MODEL,
                    'messages': [{'role': 'user', 'content': prompt}],
                    'max_tokens': 300
                },
                timeout=30
            )
            response.raise_for_status()
            
            content = response.json()['choices'][0]['message']['content']
            
            # Parse response
            verdict = 'salah'
            score = 0
            feedback = 'Jawaban kamu kurang tepat'
            
            lines = content.split('\n')
            for line in lines:
                line = line.strip()
                if line.startswith('VERDICT:'):
                    v = line.replace('VERDICT:', '').strip().lower()
                    if 'benar' in v:
                        verdict = 'benar'
                    elif 'hampir' in v or 'partial' in v:
                        verdict = 'hampir'
                    else:
                        verdict = 'salah'
                elif line.startswith('SCORE:'):
                    try:
                        score = int(line.replace('SCORE:', '').strip())
                    except:
                        score = 0
                elif line.startswith('FEEDBACK:'):
                    feedback = line.replace('FEEDBACK:', '').strip()
            
            # Normalize score
            if verdict == 'benar':
                score = max(score, 10)
            elif verdict == 'hampir':
                score = max(score, 8) if score == 0 else min(score, 9)
            else:
                score = min(score, 5)
            
            return {
                'verdict': verdict,
                'score': score,
                'feedback': feedback
            }
            
        except Exception as e:
            print(f"AI Service Error: {e}")
            # Fallback
            similarity = cls._simple_similarity(correct_answer.lower(), user_answer.lower())
            if similarity > 0.8:
                return {'verdict': 'benar', 'score': 10, 'feedback': 'Jawaban kamu benar!'}
            elif similarity > 0.5:
                return {'verdict': 'hampir', 'score': 8, 'feedback': 'Hampir benar!'}
            else:
                return {'verdict': 'salah', 'score': 0, 'feedback': 'Jawaban kamu kurang tepat'}
    
    @staticmethod
    def _simple_similarity(str1, str2):
        """Simple similarity calculation as fallback"""
        if not str1 or not str2:
            return 0.0
        
        set1 = set(str1.split())
        set2 = set(str2.split())
        
        if not set1 or not set2:
            return 0.0
        
        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        
        return intersection / union if union > 0 else 0.0
