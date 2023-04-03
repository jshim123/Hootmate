# Hootmate
Hoomate is a webpage designed to help students find roommates that match them based on there characteristics, housing preference and lifestyle. The matching algorithm uses several python packages. Pandas are used to read the csv file containing the data.

It uses a cosine similarity algorithm to gather user preferences along with the importance of those specific preferences. The users were then matched according to their similarity scores. The similarity score is a measure that calculates the cosine of the angle between two vectors in a high-dimensional space. In this case, this was represented by the preferences of the two users. After calculating the cosine similarity between pairs, the algorithm generates a similarity matrix that identifies the top N most similar individuals to a given user.

In addition to the algorithm, we designed a webpage that has all the essential features. We have a home, about, community, rent calculator, available rooms, and a login/register. All these features in combination with the main algorithm creates the final product that is Hoomate.

