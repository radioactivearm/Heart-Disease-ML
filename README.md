# Heart-Disease-ML

Group Members: Ainash Toleu, Andy McRae and Jeannaej Yambing

Link to Heroku Server: https://deepheart.herokuapp.com/
*This link takes about 20-30 seconds to load the first time due to it's size*

# Overview:
The deepheart website uses Neural Network to predict if a patient does or does not have heart disease. 
    Created two Neural Network models, one from a heart disease dataset with 11 features and a large amount of data and the other dataset containing 13 features and a small amount of data.
    After training and testing the models the larger dataset was deemed more accurate in predictions. Therefore this model is used on the deepheart website.

## Please clone this repository to your computer and then do the following:

1. Navigate to the folder that contains ``app.py`` and launch a GitBash (Windows) or Terminal (Mac).
1. Type ``pip install -r requirements.txt`` to recreate the Hero environment.
1. Type ``source activate Hero`` and then hit ENTER.
1. Type ``python app.py`` and then hit ENTER.
1. Notice that Flask server starts and tells you which port it is running on.  Don't close this window
1. Enter the following address in your Chrome browser: http://127.0.0.1:5000/
1. Enter data for Age, Sex, Chest Pain Type, Resting Blood Pressure, Serum Cholestoral, Fasting Blood Sugar, Resting Electrocardiographic Results, Maximum Heart Rate Achieved, Exercise Induced Angina, ST Oldpeak, and Slope Peak.
Note: You can run examples using the "Random" Button.

# Datasets: 
https://www.kaggle.com/nakkapraneethreddy/heart-disease-data-combined
 
https://www.kaggle.com/lykin22/heart-disease-dataset?select=data.csv 

* There are several options to save and load the model and scaler. In this project, the pickle and ternsorflow library were used.


# Screenshots of Application

![OpenningImage](static\images\deepheartscreenshot.jpg)

![PredictionImage](static\images\predictiondeepHeart.jpg)
