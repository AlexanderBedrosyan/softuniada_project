from django.urls import include, path
from rest_framework import routers
from .views import BookViewSet


router = routers.DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
]