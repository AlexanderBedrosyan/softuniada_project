import json

from django.contrib.auth.hashers import make_password
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from backend.models import User


class LoginTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        hashed_password = make_password('password123')
        self.user = User.objects.create(email='test@example.com', password=hashed_password)

    def test_successful_login(self):
        url = '/api/login/'
        data = {'email': 'test@example.com', 'password': 'password123'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.data)
        self.assertIn('refresh_token', response.data)

    def test_invalid_credentials_password(self):
        url = '/api/login/'
        data = {'email': 'test@example.com', 'password': 'wrongpassword'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual('Invalid credentials', response.json()['error'])

    def test_invalid_credentials_email(self):
        url = '/api/login/'
        data = {'email': 'wrong@example.com', 'password': 'password123'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual('Invalid credentials', response.json()['error'])