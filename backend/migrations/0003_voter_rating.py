# Generated by Django 4.2.10 on 2024-03-22 11:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_rating_user_picture_voter_rating_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='voter',
            name='rating',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
            preserve_default=False,
        ),
    ]
