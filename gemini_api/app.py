import os
import pdfplumber
import docx
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
# from google import genai  
import google.generativeai as genai
app = Flask(__name__)
# CORS(app)  # Allow cross-origin requests from frontend

CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from React


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure uploads directory exists
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load Gemini API key from environment variables
gemini_api_key = os.getenv("GEMINI_API_KEY")

if not gemini_api_key:
    raise ValueError("Gemini API key is missing. Set it as an environment variable.")

# Initialize Gemini client
genai.configure(api_key=gemini_api_key)

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the File Upload API! Use /upload to send a file."

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            extracted_text = page.extract_text()
            if extracted_text:
                text += extracted_text + "\n"
    return text.strip()

# Function to extract text from DOCX
def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs]).strip()

# Function to check abstract against rules using Gemini API
def check_abstract(abstract_text):
    rules = """
    1. Overall font should be Times New Roman.
    2. Project title, guide name and specialization should be in red color, rest all in black color
    3. The abstract description and H/W, S/W Requirements should be of Font-Times New Roman, size: 12, Line spacing: 1.00 
    4.The abstract description should start with "Abstract:"
    5. The abstract description should be in 2 paragraphs below "Abstract:", with no other side headings.
    
    if any of the above rules are in the abstract are not adhered then suggest them to change, donot give any extra matter and 
    donot print these rules alsos
    """

    prompt = f"""
    Given the following abstract, check it against these rules:
    {rules}
    
    Abstract:
    {abstract_text}
    
    Provide a detailed analysis and suggest improvements.
    """

    try:
        model = genai.GenerativeModel("gemini-1.0-pro")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        return f"Gemini API error: {e}"

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    try:
        if filename.endswith(".pdf"):
            text = extract_text_from_pdf(file_path)
        elif filename.endswith(".docx"):
            text = extract_text_from_docx(file_path)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        if not text:
            return jsonify({"error": "Failed to extract text from document"}), 400

        suggestions = check_abstract(text)
        return jsonify({"suggestions": suggestions})
    
    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)