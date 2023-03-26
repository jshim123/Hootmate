import os
from twilio.rest import Client
from flask import Flask

app = Flask(__name__)



account_sid = 'AC8ce1089e67a7b58f62715b70e0407e9a'
auth_token = '651a29dcee255a4a764bb8821033e938'
client = Client(account_sid, auth_token)

message = client.messages \
    .create(
         body='MATCH',
         from_=+18665253410,
         to=+15713208633
     )
print(message.sid)

@app.route('/run-python')
def run_python():

    return 'Python code executed'
if __name__ == '__main__': 
    app.run()