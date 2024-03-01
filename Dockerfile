FROM python:3.9-slim-buster AS base

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

FROM base AS builder

COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY staticfiles /app/.
COPY . .

FROM builder AS preparations

RUN python manage.py makemigrations
#RUN python manage.py migrate
#
#RUN echo "from backend.Accounts.models import JhiUser as User; \
#    from envs.superuser import DJANGO_SUPERUSER_USERNAME; \
#    from envs.superuser import DJANGO_SUPERUSER_EMAIL; \
#    from envs.superuser import DJANGO_SUPERUSER_PASSWORD; \
#    User.objects.create_superuser(DJANGO_SUPERUSER_USERNAME,DJANGO_SUPERUSER_EMAIL,DJANGO_SUPERUSER_PASSWORD)" \
#    | python manage.py shell


FROM preparations AS final

EXPOSE 80

#CMD ["sh", "-c", "daphne --bind 0.0.0.0:81 backend.asgi:application"]
CMD ["sh", "-c", "python manage.py runserver --bind 0.0.0.0:8000"]
#CMD ["sh", "-c", "daphne --bind 0.0.0.0:8000 backend.asgi:application & exec celery -A backend worker -l info -B"]