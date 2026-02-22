from django.urls import path
from .views import (
    leaderboard,
    top_three,
    leaderboard_list,
    AchievementListView,
    my_stats,
    user_rank
)

urlpatterns = [
    path('', leaderboard, name='leaderboard'),
    path('top-three/', top_three, name='top_three'),
    path('list/', leaderboard_list, name='leaderboard_list'),
    path('achievements/', AchievementListView.as_view(), name='achievements'),
    path('stats/', my_stats, name='my_stats'),
    path('rank/', user_rank, name='user_rank'),
]
