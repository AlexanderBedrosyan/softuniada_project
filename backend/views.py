import json
from datetime import datetime, timedelta

from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from simplejwt import jwt
from softuniada_project.settings import SECRET_KEY
from jwt.algorithms import get_default_algorithms
from jwt.api_jwt import PyJWT
from rest_framework import generics as api_views, status, permissions, pagination

from .serializer import BookModelSerializer, UserSerializer
from .models import Book, User


# Create your views here.


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer


class Register(api_views.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        all_usernames = User.objects.values_list('email', flat=True)

        if email and password:
            if email in all_usernames:
                user = User.objects.get(email=email)
                if check_password(password, user.password):
                    refresh_payload = {
                        'user_id': user.id,
                        'email': user.email,
                        'type': 'refresh',
                        'exp': datetime.utcnow() + timedelta(days=1)
                    }

                    key = SECRET_KEY

                    refresh_token = PyJWT().encode(refresh_payload, key, algorithm='HS256')

                    access_payload = {
                        'user_id': user.id,
                        'email': user.email,
                        'type': 'access',
                        'exp': datetime.utcnow() + timedelta(days=1)
                    }

                    access_token = PyJWT().encode(access_payload, key, algorithm='HS256')

                    return Response({
                        'access_token': str(access_token),
                        'refresh_token': str(refresh_token),
                    }, status=status.HTTP_200_OK)

        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UpdateUser(APIView):

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        pictureLink = request.data.get('picture')
        description = request.data.get('description')
        all_usernames = User.objects.values_list('email', flat=True)

        if email in all_usernames:
            user = User.objects.get(email=email)
            user.description = description
            user.picture = pictureLink
            return Response({"message": "User published successfully"})

        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)