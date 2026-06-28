import requests
from django.conf import settings
from rapidfuzz import fuzz
import re


class AIService:
    BASE_URL = 'https://openrouter.ai/api/v1/chat/completions'
    DEFAULT_MODEL = 'mistralai/mistral-7b-instruct:free'

    @staticmethod
    def _get_setting(name, default=None):
        return getattr(settings, name, default)

    @classmethod
    def _get_headers(cls):
        api_key = cls._get_setting("API_KEY")
        return {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        }

    @classmethod
    def _get_model(cls):
        model = cls._get_setting("MODEL")
        return model if model else cls.DEFAULT_MODEL

    @classmethod
    def _call_api(cls, prompt):
        api_key = cls._get_setting("API_KEY")
        print(f"🔑 API_KEY being used: {api_key[:20]}..." if api_key else "❌ API_KEY is None")

        if not api_key:
            print("❌ API_KEY tidak ditemukan")
            return None

        try:
            response = requests.post(
                cls.BASE_URL,
                headers=cls._get_headers(),
                json={
                    'model': cls._get_model(),
                    'messages': [{'role': 'user', 'content': prompt}]
                },
                timeout=30
            )

            print("🔵 STATUS:", response.status_code)
            print("🔵 RAW:", response.text)

            response.raise_for_status()

            try:
                result = response.json()
            except:
                result = {"raw": response.text}

            print("🟢 JSON:", result)

            return result

        except Exception as e:
            print(f"❌ AI API Error: {e}")
            return None

    # =========================
    # EXTRACT CONTENT (PENTING)
    # =========================
    @staticmethod
    def _extract_content(result):
        try:
            return result.get('choices', [{}])[0].get('message', {}).get('content', '')
        except Exception as e:
            print(f"⚠️ Extract error: {e}, result: {result}")
            return ""

    # =========================
    # GENERATE QUESTION
    # =========================
    @classmethod
    def generate_question(cls, topic):
        if not cls._get_setting("API_KEY"):
            return cls._fallback(topic)

        prompt = f"""
Buatkan 1 pertanyaan dan jawaban singkat tentang topik: {topic}

Format:
PERTANYAAN: ...
JAWABAN: ...
"""

        try:
            result = cls._call_api(prompt)

            if not result:
                return cls._fallback(topic)

            content = cls._extract_content(result)

            question, answer = cls._parse_qa(content, topic)

            return {
                'question': question,
                'answer': answer
            }

        except Exception as e:
            print(f"❌ Generate Error: {e}")
            return cls._fallback(topic)

    # =========================
    # CHECK ANSWER (FUZZY)
    # =========================
    @classmethod
    def check_answer(cls, question, correct_answer, user_answer):

        correct = cls._clean_text(correct_answer)
        user = cls._clean_text(user_answer)

        fuzzy_score = fuzz.token_sort_ratio(correct, user) / 100
        simple_score = cls._simple_similarity(correct, user)

        similarity = (fuzzy_score + simple_score) / 2

        if similarity > 0.85:
            return cls._result('benar', 10, 'Jawaban kamu benar!', similarity)

        if similarity > 0.6:
            return cls._result('hampir', 7, 'Jawaban kamu hampir benar!', similarity)

        return cls._result('salah', 0, 'Jawaban kurang tepat', similarity)

    # =========================
    # PARSE QA (LEBIH KUAT)
    # =========================
    @staticmethod
    def _parse_qa(content, topic):
        if not content:
            return AIService._fallback(topic).values()

        question = ""
        answer = ""

        for line in content.split('\n'):
            line_clean = line.strip().lower()

            if 'pertanyaan' in line_clean:
                parts = line.split(':', 1)
                if len(parts) > 1:
                    question = parts[1].strip()

            elif 'jawaban' in line_clean:
                parts = line.split(':', 1)
                if len(parts) > 1:
                    answer = parts[1].strip()

        if not question:
            question = f'Apa yang kamu ketahui tentang {topic}?'

        if not answer:
            answer = f'Jawaban tentang {topic}'

        return question, answer

    # =========================
    # UTILS
    # =========================
    @staticmethod
    def _clean_text(text):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        return text

    @staticmethod
    def _simple_similarity(str1, str2):
        set1 = set(str1.split())
        set2 = set(str2.split())

        if not set1 or not set2:
            return 0.0

        return len(set1 & set2) / len(set1 | set2)

    @staticmethod
    def _result(verdict, score, feedback, similarity):
        return {
            'verdict': verdict,
            'score': score,
            'feedback': feedback,
            'similarity': round(similarity, 2)
        }

    @staticmethod
    def _fallback(topic):
        return {
            'question': f'Apa yang kamu ketahui tentang {topic}?',
            'answer': f'Jawaban tentang {topic}'
        }