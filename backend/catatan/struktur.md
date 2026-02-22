backend/
├── manage.py
├── requirements.txt
├── .env.example
├── studora_backend/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── apps/
    ├── __init__.py
    ├── users/
    │   ├── __init__.py
    │   ├── apps.py
    │   ├── models.py (User, UserActivity)
    │   ├── managers.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── permissions.py
    ├── quiz/
    │   ├── __init__.py
    │   ├── apps.py
    │   ├── models.py (Topic, Question, QuizAttempt)
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── ai_service.py
    ├── leaderboard/
    │   ├── __init__.py
    │   ├── apps.py
    │   ├── models.py (LeaderboardEntry, Achievement)
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── admin.py
    └── islamic/
        ├── __init__.py
        ├── apps.py
        ├── models.py (Surah, Ayah, PrayerTime, Dzikir, Bookmark, QuranReadingProgress)
        ├── serializers.py
        ├── views.py
        ├── urls.py
        ├── admin.py
        └── management/
            └── commands/
                ├── import_quran.py
                └── create_superadmin.py