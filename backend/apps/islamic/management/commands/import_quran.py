import json
import requests
from django.core.management.base import BaseCommand
from apps.islamic.models import Surah, Ayah


class Command(BaseCommand):
    help = 'Import Quran data from API'

    def handle(self, *args, **options):
        self.stdout.write('Fetching Quran data...')
        
        try:
            # Fetch from API
            response = requests.get('https://api.alquran.cloud/v1/quran/quran-uthmani')
            data = response.json()
            
            if data['code'] != 200:
                self.stdout.write(self.style.ERROR('Failed to fetch Quran data'))
                return
            
            surahs_data = data['data']['surahs']
            
            for surah_data in surahs_data:
                surah, created = Surah.objects.get_or_create(
                    number=surah_data['number'],
                    defaults={
                        'name': surah_data['name'],
                        'english_name': surah_data['englishName'],
                        'english_name_translation': surah_data['englishNameTranslation'],
                        'number_of_ayahs': surah_data['numberOfAyahs'],
                        'revelation_type': surah_data['revelationType']
                    }
                )
                
                if created:
                    self.stdout.write(f'Created Surah: {surah.name}')
                else:
                    self.stdout.write(f'Surah already exists: {surah.name}')
                
                # Import ayahs
                for ayah_data in surah_data['ayahs']:
                    Ayah.objects.get_or_create(
                        surah=surah,
                        number=ayah_data['numberInSurah'],
                        defaults={
                            'text': ayah_data['text'],
                            'juz': ayah_data['juz']
                        }
                    )
            
            self.stdout.write(self.style.SUCCESS('Successfully imported Quran data'))
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))
