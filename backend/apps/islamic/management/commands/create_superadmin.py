import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Create superadmin user'

    def add_arguments(self, parser):
        parser.add_argument('--email', type=str, help='Email for superadmin')
        parser.add_argument('--username', type=str, help='Username for superadmin')
        parser.add_argument('--password', type=str, help='Password for superadmin')

    def handle(self, *args, **options):
        email = options.get('email') or os.getenv('SUPERADMIN_EMAIL', 'admin@studora.app')
        username = options.get('username') or os.getenv('SUPERADMIN_USERNAME', 'superadmin')
        password = options.get('password') or os.getenv('SUPERADMIN_PASSWORD', 'admin123')
        
        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.WARNING(f'User with email {email} already exists'))
            return
        
        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'User with username {username} already exists'))
            return
        
        user = User.objects.create_superuser(
            email=email,
            username=username,
            password=password
        )
        
        self.stdout.write(self.style.SUCCESS(f'Superadmin created successfully:'))
        self.stdout.write(f'  Email: {email}')
        self.stdout.write(f'  Username: {username}')
        self.stdout.write(f'  Password: {password}')
