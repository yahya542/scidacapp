from django.contrib import admin
from .models import LeaderboardEntry, Achievement


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ['user', 'rank', 'weekly_points', 'monthly_points', 'updated_at']
    list_filter = ['updated_at']
    search_fields = ['user__username']
    ordering = ['rank']


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['user', 'achievement_type', 'title', 'earned_at']
    list_filter = ['achievement_type', 'earned_at']
    search_fields = ['user__username', 'title']
    ordering = ['-earned_at']
