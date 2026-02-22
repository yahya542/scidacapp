from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Topic, Question, QuizAttempt
from .serializers import (
    TopicSerializer,
    QuestionSerializer,
    QuestionWithAnswerSerializer,
    QuizAttemptSerializer,
    GenerateQuestionRequestSerializer,
    CheckAnswerRequestSerializer
)
from .ai_service import AIService


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


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def generate_question(request):
    """Generate a question from topic using AI"""
    serializer = GenerateQuestionRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    topic_text = serializer.validated_data['topic']
    
    # Save topic
    topic = Topic.objects.create(user=request.user, topic=topic_text)
    
    # Generate question using AI
    ai_response = AIService.generate_question(topic_text)
    
    # Save question
    question = Question.objects.create(
        topic=topic,
        question_text=ai_response['question'],
        correct_answer=ai_response['answer']
    )
    
    return Response({
        'topic_id': str(topic.id),
        'question_id': str(question.id),
        'question': ai_response['question'],
        'answer': ai_response['answer']
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def check_answer(request):
    """Check user answer using AI"""
    serializer = CheckAnswerRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    question_id = serializer.validated_data['question_id']
    user_answer = serializer.validated_data['user_answer']
    
    # Get question
    question = get_object_or_404(Question, id=question_id, topic__user=request.user)
    
    # Check answer using AI
    ai_result = AIService.check_answer(
        question.question_text,
        question.correct_answer,
        user_answer
    )
    
    # Map verdict to status
    status_map = {
        'benar': 'correct',
        'hampir': 'partial',
        'salah': 'incorrect'
    }
    
    # Save attempt
    attempt = QuizAttempt.objects.create(
        user=request.user,
        question=question,
        user_answer=user_answer,
        verdict=status_map.get(ai_result['verdict'], 'incorrect'),
        score=ai_result['score'],
        feedback=ai_result['feedback']
    )
    
    # Delete topic after attempt (like in original app)
    question.topic.delete()
    
    return Response({
        'attempt_id': str(attempt.id),
        'verdict': ai_result['verdict'],
        'score': ai_result['score'],
        'feedback': ai_result['feedback'],
        'correct_answer': question.correct_answer,
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
