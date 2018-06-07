"""
    This is the main file which acts as a server 
    All the routes are specified here
"""



from flask import Flask



app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'



if __name__ == '__main__':
    app.run()
