from django.db import models
import uuid


class Surah(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    number = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=100)
    english_name = models.CharField(max_length=100)
    english_name_translation = models.CharField(max_length=100)
    number_of_ayahs = models.PositiveIntegerField()
    revelation_type = models.CharField(max_length=20)  # Meccan or Medinan
    
    class Meta:
        db_table = 'surahs'
        ordering = ['number']
    
    def __str__(self):
        return f"{self.number}. {self.name} ({self.english_name})"


class Ayah(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    surah = models.ForeignKey(Surah, on_delete=models.CASCADE, related_name='ayahs')
    number = models.PositiveIntegerField()
    text = models.TextField()  # Arabic text
    text_indo = models.TextField(blank=True)  # Indonesian translation
    text_en = models.TextField(blank=True)  # English translation
    juz = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'ayahs'
        ordering = ['surah', 'number']
        unique_together = ['surah', 'number']
    
    def __str__(self):
        return f"{self.surah.name}:{self.number}"


class PrayerTime(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    location = models.CharField(max_length=100, default='Jakarta')
    latitude = models.DecimalField(max_digits=10, decimal_places=8, default=-6.2088)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, default=106.8456)
    
    # Prayer times
    imsak = models.TimeField()
    fajr = models.TimeField()  # Subuh
    sunrise = models.TimeField()  # Terbit
    dhuhr = models.TimeField()  # Dzuhur
    asr = models.TimeField()  # Ashar
    maghrib = models.TimeField()  # Maghrib
    isha = models.TimeField()  # Isya
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'prayer_times'
        ordering = ['-date']
        unique_together = ['date', 'location']
    
    def __str__(self):
        return f"{self.location} - {self.date}"


class Dzikir(models.Model):
    CATEGORY_CHOICES = [
        ('morning', 'Pagi'),
        ('evening', 'Petang'),
        ('after_prayer', 'Setelah Shalat'),
        ('daily', 'Harian'),
        ('special', 'Khusus'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    arabic_text = models.TextField()
    latin_text = models.TextField(blank=True)
    translation = models.TextField()
    reference = models.CharField(max_length=200, blank=True)
    count = models.PositiveIntegerField(default=1)
    virtue = models.TextField(blank=True)
    
    class Meta:
        db_table = 'dzikirs'
        ordering = ['category', 'title']
    
    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"


class Bookmark(models.Model):
    BOOKMARK_TYPES = [
        ('surah', 'Surah'),
        ('ayah', 'Ayah'),
        ('dzikir', 'Dzikir'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='bookmarks')
    bookmark_type = models.CharField(max_length=10, choices=BOOKMARK_TYPES)
    surah = models.ForeignKey(Surah, on_delete=models.CASCADE, null=True, blank=True)
    ayah = models.ForeignKey(Ayah, on_delete=models.CASCADE, null=True, blank=True)
    dzikir = models.ForeignKey(Dzikir, on_delete=models.CASCADE, null=True, blank=True)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'bookmarks'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.bookmark_type}"


class QuranReadingProgress(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='quran_progress')
    last_read_surah = models.ForeignKey(Surah, on_delete=models.SET_NULL, null=True, blank=True)
    last_read_ayah = models.ForeignKey(Ayah, on_delete=models.SET_NULL, null=True, blank=True)
    completed_surahs = models.ManyToManyField(Surah, related_name='completed_by', blank=True)
    total_read_ayahs = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'quran_reading_progress'
    
    def __str__(self):
        return f"{self.user.username} - {self.total_read_ayahs} ayahs"
