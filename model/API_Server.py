from dotenv import load_dotenv

load_dotenv()
from flask import Flask, request, jsonify, render_template
import fitz 
from unidecode import unidecode
import google.generativeai as genai
import os
import json

genai.configure(api_key="API_KEY")
print(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))


app = Flask(__name__)

def extract_text_from_pdf(file_path):
    output = []
    with fitz.open(file_path) as doc:
        for page in doc:
            output += page.get_text("blocks")

    clean_output = []
    for i in range(0, len(output)):
        plain_text = unidecode(output[i][4])
        clean_output.append(plain_text)
    return clean_output



@app.route('/')
def main():
    return render_template("index.html")


def get_gemini_response(input,prompt):
    model = genai.GenerativeModel('models/gemini-pro')
    response = model.generate_content([input, prompt])
    return response.text


input_prompt1 = """
 You are an experienced Technical Human Resource Manager,your task is to review the provided resume against the job description. 
  Please share your professional evaluation on whether the candidate's profile aligns with the role. 
 Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
"""

input_prompt2 = """
 From the given text of the resume, you have to take out the following entities: ['Organization', 'Date', 'Languages', 'Projects', 'Hobbies', 'Nationality', 'Date of Birth', 'Objective', 'LinkedIn', 'Career Goals', 'Profile', 'Greeting', 'Company Name', 'Job Title', 'Phone No.', 'Website', 'Name', 'Address', 'Email', 'Companies Worked At', 'Phone No.', 'Skills', 'Email Address', 'Location', 'Degree', 'Experience', 'College Name', 'Graduation Year', 'Education', 'Designation', 'Years of Experience'] and return them in JSON format  and try too give Skills part in more detail way.
"""


@app.route('/predict', methods=['POST'])
def predict_resume():
    if request.method == 'POST':
        f = request.files['file']
        f.save(f.filename)

    file_path = f.filename
    resume_text = extract_text_from_pdf(file_path)
    print(resume_text)
    finl_text = ""


    for text in range(0, len(resume_text)):
        finl_text += resume_text[text]

    data_with_json=get_gemini_response(input_prompt2,finl_text)
    start_index = data_with_json.find('{')
    end_index = data_with_json.rfind('}') + 1
    json_data = data_with_json[start_index:end_index]
    parsed_data = json.loads(json_data)
    return jsonify(parsed_data)


if __name__ == '__main__':
    app.run(debug=True, port=9999)


