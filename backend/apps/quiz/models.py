from django.db import models
from django.conf import settings
import uuid


class Topic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='topics')
    topic = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'topics'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.topic[:50]}"


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    correct_answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'questions'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Question for {self.topic.topic[:30]}"


class QuizAttempt(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('correct', 'Correct'),
        ('partial', 'Partial'),
        ('incorrect', 'Incorrect'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_attempts')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='attempts')
    user_answer = models.TextField()
    verdict = models.CharField(max_length=20, choices=STATUS_CHOICES)
    score = models.PositiveIntegerField(default=0)
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'quiz_attempts'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.verdict} - {self.score}pts"
    
    def save(self, *args, **kwargs):
        # Add points to user if not already saved
        if self._state.adding and self.score > 0:
            self.user.add_points(self.score)
        super().save(*args, **kwargs)
