from django.urls import include, path
from rest_framework import routers
from .views import BookViewSet, register_user_view


router = routers.DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/register', register_user_view, name='register_user')
]