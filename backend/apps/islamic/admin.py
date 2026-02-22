from django.contrib import admin
from .models import Surah, Ayah, PrayerTime, Dzikir, Bookmark, QuranReadingProgress


@admin.register(Surah)
class SurahAdmin(admin.ModelAdmin):
    list_display = ['number', 'name', 'english_name', 'number_of_ayahs', 'revelation_type']
    list_filter = ['revelation_type']
    search_fields = ['name', 'english_name']
    ordering = ['number']


@admin.register(Ayah)
class AyahAdmin(admin.ModelAdmin):
    list_display = ['surah', 'number', 'juz', 'text_short']
    list_filter = ['juz', 'surah']
    search_fields = ['text', 'text_indo', 'text_en']
    ordering = ['surah', 'number']
    
    def text_short(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    text_short.short_description = 'Text'


@admin.register(PrayerTime)
class PrayerTimeAdmin(admin.ModelAdmin):
    list_display = ['date', 'location', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha']
    list_filter = ['location', 'date']
    search_fields = ['location']
    ordering = ['-date']
    date_hierarchy = 'date'


@admin.register(Dzikir)
class DzikirAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'count', 'reference']
    list_filter = ['category']
    search_fields = ['title', 'arabic_text', 'translation']
    ordering = ['category', 'title']


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ['user', 'bookmark_type', 'created_at']
    list_filter = ['bookmark_type', 'created_at']
    search_fields = ['user__username', 'note']
    ordering = ['-created_at']


@admin.register(QuranReadingProgress)
class QuranReadingProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'last_read_surah', 'total_read_ayahs', 'updated_at']
    search_fields = ['user__username']
    ordering = ['-updated_at']
    filter_horizontal = ['completed_surahs']
