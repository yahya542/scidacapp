from rest_framework import generics, permissions, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from datetime import date
from .models import Surah, Ayah, PrayerTime, Dzikir, Bookmark, QuranReadingProgress
from .serializers import (
    SurahListSerializer,
    SurahDetailSerializer,
    AyahSerializer,
    AyahDetailSerializer,
    PrayerTimeSerializer,
    DzikirSerializer,
    BookmarkSerializer,
    BookmarkCreateSerializer,
    QuranReadingProgressSerializer,
    QuranSearchSerializer
)


class SurahListView(generics.ListAPIView):
    queryset = Surah.objects.all()
    serializer_class = SurahListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'english_name', 'english_name_translation']
    ordering_fields = ['number', 'name']


class SurahDetailView(generics.RetrieveAPIView):
    queryset = Surah.objects.all()
    serializer_class = SurahDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'number'


class AyahListView(generics.ListAPIView):
    serializer_class = AyahSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        surah_number = self.kwargs.get('surah_number')
        return Ayah.objects.filter(surah__number=surah_number)


class AyahDetailView(generics.RetrieveAPIView):
    queryset = Ayah.objects.all()
    serializer_class = AyahDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def today_prayer_times(request):
    """Get today's prayer times"""
    location = request.query_params.get('location', 'Jakarta')
    today = date.today()
    
    try:
        prayer_time = PrayerTime.objects.get(date=today, location=location)
        serializer = PrayerTimeSerializer(prayer_time)
        return Response(serializer.data)
    except PrayerTime.DoesNotExist:
        return Response(
            {'message': 'Prayer times not available for today'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def prayer_times_by_date(request, year, month, day):
    """Get prayer times for specific date"""
    location = request.query_params.get('location', 'Jakarta')
    target_date = date(year, month, day)
    
    try:
        prayer_time = PrayerTime.objects.get(date=target_date, location=location)
        serializer = PrayerTimeSerializer(prayer_time)
        return Response(serializer.data)
    except PrayerTime.DoesNotExist:
        return Response(
            {'message': f'Prayer times not available for {target_date}'},
            status=status.HTTP_404_NOT_FOUND
        )


class DzikirListView(generics.ListAPIView):
    serializer_class = DzikirSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'arabic_text', 'translation']
    
    def get_queryset(self):
        queryset = Dzikir.objects.all()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class DzikirDetailView(generics.RetrieveAPIView):
    queryset = Dzikir.objects.all()
    serializer_class = DzikirSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dzikir_by_category(request, category):
    """Get dzikir by category"""
    dzikirs = Dzikir.objects.filter(category=category)
    serializer = DzikirSerializer(dzikirs, many=True)
    return Response(serializer.data)


class BookmarkListCreateView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BookmarkCreateSerializer
        return BookmarkSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookmarkDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)


class QuranReadingProgressView(generics.RetrieveUpdateAPIView):
    serializer_class = QuranReadingProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        progress, created = QuranReadingProgress.objects.get_or_create(
            user=self.request.user,
            defaults={
                'last_read_surah': None,
                'last_read_ayah': None,
                'total_read_ayahs': 0
            }
        )
        return progress


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_reading_progress(request):
    """Update Quran reading progress"""
    surah_id = request.data.get('surah_id')
    ayah_id = request.data.get('ayah_id')
    mark_completed = request.data.get('mark_completed', False)
    
    progress, created = QuranReadingProgress.objects.get_or_create(
        user=request.user,
        defaults={'total_read_ayahs': 0}
    )
    
    if surah_id:
        surah = get_object_or_404(Surah, id=surah_id)
        progress.last_read_surah = surah
        
        if mark_completed:
            progress.completed_surahs.add(surah)
    
    if ayah_id:
        ayah = get_object_or_404(Ayah, id=ayah_id)
        progress.last_read_ayah = ayah
        progress.total_read_ayahs += 1
    
    progress.save()
    
    serializer = QuranReadingProgressSerializer(progress)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def search_quran(request):
    """Search in Quran"""
    serializer = QuranSearchSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    query = serializer.validated_data['query']
    
    # Search in ayahs
    ayahs = Ayah.objects.filter(
        Q(text__icontains=query) |
        Q(text_indo__icontains=query) |
        Q(text_en__icontains=query)
    )[:20]
    
    # Search in surahs
    surahs = Surah.objects.filter(
        Q(name__icontains=query) |
        Q(english_name__icontains=query) |
        Q(english_name_translation__icontains=query)
    )[:10]
    
    return Response({
        'ayahs': AyahSerializer(ayahs, many=True).data,
        'surahs': SurahListSerializer(surahs, many=True).data,
        'query': query
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def juz_detail(request, juz_number):
    """Get all ayahs in a Juz"""
    ayahs = Ayah.objects.filter(juz=juz_number).select_related('surah')
    serializer = AyahSerializer(ayahs, many=True)
    return Response({
        'juz': juz_number,
        'ayahs': serializer.data
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def random_ayah(request):
    """Get a random ayah"""
    import random
    count = Ayah.objects.count()
    random_index = random.randint(0, count - 1)
    ayah = Ayah.objects.all()[random_index]
    serializer = AyahDetailSerializer(ayah)
    return Response(serializer.data)
