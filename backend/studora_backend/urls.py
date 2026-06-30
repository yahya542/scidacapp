from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# 🌟 GANTI SpectacularSwaggerView dengan SpectacularSwaggerSplitView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerSplitView

studora_patterns = [
    path('api/auth/', include('apps.users.urls')),
    path('api/quiz/', include('apps.quiz.urls')),
    path('api/leaderboard/', include('apps.leaderboard.urls')),
    path('api/islamic/', include('apps.islamic.urls')),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # 🌟 GUNAKAN SpectacularSwaggerSplitView di sini
    path('', SpectacularSwaggerSplitView.as_view(url_name='schema'), name='swagger-ui'),
]

urlpatterns = [
    path('', include(studora_patterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
