import subprocess
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import unicodedata

app = Flask(__name__)
CORS(app)

def read_excel():
    excel_data = pd.read_excel('./exampleData.xlsx')
    data = pd.DataFrame(excel_data, columns=['input', 'output'])
    examples = data.to_dict('records')
    return examples

def is_english_character(char):
    try:
        return unicodedata.name(char).startswith(('LATIN', 'DIGIT', 'SPACE'))
    except ValueError:
        return False

import unicodedata

def is_english_character(char):
    return (
        ('a' <= char <= 'z') or
        ('A' <= char <= 'Z') or
        ('0' <= char <= '9') or
        char in ['@', '_', '&', '#', '$', '?', '.', ' ','  ', '(', ')', '{', '}', ',', '=','[',']', "'", '/', '*']
    )

def check_english_alphabet_or_number(input_string):
    previous_char_is_space = False
    for char in input_string:
        if not is_english_character(char):
            if char != ' ' or not previous_char_is_space:
                print('wrong char',char,'hhihi')
                return False
        previous_char_is_space = (char == ' ')
    return True


@app.route('/validateData', methods=['POST'])
def validate_data():
    try:
        input_data = request.json['input']
        model = request.json['model']

        isValidInput = check_english_alphabet_or_number(input_data)

        if isValidInput:
            # Process the valid input
            examples = read_excel()
            with open('request.json', 'r') as f:
                json_data = json.load(f)

            json_data['inputs'][0] = input_data
            json_data['model_id'] = model
            json_data['template']['data']['examples'] = examples

            temp_file = 'temp_request.json'
            with open(temp_file, 'w') as f:
                json.dump(json_data, f)

            curl_command = f'''curl https://bam-api.res.ibm.com/v1/generate \
                -H 'Content-Type: application/json' \
                -H 'Authorization: Bearer pak-K8CsA2z645Migy0F9AOFnPQ8bhAdf4QWfyXkvxG5iYc' \
                --data-binary @{temp_file}'''

            process = subprocess.Popen(curl_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            output, error = process.communicate()
            if output:
                output_json = json.loads(output)
                generated_text = output_json['results'][0]['generated_text']
                cleaned_output = generated_text.replace('\\n', '\n')
                return jsonify({'output': cleaned_output})
            else:
                return jsonify({'output': '', 'error': 'Error processing the request'})
        else:
            # Return an error message for non-Latin characters
            return jsonify({'output': 'The input you provided contains non-Latin characters'})
    except Exception as e:
        return jsonify({'output': '', 'error': 'Error occurred', 'details': str(e)})


if __name__ == "__main__":
    app.run(port=8000, debug=True)
