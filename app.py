#===========================
# Outlined code based off TA Farshad's app.py from https://github.com/esnaaf1/ML_Flask_Demo
# Dom helped us create a new environment for our prediction
# Worked on by Jeannaej Yambing
#===========================

# Import libaries
import numpy as np
from flask import Flask, request, jsonify, render_template
import joblib 
from pickle import load
import pandas as pd
# from keras.models import load_model

import tensorflow as tf

# Initialize the flask App
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# Define a session and a default computation graph
# Dom's help 
sess = tf.compat.v1.Session()
graph = tf.compat.v1.get_default_graph()
tf.compat.v1.keras.backend.set_session(sess)
tf.compat.v1.disable_eager_execution()

# Load the neural network model from its .h5fs file.
# Dom's help
nn = tf.keras.models.load_model('deepHEART.h5')

# Load scaler from pickle file
pickleScaler = load(open('scaleHEART.pkl','rb'))

# Define the index route
@app.route('/')
def inital():
    return render_template('index.html')

# Define the home route
@app.route('/index.html')
def home():
    return render_template('index.html')

# Define a route that runs when the user clicks the Predict button in the web-app
@app.route('/predict', methods=['POST'])
def predict():

    # Create a list of the output labels.
    prediction_labels = ['The Patient Has Heart Disease', 
                         'The Patient Does Not Have Heart Disease']
    
    # Read the list of user-entered values from the website. Note that these will be strings. 
    features = [x for x in request.form.values()]

    # Convert each value to a float.
    float_features = [float(x) for x in features]

    # Put the list of floats into another list, to make scikit-learn happy. 
    # (This is how scikit-learn wants the data formatted. We touched on this
    # in class.)
    final_features = np.array([np.array(float_features)])
    # prediction = f'final_features.shape = {final_features.shape}'

    # Preprocess the input using the ORIGINAL (unpickled) scaler.
    # This scaler was fit to the TRAINING set when we trained the 
    # model, and we must use that same scaler for our prediction 
    # or we won't get accurate results. 
    final_features_scaled = pickleScaler.transform(final_features)

    # Use the scaled values to make the prediction. 
    # Dom's Help
    global sess
    global graph
    with graph.as_default():
        tf.compat.v1.keras.backend.set_session(sess)
        # prediction_encoded = nn.predict_classes(final_features_scaled)
        prediction_encoded = np.argmax(nn.predict(final_features_scaled), axis=-1)

        # ------------------------------------------
        # Andy
        preditor = nn.predict(final_features_scaled)

        def higher(preditor):
            if preditor[0][0] > preditor[0][1]:
                return preditor[0][0]
            else:
                return preditor[0][1]
            
        percent = str(round(100*higher(preditor), 2))
        # -------------------------------------------

        prediction = prediction_labels[prediction_encoded[0]] + ' ('+ percent + '%)'

    # prediction = prediction_labels[prediction_encoded[0]]

    # prediction = 'hello'

    # Render a template that shows the result.
    prediction_text = f'Prediction: {prediction}'
    return render_template('index.html', scroll='refresher', prediction_text=prediction_text, features=features)

# Define a route for process write up page
@app.route('/secondpage.html')
def modelprocess():
    return render_template('secondpage.html')


# Define a route for the data page
@app.route('/about.html')
def datasets():
    return render_template('about.html')

# Allow the Flask app to launch from the command line
if __name__ == "__main__":
    app.run(debug=True)