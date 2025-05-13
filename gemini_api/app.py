
import os
import pdfplumber
import docx
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import google.generativeai as genai
from flask_mail import Mail, Message

from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from frontend

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure uploads directory exists
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load Gemini API key from environment variables
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("Gemini API key is missing. Set it as an environment variable.")
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
    Check for Abstract Description:
    1. Each bullet point should be limited to eight words.
    2. The Abstract Description, Software Requirements, and Hardware Requirements should be in Times New Roman.
    
    If multiple violations are found, list suggestions under "Suggestions", one per line.
    If all rules are followed, output: "The abstract is clear to send to your Guide."
    """

    prompt = f"""
    Given the following abstract, check it against these rules:
    {rules}
    
    Abstract:
    {abstract_text}
    
    Provide a detailed analysis and suggest improvements.
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
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
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    print(f"📂 Saving file to: {file_path}")
    file.save(file_path)

    if not os.path.exists(file_path):
        print(f"❌ File not saved! Check directory permissions.")
        return jsonify({"error": "File not saved"}), 500

    print(f"✅ File successfully saved at: {file_path}") 


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

        # ✅ Return file_name along with suggestions
        return jsonify({"suggestions": suggestions, "file_name": filename})  
    
    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

# ✅ Serve uploaded files so the guide can access them
@app.route("/uploads/<filename>", methods=["GET"])
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# ------------------- EMAIL NOTIFICATION SYSTEM -------------------

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False
# app.config["MAIL_USERNAME"] = os.getenv("EMAIL_USER")  # Set in .env
# app.config["MAIL_PASSWORD"] = os.getenv("EMAIL_PASS")  # Set in .env
# app.config["MAIL_DEFAULT_SENDER"] = os.getenv("EMAIL_USER")
app.config["MAIL_USERNAME"] = "sankeerthanajadi6@gmail.com"
app.config["MAIL_PASSWORD"] = "mapd ttzq enuh lhmz"
app.config["MAIL_DEFAULT_SENDER"] = "sankeerthanajadi6@gmail.com"


mail = Mail(app)

@app.route("/send-notification", methods=["POST"])
def send_notification():
    data = request.json
    guide_email = data.get("guide_email")
    file_name = data.get("file_name").strip()

    if not guide_email or not file_name:
        return jsonify({"error": "Missing guide email or file name"}), 400

    file_path = os.path.join(os.getcwd(), "uploads",file_name)
    # file_path = os.path.join(app.config["UPLOAD_FOLDER"], file_name)
    # app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    # print(f"UPLOAD_FOLDER set to: {app.config['UPLOAD_FOLDER']}")
    print(f"📂 Checking for file: {file_name}")  # Debugging
    print(f"🔍 Full path: {file_path}")  # Debugging

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return jsonify({"error": "File not found on server"}), 400

    print(f"✅ File exists! Sending {file_name} to {guide_email}")
    # # Verify if the file actually exists
    # if not os.path.exists(file_path):
    #     print(f"❌ File not found: {file_path}")
    #     return jsonify({"error": "File not found on server"}), 404

    # print(f"✅ File exists! Sending {file_name} to {guide_email}")

    # return jsonify({"message": f"Notification sent to {guide_email}"})


    file_url = f"http://localhost:5000/uploads/{file_name}"  # Adjust based on deployment

    try:
        msg = Message(
            subject="New AI-reviewed Abstract Available",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[guide_email],
            body=f"Hello,\n\nA new reviewed abstract is available. You can download it here: {file_url}\n\nBest Regards,\nYour Team",
        )

        with open(file_path,"rb") as file:
            msg.attach(file_name, "application/pdf", file.read())  # Attach file to email

        mail.send(msg)
        print("✅ Email sent successfully!")
        return jsonify({"message": "Notification sent successfully!"}), 200
    except Exception as e:
        print(f"Email send error: {e}")  # Debugging
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
