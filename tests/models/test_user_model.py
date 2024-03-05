from django.contrib.auth import get_user_model
from django.test import TestCase
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ValidationError

from backend.models import Book, User

UserModel = get_user_model()


class UserModelTest(TestCase):

    def setUp(self):
        if not User.objects.filter(username="Trosho").exists():
            self.user = UserModel.objects.create_user(
                username="Mitre",
                password="Bunpower",
            )

    def test_username(self):
        self.assertEqual(self.user.username, 'Mitre')
        self.user.username = 'Gargorov'
        self.assertEqual(self.user.username, 'Gargorov')

    def test_password(self):
        password = "Bunpower"
        condition = check_password(password, self.user.password)
        self.assertTrue(condition)

        self.user.password = "Bunpower2"
        password1 = "Bunpower2"
        self.assertEqual(self.user.password, password1)

    def test_cities(self):
        self.user.cities = 'Burgas'
        self.assertEqual(self.user.cities, 'Burgas')

        self.user.cities = ''
        self.assertEqual(self.user.cities, '')

    def test_description(self):
        self.user.description = 'Hello World'
        self.assertEqual(self.user.description, 'Hello World')

        self.user.description = ''
        self.assertEqual(self.user.description, '')

    def test_emails(self):
        self.user.email = 'mitre@abv.bg'
        self.assertEqual(self.user.email, 'mitre@abv.bg')

        invalid_email = "mitrebg____"

        with self.assertRaises(ValidationError) as context:
            self.user.email = invalid_email
            self.user.full_clean()

        self.assertEqual(str({'email': ['Enter a valid email address.']}), str(context.exception))

    def test_dunder_method_str(self):
        self.assertEqual(str(self.user), 'Mitre')
        self.user.username = 'Grishe'
        self.assertEqual(str(self.user), 'Grishe')

        self.user.username = ""
        self.assertEqual(str(self.user), "")

        new_user = User.objects.create()
        self.assertEqual(str(new_user), '')