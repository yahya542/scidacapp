from django.db import models
from django.conf import settings
import uuid


class LeaderboardEntry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='leaderboard_entry'
    )
    rank = models.PositiveIntegerField(default=0)
    weekly_points = models.PositiveIntegerField(default=0)
    monthly_points = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'leaderboard_entries'
        ordering = ['-rank']
        verbose_name_plural = 'Leaderboard Entries'
    
    def __str__(self):
        return f"#{self.rank} - {self.user.username} ({self.user.points} pts)"


class Achievement(models.Model):
    ACHIEVEMENT_TYPES = [
        ('first_quiz', 'First Quiz'),
        ('streak_7', '7 Day Streak'),
        ('streak_30', '30 Day Streak'),
        ('points_100', '100 Points'),
        ('points_500', '500 Points'),
        ('points_1000', '1000 Points'),
        ('top_10', 'Top 10 Leaderboard'),
        ('top_3', 'Top 3 Leaderboard'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='achievements'
    )
    achievement_type = models.CharField(max_length=50, choices=ACHIEVEMENT_TYPES)
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True)
    earned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'achievements'
        ordering = ['-earned_at']
        unique_together = ['user', 'achievement_type']
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"
