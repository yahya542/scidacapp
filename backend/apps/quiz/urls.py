from django.urls import path
from .views import (
    TopicListCreateView,
    TopicDetailView,
    QuestionListView,
    QuizAttemptListView,
    generate_question,
    check_answer,
    my_topics,
    my_attempts
)

urlpatterns = [
    path('topics/', TopicListCreateView.as_view(), name='topic_list'),
    path('topics/<uuid:pk>/', TopicDetailView.as_view(), name='topic_detail'),
    path('questions/', QuestionListView.as_view(), name='question_list'),
    path('attempts/', QuizAttemptListView.as_view(), name='attempt_list'),
    path('generate/', generate_question, name='generate_question'),
    path('check/', check_answer, name='check_answer'),
    path('my-topics/', my_topics, name='my_topics'),
    path('my-attempts/', my_attempts, name='my_attempts'),
]
