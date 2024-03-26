FROM python:3.9-slim-buster AS base

WORKDIR /app

ARG SECRET_KEY
ARG DEBUG
ARG ALLOWED_HOSTS
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_PORT
ARG CORS_ALLOWED_ORIGINS

ENV SECRET_KEY=$SECRET_KEY
ENV DEBUG=$DEBUG
ENV ALLOWED_HOSTS=$ALLOWED_HOSTS
ENV DB_NAME=$DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV CORS_ALLOWED_ORIGINS=$CORS_ALLOWED_ORIGINS

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=softuniada_project.settings

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
