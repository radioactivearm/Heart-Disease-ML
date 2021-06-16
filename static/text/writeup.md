# Modeling Methodology

Two sets of data were found on heart disease, one with more columns and less rows, and one with less columns and more rows. Besides this the data was about the same. A course was set to determine which was better for training a model on. Neural Networks and Deep Learning were chosen as the method of modeling.

Starting with Neural Networks of one hidden layer with 100 nodes on each set of data, the following results were found: On the small dataset (less rows) loss: 0.422, accuracy: 0.838, parameters: 1,602. On the large dataset, loss: 0.367, accuracy: 0.832, parameters: 1,402. Really at this level there seems to be no real statistical difference between the models created on the different training sets.

Moving on to a Deep Learning model, with two hidden layers and 100 nodes across the board. The following results were found: On the small dataset, loss: 0.534, accuracy: 0.794, parameters: 11,702. On the larger dataset, loss: 0.353, accuracy: 0.852, parameters: 11,502. This is where this got interesting. While the model for the small dataset was a decrease in performance from the previous model with one layer, the model for the larger dataset was an improvement over its predecessor.

At this point all further modelling on the small dataset was deemed not time worthy and focus was shifted towards improving accuracy on future models for the larger dataset.

A Deep Learning model with three hidden layers and 100 nodes each was trained. It performed well, with a loss of 0.355 and an accuracy of 0.883 with 21,602 parameters. Sadly, this model was unable to be saved and reproducing these numbers has proven difficult.

Next was a dive into tinkering with the number of nodes that just ended up telling a story that simply said stay with 100.

Another model was tried with a layer of 1000 nodes, 500 nodes, 300 nodes running 100 epochs instead of 60 this time and it was able inch up to 88.9% accuracy. But due to its larger size and Heroku’s slug limit, it was deemed to big to use.

==================================

But after some runs a model with 3 hidden layers was created that had an accuracy of 88.26%. This is the model that became the deepHEART model used on this site to predict heart disease.

![deepHEART](static/images/deepHEARTpic8826.jpg)