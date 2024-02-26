from django.contrib import admin
from .models import Book, User

# Register your models here.

admin.site.register(Book)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']