# Shopping List Web Application

This project is a simple Flask-based web application for managing a shopping list. It stores items in memory and allows you to add or remove entries through a web interface.

## Setup

1. Create a Python virtual environment (optional but recommended):

```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install the dependencies:

```bash
pip install -r requirements.txt
```

3. Run the application:

```bash
python app.py
```

Open your browser at [http://localhost:5000](http://localhost:5000) to see the app.

## Files

- `app.py` - Main Flask application.
- `templates/index.html` - HTML template for the web interface.
- `requirements.txt` - Python dependencies.

Items are not persisted between restarts.
