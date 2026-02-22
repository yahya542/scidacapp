from rest_framework import serializers
from .models import Topic, Question, QuizAttempt


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'topic', 'created_at']
        read_only_fields = ['id', 'created_at']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'created_at']
        read_only_fields = ['id', 'created_at']


class QuestionWithAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'correct_answer', 'created_at']
        read_only_fields = ['id', 'created_at']


class QuizAttemptSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(source='question.question_text', read_only=True)
    correct_answer = serializers.CharField(source='question.correct_answer', read_only=True)
    
    class Meta:
        model = QuizAttempt
        fields = ['id', 'question', 'question_text', 'user_answer', 'correct_answer', 'verdict', 'score', 'feedback', 'created_at']
        read_only_fields = ['id', 'verdict', 'score', 'feedback', 'created_at']


class QuizAttemptResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAttempt
        fields = ['id', 'verdict', 'score', 'feedback', 'created_at']


class GenerateQuestionRequestSerializer(serializers.Serializer):
    topic = serializers.CharField(max_length=500, required=True)


class CheckAnswerRequestSerializer(serializers.Serializer):
    question_id = serializers.UUIDField(required=True)
    user_answer = serializers.CharField(required=True)


class AIQuestionResponseSerializer(serializers.Serializer):
    question = serializers.CharField()
    answer = serializers.CharField()


class AIVerdictResponseSerializer(serializers.Serializer):
    verdict = serializers.CharField()
    score = serializers.IntegerField()
    feedback = serializers.CharField()
