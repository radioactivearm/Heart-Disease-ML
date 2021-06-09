# Outlined code based off TA Farshad's app.py from https://github.com/esnaaf1/ML_Flask_Demo -

# Import libaries
import numpy as np
from flask import Flask, request, jsonify, render_template
import joblib from pickle import load

# Initialize the flask App
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Load the model from pickle file
pickleModel = load(open('',''))

# Load scaler from pickle file
pickleScaler = load(open('',''))

# Define the index route
@app.route('/')
def home():
    return render_template('index.html')

# Define a route that runs when the user clicks the Predict button in the web-app
@app.route('/predict', methods=['POST'])
def predict():
    
    # Create a list of the output labels.
    prediction_labels = ['Age', 
                         'Chest Pain Type', 
                         'Resting Blood Pressure',
                         'Fasting Blood Sugar',
                         'Cholestrol',
                         'Fasting Bloods Sugar',
                         'Resting ECG',
                         'Maximum Heart Rate',
                         'Exercise Angina',
                         'Old Peak',
                         'ST Slope',
                         'Number of Major Vessels',
                         'Thalassemia']
    
    # Read the list of user-entered values from the website. Note that these will be strings. 
    features = [x for x in request.form.values()]

    # Convert each value to a float.
    float_features = [float(x) for x in features]

    # Put the list of floats into another list, to make scikit-learn happy. 
    # (This is how scikit-learn wants the data formatted. We touched on this
    # in class.)
    final_features = [np.array(float_features)]
     
    # Preprocess the input using the ORIGINAL (unpickled) scaler.
    # This scaler was fit to the TRAINING set when we trained the 
    # model, and we must use that same scaler for our prediction 
    # or we won't get accurate results. 
    final_features_scaled = pickleScaler.transform(final_features)

    # Use the scaled values to make the prediction. 
    prediction_encoded = pickleModel.predict(final_features_scaled)
    prediction = prediction_labels[prediction_encoded[0]]

    # Render a template that shows the result.
    prediction_text = f'Patient is predicted to be:  {prediction}'
    return render_template('index.html', prediction_text=prediction_text, features=features)

# Define a route for process write up
@app.route('/MLprocess')
def process():
    return render_template()

# Allow the Flask app to launch from the command line
if __name__ == "__main__":
    app.run(debug=True)