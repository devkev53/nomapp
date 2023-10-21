from .base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-*cwt%maan@w#g0q1#!=wldjn1n%fa*c66k624x_nh6s($67t4e'


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DOMAIN = config('DJANGO_DOMAIN')
ALLOWED_HOSTS = ['*', 'localhost:8000', '127.0.0.1:8000']

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'nomapp',
#         'USER': 'admin',
#         'PASSWORD': 'abc123/-',
#         'HOST': 'localhost',
#         'PORT': '5432'
#     }
# }

# REST_FRAMEWORK TOKEN AUTHORIZATION

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     'rest_framework.permissions.IsAuthenticated',
    # )
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR/ '../static'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR/ '../media'

STATICFILES_DIRS = [
  BASE_DIR/ '../build/static/'
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CHANGE AUTH_USER_MODEL

AUTH_USER_MODEL = 'users.User'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'core.backend.AuthEmailBackend',
]

# SIMPLE_JWT CONFIGURATION

SIMPLE_JWT = {
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    # 'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=4),
}

# CORS CONFIGURATION
# CORS CONFIG
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://172.17.200.220:3000',
    'https://ccardona.pythonanywhere.com/',
    'http://ccardona.pythonanywhere.com/'
]
CORS_ORIGIN_WHITELIST= [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://172.17.200.220:3000',
    'https://ccardona.pythonanywhere.com/',
    'http://ccardona.pythonanywhere.com/'
]

# CONFIGURACION PARA CORREOS ELECTRONICOS
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = config('USER_EMAIL')
EMAIL_HOST_PASSWORD = config('USER_MAIL_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False