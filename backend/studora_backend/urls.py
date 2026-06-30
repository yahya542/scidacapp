# urls.py
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

studora_patterns = [
    path('api/auth/', include('apps.users.urls')),
    path('api/quiz/', include('apps.quiz.urls')),
    path('api/leaderboard/', include('apps.leaderboard.urls')),
    path('api/islamic/', include('apps.islamic.urls')),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

# Jika di server production, bungkus dengan prefix 'studora/'
# Jika di local (DEBUG = True), biarkan menggunakan root biasa '' agar tidak perlu ketik /studora/ di local
if not settings.DEBUG:
    urlpatterns = [
        path('studora/', include(studora_patterns)),
    ]
else:
    urlpatterns = [
        path('', include(studora_patterns)),
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)