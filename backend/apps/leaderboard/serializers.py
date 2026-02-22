from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import LeaderboardEntry, Achievement

User = get_user_model()


class LeaderboardUserSerializer(serializers.ModelSerializer):
    rank = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'points', 'avatar', 'rank']
    
    def get_rank(self, obj):
        # Calculate rank based on points
        higher_points = User.objects.filter(points__gt=obj.points).count()
        return higher_points + 1


class LeaderboardSerializer(serializers.Serializer):
    top_three = LeaderboardUserSerializer(many=True)
    others = LeaderboardUserSerializer(many=True)
    my_rank = serializers.IntegerField()
    my_points = serializers.IntegerField()


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'achievement_type', 'title', 'description', 'icon', 'earned_at']
        read_only_fields = ['id', 'earned_at']


class UserStatsSerializer(serializers.Serializer):
    total_points = serializers.IntegerField()
    rank = serializers.IntegerField()
    total_quizzes = serializers.IntegerField()
    correct_answers = serializers.IntegerField()
    accuracy = serializers.FloatField()
    achievements_count = serializers.IntegerField()
