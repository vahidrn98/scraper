# main.py
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)

@app.route('/scrape', methods=['GET'])
def scrape_url():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL not provided"}), 400
    
    # Scrape content
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    text = ' '.join(p.get_text() for p in soup.find_all('p'))

    # Process content
    questions = generate_questions(text)
    return jsonify({"questions": questions})

def generate_questions(text):
    # Remove stopwords and tokenize text
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text.lower())
    filtered_words = [word for word in words if word.isalnum() and word not in stop_words]

    # Basic keywords extraction
    keywords = nltk.FreqDist(filtered_words).most_common(5)
    questions = [{"question": f"Are you interested in {keyword}?", "options": ["Yes", "No"]} for keyword, _ in keywords]
    return questions

if __name__ == "__main__":
    app.run(debug=True)
