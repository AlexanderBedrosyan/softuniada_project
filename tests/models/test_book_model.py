from django.contrib.auth import get_user_model
from django.test import TestCase

from backend.models import Book, User

UserModel = get_user_model()


class BookModelTest(TestCase):

    def setUp(self):
        if not User.objects.filter(username="Trosho").exists():
            self.user = UserModel.objects.create_user(
                username="Trosho",
                password="Bunpower",
            )

    def test_create_book(self):
        book = Book.objects.create(title='Real Estate', author='Grant Cardone')
        self.assertEqual(book.title, 'Real Estate')
        self.assertEqual(book.author, 'Grant Cardone')

    def test_delete_book(self):
        book = Book.objects.create(title='Real Estate', author='Grant Cardone')
        self.assertEqual(book.title, 'Real Estate')
        self.assertEqual(book.author, 'Grant Cardone')

        Book.objects.filter(title='Real Estate').delete()
        self.assertEqual(Book.objects.filter(title='Real Estate').exists(), False)

    def test_edit_book_title(self):
        book = Book.objects.create(title='Real Estate', author='Grant Cardone')
        self.assertEqual(book.title, 'Real Estate')
        self.assertEqual(book.author, 'Grant Cardone')

        book.title = 'New Real Estate'
        self.assertEqual(book.title, 'New Real Estate')

    def test_edit_book_author(self):
        book = Book.objects.create(title='Real Estate', author='Grant Cardone')
        self.assertEqual(book.title, 'Real Estate')
        self.assertEqual(book.author, 'Grant Cardone')

        book.author = 'Ivan Vazov'
        self.assertEqual(book.author, 'Ivan Vazov')

    def test_total_books_in_db(self):
        Book.objects.create(title='Real Estate', author='Grant Cardone')
        Book.objects.create(title='Real Estate1', author='Grant Cardone1')
        Book.objects.create(title='Real Estate2', author='Grant Cardone2')
        self.assertEqual(len(Book.objects.all()), 3)

        Book.objects.get(title='Real Estate2').delete()
        self.assertEqual(len(Book.objects.all()), 2)
