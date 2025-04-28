import google.generativeai as genai

genai.configure(api_key="AIzaSyAQowAwBnpZ-FivZjgMVHAgM0XuoX6UYlM")
model = genai.GenerativeModel("gemini-1.5-flash")

try:
    res = model.generate_content("Hello Gemini!")
    print(res.text)
except Exception as e:
    print(f"Error: {e}")

