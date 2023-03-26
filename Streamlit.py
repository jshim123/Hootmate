
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime
import streamlit as st

df = pd.read_csv("/Users/khami/Downloads/data2.csv")



background_image = "/Users/khami/HoomMate/images/img2.jpg"  # REPLACE WITH YOUR IMAGE PATH
st.markdown(
    f"""
    <style>
        body {{
            background-image: url({background_image});
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
            background-size: cover;
        }}
    </style>
    """,
    unsafe_allow_html=True,
)

# ...rest of your code


def preprocess_data(df):
    df = df.dropna()  

    df = df[df.Budget > 0]  

    df['Date_Of_Birth'] = pd.to_datetime(df['Date_Of_Birth'], format="%m/%d/%Y")
    now = datetime.now()
    df['Age'] = (now - df['Date_Of_Birth']).astype('<m8[Y]')

    return df

def find_top_matches(budget, pets, gender, date_of_birth, top_n=5):
    preprocessed_df = preprocess_data(df)

    user_data = pd.DataFrame({'Budget': [budget],
                              'Pets': [pets],
                              'Gender': [gender],
                              'Date_Of_Birth': [date_of_birth],
                              'Age': [(datetime.now() - pd.to_datetime(date_of_birth, format="%m/%d/%Y")).days / 365]},
                             index=['User'])
    preprocessed_df = preprocessed_df.append(user_data)

    encoder = OneHotEncoder(handle_unknown='ignore')
    categorical_data = preprocessed_df[['Pets', 'Gender']]
    encoded_data = encoder.fit_transform(categorical_data).toarray()

    scaler = StandardScaler()
    numerical_data = preprocessed_df[['Budget', 'Age']]
    scaled_data = scaler.fit_transform(numerical_data)

    X = np.hstack((encoded_data, scaled_data))

    similarity_matrix = cosine_similarity(X)

    similarity_df = pd.DataFrame(similarity_matrix, index=preprocessed_df.index, columns=preprocessed_df.index)

    user_similarity = similarity_df.loc['User'].drop('User')
    top_matches = user_similarity.nlargest(top_n)

    return top_matches

st.title("Roommate Matching")

budget = st.number_input("Your Budget", min_value=1000, max_value=3000, step=100)
pets = st.selectbox("Do you have pets?", options=["Yes", "No"])
gender = st.selectbox("Your Gender", options=["M", "F"])
date_of_birth = st.date_input("Your Date of Birth")

if st.button("Find Top Matches"):
    top_matches = find_top_matches(budget, pets, gender, date_of_birth.strftime("%m/%d/%Y"))

    st.subheader("Top 5 Matches")
    for idx, score in top_matches.items():
        st.write(f"{idx}: Similarity Score: {score:.2f}")