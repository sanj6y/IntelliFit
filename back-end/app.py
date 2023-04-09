from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import pushups

app = Flask(__name__)

# Define the endpoint that will receive the image
@app.route('/process_image', methods=['POST'])
def process_image():
    # Get the image from the request
    file = request.files['image']
    img = Image.open(file.stream)
    img = np.array(img)

    # Call the image processing method
    results = pushups.predict(img, "up")
    # Create a JSON object with the results
    response = {
        'image': img.tolist(),
        'repCount': results[1],
        'accuracy': results[2],
        'direction': results[3]
    }

    # Send the JSON object back to the frontend
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
