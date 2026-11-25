
"""
Django settings for Ahmadiyya Muslim Hospital.
Local development and Vercel production configuration.
"""

from pathlib import Path
import os

import dj_database_url
from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured


# --------------------------------------------------
# BASE CONFIGURATION
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

IS_VERCEL = os.getenv("VERCEL") == "1"


def env_list(name, default=None):
    value = os.getenv(name)

    if value:
        return [
            item.strip()
            for item in value.split(",")
            if item.strip()
        ]

    return default or []


def env_bool(name, default=False):
    return os.getenv(name, str(default)).lower() == "true"


# --------------------------------------------------
# SECURITY
# --------------------------------------------------

DEBUG = env_bool("DJANGO_DEBUG", default=not IS_VERCEL)

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured(
            "DJANGO_SECRET_KEY must be configured in production."
        )

    SECRET_KEY = "django-insecure-local-development-only-change-this"

ALLOWED_HOSTS = env_list(
    "ALLOWED_HOSTS",
    default=(
        [".vercel.app"]
        if IS_VERCEL
        else ["localhost", "127.0.0.1", "testserver"]
    ),
)

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https",
)

SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_CONTENT_TYPE_NOSNIFF = True


# --------------------------------------------------
# APPLICATIONS
# --------------------------------------------------

INSTALLED_APPS = [
    "corsheaders",

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "storages",

    "rest_framework",
    "rest_framework.authtoken",

    "accounts",
    "community_groups",
    "community_posts",
    "appointments",
    "events",
    "contact",
]


# --------------------------------------------------
# MIDDLEWARE
# --------------------------------------------------

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "config.urls"

WSGI_APPLICATION = "config.wsgi.application"


# --------------------------------------------------
# TEMPLATES
# --------------------------------------------------

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# --------------------------------------------------
# DATABASE
# AMH USES ITS OWN SUPABASE POSTGRESQL SCHEMA
# Other applications remain in the public schema.
# --------------------------------------------------

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=0,
            ssl_require=True,
        )
    }

    DATABASES["default"].setdefault("OPTIONS", {})

    DATABASES["default"]["OPTIONS"]["options"] = (
        "-c search_path=amh,extensions"
    )

else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


# --------------------------------------------------
# PASSWORD VALIDATION
# --------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# --------------------------------------------------
# INTERNATIONALIZATION
# --------------------------------------------------

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# --------------------------------------------------
# STATIC FILES
# --------------------------------------------------

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"


# --------------------------------------------------
# SUPABASE STORAGE
# --------------------------------------------------

SUPABASE_S3_ENDPOINT_URL = os.getenv(
    "SUPABASE_S3_ENDPOINT_URL", ""
)

SUPABASE_S3_REGION = os.getenv(
    "SUPABASE_S3_REGION", ""
)

SUPABASE_S3_ACCESS_KEY_ID = os.getenv(
    "SUPABASE_S3_ACCESS_KEY_ID", ""
)

SUPABASE_S3_SECRET_ACCESS_KEY = os.getenv(
    "SUPABASE_S3_SECRET_ACCESS_KEY", ""
)

SUPABASE_STORAGE_BUCKET = os.getenv(
    "SUPABASE_STORAGE_BUCKET", "almadiyya"
)

SUPABASE_STORAGE_PUBLIC_DOMAIN = os.getenv(
    "SUPABASE_STORAGE_PUBLIC_DOMAIN", ""
)

USE_SUPABASE_STORAGE = env_bool(
    "USE_SUPABASE_STORAGE",
    default=not DEBUG,
)

SUPABASE_STORAGE_OPTIONS = {
    "bucket_name": SUPABASE_STORAGE_BUCKET,
    "region_name": SUPABASE_S3_REGION,
    "endpoint_url": SUPABASE_S3_ENDPOINT_URL,
    "access_key": SUPABASE_S3_ACCESS_KEY_ID,
    "secret_key": SUPABASE_S3_SECRET_ACCESS_KEY,
    "addressing_style": "path",
    "signature_version": "s3v4",
    "default_acl": None,
    "querystring_auth": False,
    "file_overwrite": False,
    "custom_domain": SUPABASE_STORAGE_PUBLIC_DOMAIN or None,
    "url_protocol": "https:",
}

if USE_SUPABASE_STORAGE:
    missing_storage_settings = [
        name
        for name, value in {
            "SUPABASE_S3_ENDPOINT_URL": SUPABASE_S3_ENDPOINT_URL,
            "SUPABASE_S3_REGION": SUPABASE_S3_REGION,
            "SUPABASE_S3_ACCESS_KEY_ID": SUPABASE_S3_ACCESS_KEY_ID,
            "SUPABASE_S3_SECRET_ACCESS_KEY": SUPABASE_S3_SECRET_ACCESS_KEY,
        }.items()
        if not value
    ]

    if missing_storage_settings:
        raise ImproperlyConfigured(
            "Missing Supabase storage environment variables: "
            + ", ".join(missing_storage_settings)
        )

STORAGES = {
    "default": {
        "BACKEND": (
            "storages.backends.s3.S3Storage"
            if USE_SUPABASE_STORAGE
            else "django.core.files.storage.FileSystemStorage"
        ),
        **(
            {"OPTIONS": SUPABASE_STORAGE_OPTIONS}
            if USE_SUPABASE_STORAGE
            else {}
        ),
    },

    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },

    "supabase_media": {
        "BACKEND": "storages.backends.s3.S3Storage",
        "OPTIONS": SUPABASE_STORAGE_OPTIONS,
    },
}


# --------------------------------------------------
# EMAIL CONFIGURATION
# Django 6.1 MAILERS configuration
# --------------------------------------------------

MAILERS = {
    "default": {
        "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
        "OPTIONS": {
            "host": os.getenv("EMAIL_HOST", "smtp.gmail.com"),
            "port": int(os.getenv("EMAIL_PORT", "587")),
            "username": os.getenv("EMAIL_HOST_USER", ""),
            "password": os.getenv("EMAIL_HOST_PASSWORD", ""),
            "use_tls": env_bool("EMAIL_USE_TLS", True),
        },
    },
}

DEFAULT_FROM_EMAIL = os.getenv(
    "DEFAULT_FROM_EMAIL",
    "kojosweetonline@gmail.com",
)


# --------------------------------------------------
# CUSTOM USER MODEL
# --------------------------------------------------

AUTH_USER_MODEL = "accounts.User"


# --------------------------------------------------
# DJANGO REST FRAMEWORK
# --------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}


# --------------------------------------------------
# GOOGLE OAUTH
# --------------------------------------------------

GOOGLE_OAUTH_CLIENT_ID = os.getenv(
    "GOOGLE_OAUTH_CLIENT_ID",
    "",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

CORS_ALLOWED_ORIGINS = env_list(
    "CORS_ALLOWED_ORIGINS",
    default=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
)


# --------------------------------------------------
# CSRF
# --------------------------------------------------

CSRF_TRUSTED_ORIGINS = env_list(
    "CSRF_TRUSTED_ORIGINS",
    default=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
)


# --------------------------------------------------
# APPOINTMENT NOTIFICATIONS
# --------------------------------------------------

APPOINTMENT_NOTIFICATION_EMAIL = os.getenv(
    "APPOINTMENT_NOTIFICATION_EMAIL",
    "kojosweetonline@gmail.com",
)


# --------------------------------------------------
# DEFAULT PRIMARY KEY
# --------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
