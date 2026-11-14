# Appointly: one container serves the app (index.html, css, js) and the API.
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /srv
COPY server/requirements.txt server/requirements.txt
RUN pip install --no-cache-dir -r server/requirements.txt
COPY server server
COPY index.html ./
COPY css css
COPY js js
COPY assets assets
WORKDIR /srv/server
EXPOSE 8000
# Render and similar hosts set $PORT; locally it's 8000.
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
