from django.contrib.auth.hashers import make_password
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import BookModelSerializer, UserSerializer
from .models import Book, User

# Create your views here.


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user_view(request):
    if request.method == 'POST':
        data = request.data.copy()
        emails = User.objects.values_list('email', flat=True)

        if data['email'] in emails:
            return Response({'error': 'Email is already used'}, status=status.HTTP_400_BAD_REQUEST)

        if 'password' in data:
            data['password'] = make_password(data['password'])

        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)