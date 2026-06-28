from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import uuid
from .models import Topic, Question, QuizAttempt
from .serializers import (
    TopicSerializer,
    QuestionSerializer,
    QuestionWithAnswerSerializer,
    QuizAttemptSerializer,
    GenerateQuestionRequestSerializer,
    CheckAnswerRequestSerializer,
    AIQuestionResponseSerializer,
    AIVerdictResponseSerializer
)
from drf_spectacular.utils import extend_schema
from .ai_service import AIService

status_map = {
    'benar': 'correct',
    'hampir': 'partial',
    'salah': 'incorrect'
}


class TopicListCreateView(generics.ListCreateAPIView):
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Topic.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TopicDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Topic.objects.filter(user=self.request.user)


class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Question.objects.filter(topic__user=self.request.user)


class QuizAttemptListView(generics.ListAPIView):
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return QuizAttempt.objects.filter(user=self.request.user)


@extend_schema(request=GenerateQuestionRequestSerializer, responses={200: AIQuestionResponseSerializer})
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def generate_question(request):
    """Generate a question from topic using AI and save to DB"""
    serializer = GenerateQuestionRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    topic_text = serializer.validated_data['topic']
    
    # Save topic to DB
    topic = Topic.objects.create(user=request.user, topic=topic_text)
    
    # Generate question using AI
    ai_response = AIService.generate_question(topic_text)
    
    # Save question to DB
    question = Question.objects.create(
        topic=topic,
        question_text=ai_response['question'],
        correct_answer=ai_response['answer']
    )
    
    # Return ONLY question (not answer)
    return Response({
        'question_id': str(question.id),
        'topic_id': str(topic.id),
        'question': ai_response['question'],
    })


@extend_schema(
    request=CheckAnswerRequestSerializer,
    responses={200: {'type': 'object', 'properties': {'verdict': 'string', 'score': 'integer', 'correct_answer': 'string', 'attempt_id': 'string'}}}
)
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def check_answer(request):
    """Check user answer by comparing with correct answer from DB"""
    serializer = CheckAnswerRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    question_id = serializer.validated_data['question_id']
    user_answer = serializer.validated_data['user_answer']
    
    # Get question and correct answer from DB
    question = get_object_or_404(Question, id=question_id, topic__user=request.user)
    correct_answer = question.correct_answer
    
    # Check answer using AI
    ai_result = AIService.check_answer(
        question.question_text,
        correct_answer,
        user_answer
    )
    
    # Save attempt
    attempt = QuizAttempt.objects.create(
        user=request.user,
        question=question,
        user_answer=user_answer,
        verdict=status_map.get(ai_result['verdict'], 'incorrect'),
        score=ai_result['score'],
        feedback=ai_result['feedback']
    )
    
    # Delete topic after attempt
    question.topic.delete()
    
    return Response({
        'attempt_id': str(attempt.id),
        'verdict': ai_result['verdict'],
        'score': ai_result['score'],
        'feedback': ai_result['feedback'],
        'correct_answer': correct_answer,
        'total_points': request.user.points
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_topics(request):
    """Get current user's topics"""
    topics = Topic.objects.filter(user=request.user).order_by('-created_at')[:10]
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_attempts(request):
    """Get current user's quiz attempts"""
    attempts = QuizAttempt.objects.filter(user=request.user).order_by('-created_at')[:20]
    serializer = QuizAttemptSerializer(attempts, many=True)
    return Response(serializer.data)
