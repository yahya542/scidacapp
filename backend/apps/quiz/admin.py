from django.contrib import admin
from .models import Topic, Question, QuizAttempt


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['user', 'topic', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'topic']
    ordering = ['-created_at']


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['topic', 'question_text_short', 'created_at']
    search_fields = ['topic__topic', 'question_text']
    ordering = ['-created_at']
    
    def question_text_short(self, obj):
        return obj.question_text[:50] + '...' if len(obj.question_text) > 50 else obj.question_text
    question_text_short.short_description = 'Question'


@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'verdict', 'score', 'created_at']
    list_filter = ['verdict', 'created_at']
    search_fields = ['user__username', 'question__question_text']
    ordering = ['-created_at']
    readonly_fields = ['created_at']
