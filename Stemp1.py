import pandas as pd
import streamlit as st
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler

st.title("Roommate Matching")

# Read the CSV file
df = pd.read_csv("/xampp/htdocs/HoomMate Final/Data6.csv", index_col="Name")

# Drop the 'Phone' column
df.drop(columns=['Phone'], inplace=True)

# Preprocess the data
def preprocess_data(df):
    df = df.copy()
    sleeping_habits_col = df.columns[df.columns.str.strip() == 'Sleeping_Habits'][0]
    df = pd.get_dummies(df, columns=['Gender', 'Grade', 'Smoking', 'Drinking', 'Pets', 'Disability_Access', 'Amenities', 'Cleanliness', sleeping_habits_col, 'Social_Habit'])
    scaler = MinMaxScaler()
    df['Budget'] = scaler.fit_transform(df[['Budget']])
    return df, sleeping_habits_col

# Calculate similarity
def find_similar_people(user_profile, df, n=5):
    similarity_matrix = cosine_similarity(df, user_profile)
    most_similar_indices = similarity_matrix.reshape(-1).argsort()[-n:][::-1]
    return most_similar_indices

# Preprocess the dataframe
preprocessed_df, sleeping_habits_col = preprocess_data(df)

# User input
st.header("Personal Details")
gender = st.selectbox("Gender", ["Male", "Female", "Other"])
grade = st.selectbox("Grade", ["Freshman", "Sophomore", "Junior", "Senior"])

st.header("About Me")
pets = st.selectbox("Pets", ["Yes", "No"])
smoking = st.selectbox("Smoking", ["Yes", "No"])
drinking = st.selectbox("Drinking", ["Yes", "No"])

st.header("Property Preferences")
budget = st.slider("Budget", int(df['Budget'].min()), int(df['Budget'].max()), int(df['Budget'].mean()))
amenities = st.selectbox("Amenities", ["Furnished", "Unfurnished"])
disability_access = st.selectbox("Disability Access", ["Yes", "No"])

st.header("Personal Preferences")
cleanliness = st.selectbox("Cleanliness", ["Very Tidy", "Tidy", "Very Untidy"])
sleeping_habits = st.selectbox("Sleeping Habits", ["Early", "Late", "Very Late"])
social_habit = st.selectbox("Social Habit", ["Introverted", "Balanced", "Very Social"])

# Create user profile
user_profile = pd.DataFrame([[budget, gender, grade, smoking, drinking, pets, disability_access, amenities, cleanliness, sleeping_habits, social_habit]],
                            columns=['Budget', 'Gender', 'Grade', 'Smoking', 'Drinking', 'Pets', 'Disability_Access', 'Amenities', 'Cleanliness', sleeping_habits_col, 'Social_Habit'])

user_profile, _ = preprocess_data(user_profile)
user_profile = user_profile.reindex(columns=preprocessed_df.columns, fill_value=0)

# Find similar people
similar_indices = find_similar_people(user_profile, preprocessed_df)
top_matches = df.iloc[similar_indices]

# Display results
st.header("Top 5 Similar Roommates")
st.write(top_matches[['Gender', 'Grade', 'Smoking', 'Drinking', 'Pets', 'Disability_Access', 'Budget', 'Amenities', 'Cleanliness', sleeping_habits_col]])