# from flask import Flask, request, jsonify
# from PIL import Image
# import numpy as np
# import pushups

# app = Flask(__name__)

# # Define the endpoint that will receive the image
# @app.route('/process_image', methods=['POST'])
# def process_image():
#     # Get the image from the request
#     file = request.files['image']
#     img = Image.open(file.stream)
#     img = np.array(img)

#     # Call the image processing method
#     results = pushups.predict(img, "up")
#     # Create a JSON object with the results
#     response = {
#         'image': img.tolist(),
#         'repCount': results[1],
#         'accuracy': results[2],
#         'direction': results[3]
#     }

#     # Send the JSON object back to the frontend
#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify, send_from_directory
import json
import os
import shutil
import sys
import base64
import pushups
import base64

app = Flask(__name__)

@app.route('/image-receiver', methods=['POST', 'GET'])

# going to need to get direction and repCount from image receiver!!!
def image_receiver():
    print('testing')

    # Create a temporary directory to save the files
    TEMP_DIR = os.path.abspath('temp-download')
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)
    os.makedirs(TEMP_DIR, exist_ok=True)

    print("Saving local files:")
    based = bytes(json.loads(request.data)[23:], 'utf-8') 

    with open("temp-download/temp.jpg", "wb") as fh:
        fh.write(base64.decodebytes(based))

    print('Saved all files locally to the temp-download directory')
    
    filepath = 'temp-download/temp.jpg'

    results = pushups.predict(filepath)
    print(results)

    with open('res.jpg', "rb") as img_file:
        b64String = str(base64.b64encode(img_file.read()))

    return jsonify(b64String)
if __name__ == '__main__':
    app.run(debug=True)