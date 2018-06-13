"""
    This is the main file which acts as a server 
    All the routes are specified here
"""

#from flask_cors import CORS # DRK 6/10/18 for Cross-Origin Resource Sharing (CORS); needed for Single Page Application (SPA)
from flask import Flask, render_template


# Flask application
app = Flask(__name__)
#CORS(app)


@app.route('/') # home page
def index():
    return render_template('index.html')



if __name__ == '__main__':
    app.run()
