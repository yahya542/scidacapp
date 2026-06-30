from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# Semua path dimasukkan ke dalam list 'studora_patterns'
studora_patterns = [
    path('api/auth/', include('apps.users.urls')),
    path('api/quiz/', include('apps.quiz.urls')),
    path('api/leaderboard/', include('apps.leaderboard.urls')),
    path('api/islamic/', include('apps.islamic.urls')),

    # Tempat file schema JSON/YAML dihasilkan
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # 🌟 PERUBAHAN DI SINI: Paksa endpoint skema mengarah ke path dengan prefix penuh
    path('', SpectacularSwaggerView.as_view(url='/studora/api/schema/'), name='swagger-ui'),
]

urlpatterns = [
    path('', include(studora_patterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
