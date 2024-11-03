import json
import base64
import io
from transformers import pipeline
from PIL import Image
from flask import Flask, request, jsonify

app = Flask(__name__)

def classify_yoga_poses(images_base64):
    pipe = pipeline("image-classification", model="dima806/yoga_pose_image_classification")
    results = []

    for image_base64 in images_base64:
        try:
            image_data = base64.b64decode(image_base64)
            image = Image.open(io.BytesIO(image_data))

            prediction = pipe(image)
            top_prediction = prediction[0]

            results.append({
                'pose_name': top_prediction['label'],
                'confidence': round(top_prediction['score'] * 100, 2)
            })

        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return {'error': str(e)}, 400

    results.sort(key=lambda x: x['confidence'], reverse=True)
    return results[0]

@app.route('/classify-yoga', methods=['POST'])
def classify():
    try:
        data = request.get_json()

        images_base64 = data.get('images_base64', [])
        if not images_base64:
            return jsonify({'error': 'No images data provided'}), 400

        results = classify_yoga_poses(images_base64)
        return jsonify(results)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
