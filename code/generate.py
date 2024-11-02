from transformers import pipeline
from PIL import Image
from pathlib import Path

def classify_yoga_poses(image_paths):
    # Initialize the image classification pipeline
    pipe = pipeline("image-classification", model="dima806/yoga_pose_image_classification")

    results = []
    for image_path in image_paths:
        try:
            # Load the image
            image = Image.open(image_path)

            # Get the prediction
            prediction = pipe(image)
            top_prediction = prediction[0]

            results.append({
                'image_path': image_path,
                'pose_name': top_prediction['label'],
                'confidence': round(top_prediction['score'] * 100, 2)
            })
        except Exception as e:
            print(f"Error processing {image_path}: {str(e)}")

    # Sort results by confidence score (highest first)
    results.sort(key=lambda x: x['confidence'], reverse=True)
    return results

# Example usage
if __name__ == "__main__":
    # Specify your image paths directly
    image_paths = [
        "../assets/test1.jpg",
        "../assets/test2.jpg",
        "../assets/test3.jpg"
    ]

    results = classify_yoga_poses(image_paths)

    print("\nResults sorted by confidence:")
    print("-" * 50)
    for result in results:
        print(f"Image: {Path(result['image_path']).name}")
        print(f"Pose: {result['pose_name']}")
        print(f"Confidence: {result['confidence']}%")
        print("-" * 50)

    # Print the best match
    best_match = results[0]
    print(f"\nBest matching pose:")
    print(f"Image: {Path(best_match['image_path']).name}")
    print(f"Pose: {best_match['pose_name']}")
    print(f"Confidence: {best_match['confidence']}%")
