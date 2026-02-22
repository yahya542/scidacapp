from rest_framework import serializers
from .models import Surah, Ayah, PrayerTime, Dzikir, Bookmark, QuranReadingProgress


class SurahListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surah
        fields = ['id', 'number', 'name', 'english_name', 'english_name_translation', 'number_of_ayahs', 'revelation_type']


class SurahDetailSerializer(serializers.ModelSerializer):
    ayahs = serializers.SerializerMethodField()
    
    class Meta:
        model = Surah
        fields = ['id', 'number', 'name', 'english_name', 'english_name_translation', 'number_of_ayahs', 'revelation_type', 'ayahs']
    
    def get_ayahs(self, obj):
        ayahs = obj.ayahs.all()
        return AyahSerializer(ayahs, many=True).data


class AyahSerializer(serializers.ModelSerializer):
    surah_name = serializers.CharField(source='surah.name', read_only=True)
    
    class Meta:
        model = Ayah
        fields = ['id', 'number', 'text', 'text_indo', 'text_en', 'juz', 'surah_name']


class AyahDetailSerializer(serializers.ModelSerializer):
    surah = SurahListSerializer(read_only=True)
    
    class Meta:
        model = Ayah
        fields = ['id', 'number', 'text', 'text_indo', 'text_en', 'juz', 'surah']


class PrayerTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerTime
        fields = ['id', 'date', 'location', 'imsak', 'fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']


class DzikirSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Dzikir
        fields = ['id', 'title', 'category', 'category_display', 'arabic_text', 'latin_text', 'translation', 'reference', 'count', 'virtue']


class BookmarkSerializer(serializers.ModelSerializer):
    surah_detail = SurahListSerializer(source='surah', read_only=True)
    ayah_detail = AyahSerializer(source='ayah', read_only=True)
    dzikir_detail = DzikirSerializer(source='dzikir', read_only=True)
    
    class Meta:
        model = Bookmark
        fields = ['id', 'bookmark_type', 'surah', 'surah_detail', 'ayah', 'ayah_detail', 'dzikir', 'dzikir_detail', 'note', 'created_at']
        read_only_fields = ['id', 'created_at']


class BookmarkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['bookmark_type', 'surah', 'ayah', 'dzikir', 'note']
    
    def validate(self, data):
        bookmark_type = data.get('bookmark_type')
        
        if bookmark_type == 'surah' and not data.get('surah'):
            raise serializers.ValidationError({'surah': 'Surah is required for surah bookmark'})
        if bookmark_type == 'ayah' and not data.get('ayah'):
            raise serializers.ValidationError({'ayah': 'Ayah is required for ayah bookmark'})
        if bookmark_type == 'dzikir' and not data.get('dzikir'):
            raise serializers.ValidationError({'dzikir': 'Dzikir is required for dzikir bookmark'})
        
        return data


class QuranReadingProgressSerializer(serializers.ModelSerializer):
    last_read_surah_detail = SurahListSerializer(source='last_read_surah', read_only=True)
    last_read_ayah_detail = AyahSerializer(source='last_read_ayah', read_only=True)
    completed_surahs_count = serializers.SerializerMethodField()
    
    class Meta:
        model = QuranReadingProgress
        fields = ['id', 'last_read_surah', 'last_read_surah_detail', 'last_read_ayah', 'last_read_ayah_detail', 'completed_surahs_count', 'total_read_ayahs', 'updated_at']
        read_only_fields = ['id', 'updated_at']
    
    def get_completed_surahs_count(self, obj):
        return obj.completed_surahs.count()


class QuranSearchSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, min_length=2)
