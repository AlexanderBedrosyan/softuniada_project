FROM python:3.9-slim-buster AS base

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

FROM base AS builder

COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN rm -rf /app/frontend

FROM builder AS preparations

RUN python manage.py makemigrations
RUN python manage.py migrate

FROM preparations AS final

EXPOSE 80

CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:80 softuniada_project.wsgi:application"]
