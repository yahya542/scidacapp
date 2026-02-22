from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from apps.quiz.models import QuizAttempt
from .models import Achievement
from .serializers import (
    LeaderboardUserSerializer,
    LeaderboardSerializer,
    AchievementSerializer,
    UserStatsSerializer
)

User = get_user_model()


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def leaderboard(request):
    """Get leaderboard data - top 10 users"""
    # Get top 10 users by points
    top_users = User.objects.filter(is_active=True).order_by('-points')[:10]
    
    top_three = top_users[:3]
    others = top_users[3:]
    
    # Get current user's rank
    user_points = request.user.points
    higher_points_count = User.objects.filter(points__gt=user_points).count()
    my_rank = higher_points_count + 1
    
    serializer = LeaderboardSerializer({
        'top_three': top_three,
        'others': others,
        'my_rank': my_rank,
        'my_points': user_points
    })
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def top_three(request):
    """Get top 3 users for podium display"""
    top_three_users = User.objects.filter(is_active=True).order_by('-points')[:3]
    serializer = LeaderboardUserSerializer(top_three_users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def leaderboard_list(request):
    """Get full leaderboard list (top 10)"""
    top_users = User.objects.filter(is_active=True).order_by('-points')[:10]
    serializer = LeaderboardUserSerializer(top_users, many=True)
    return Response(serializer.data)


class AchievementListView(generics.ListAPIView):
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Achievement.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_stats(request):
    """Get current user's statistics"""
    user = request.user
    
    # Get quiz stats
    quiz_attempts = QuizAttempt.objects.filter(user=user)
    total_quizzes = quiz_attempts.count()
    correct_answers = quiz_attempts.filter(verdict='correct').count()
    accuracy = (correct_answers / total_quizzes * 100) if total_quizzes > 0 else 0
    
    # Get rank
    higher_points = User.objects.filter(points__gt=user.points).count()
    rank = higher_points + 1
    
    # Get achievements count
    achievements_count = Achievement.objects.filter(user=user).count()
    
    serializer = UserStatsSerializer({
        'total_points': user.points,
        'rank': rank,
        'total_quizzes': total_quizzes,
        'correct_answers': correct_answers,
        'accuracy': round(accuracy, 2),
        'achievements_count': achievements_count
    })
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_rank(request):
    """Get current user's rank"""
    higher_points = User.objects.filter(points__gt=request.user.points).count()
    rank = higher_points + 1
    
    return Response({
        'rank': rank,
        'points': request.user.points,
        'username': request.user.username
    })
