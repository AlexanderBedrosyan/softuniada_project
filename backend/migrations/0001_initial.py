# Generated by Django 4.2.10 on 2024-03-03 10:31

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('author', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator(message='Enter a valid email address.')])),
                ('password', models.CharField(max_length=128)),
                ('city', models.CharField(blank=True, choices=[('BG01', 'Blagoevgrad'), ('BG02', 'Burgas'), ('BG03', 'Varna'), ('BG04', 'Veliko Tarnovo'), ('BG05', 'Vidin'), ('BG06', 'Vratsa'), ('BG07', 'Gabrovo'), ('BG08', 'Dobrich'), ('BG09', 'Kardzhali'), ('BG10', 'Kyustendil'), ('BG11', 'Lovech'), ('BG12', 'Montana'), ('BG13', 'Pazardzhik'), ('BG14', 'Pernik'), ('BG15', 'Pleven'), ('BG16', 'Plovdiv'), ('BG17', 'Razgrad'), ('BG18', 'Ruse'), ('BG19', 'Silistra'), ('BG20', 'Sliven'), ('BG21', 'Smolyan'), ('BG22', 'Grad Sofiya'), ('BG23', 'Sofia'), ('BG24', 'Stara Zagora'), ('BG25', 'Targovishte'), ('BG26', 'Haskovo'), ('BG27', 'Shumen'), ('BG28', 'Yambol')], max_length=120, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
