from django.urls import path
from .views import (
    SurahListView,
    SurahDetailView,
    AyahListView,
    AyahDetailView,
    today_prayer_times,
    prayer_times_by_date,
    DzikirListView,
    DzikirDetailView,
    dzikir_by_category,
    BookmarkListCreateView,
    BookmarkDetailView,
    QuranReadingProgressView,
    update_reading_progress,
    search_quran,
    juz_detail,
    random_ayah
)

urlpatterns = [
    # Quran
    path('quran/surah/', SurahListView.as_view(), name='surah_list'),
    path('quran/surah/<int:number>/', SurahDetailView.as_view(), name='surah_detail'),
    path('quran/surah/<int:surah_number>/ayah/', AyahListView.as_view(), name='ayah_list'),
    path('quran/ayah/<uuid:pk>/', AyahDetailView.as_view(), name='ayah_detail'),
    path('quran/juz/<int:juz_number>/', juz_detail, name='juz_detail'),
    path('quran/search/', search_quran, name='search_quran'),
    path('quran/random/', random_ayah, name='random_ayah'),
    
    # Prayer Times
    path('prayer-times/today/', today_prayer_times, name='today_prayer_times'),
    path('prayer-times/<int:year>/<int:month>/<int:day>/', prayer_times_by_date, name='prayer_times_by_date'),
    
    # Dzikir
    path('dzikir/', DzikirListView.as_view(), name='dzikir_list'),
    path('dzikir/<uuid:pk>/', DzikirDetailView.as_view(), name='dzikir_detail'),
    path('dzikir/category/<str:category>/', dzikir_by_category, name='dzikir_by_category'),
    
    # Bookmarks
    path('bookmarks/', BookmarkListCreateView.as_view(), name='bookmark_list'),
    path('bookmarks/<uuid:pk>/', BookmarkDetailView.as_view(), name='bookmark_detail'),
    
    # Reading Progress
    path('progress/', QuranReadingProgressView.as_view(), name='reading_progress'),
    path('progress/update/', update_reading_progress, name='update_reading_progress'),
]
