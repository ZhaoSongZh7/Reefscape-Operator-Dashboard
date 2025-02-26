# Filename - server.py

# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from networktables import NetworkTables
import datetime
# To see messages from networktables, you must setup logging
import logging
import json

logging.basicConfig(level=logging.DEBUG)

x = datetime.datetime.now()

def get_network_tables():
    NetworkTables.initialize(server='10.17.96.2')  # Replace with your RoboRIO's hostname or IP
    sd = NetworkTables.getTable("SmartDashboard")

    return sd


sd = get_network_tables()

# Initializing flask app
app = Flask(__name__)
CORS(app)

# Route for seeing a data
@app.route('/update', methods=['POST'])
def update_data():
    try:
        data = request.get_json()
        print(data)

        # Load New Data
        level_two_array = data.get("levelTwoArray", [])
        level_three_array = data.get("levelThreeArray", [])
        level_four_array = data.get("levelFourArray", [])

        # Retrieve previous values from NetworkTables
        prev_level_two = get_previous_data("Level 2 Coral Array")
        prev_level_three = get_previous_data("Level 3 Coral Array")
        prev_level_four = get_previous_data("Level 4 Coral Array")

        # Update SmartDashboard
        # Log only the changed values and update NetworkTables
        log_changes("Level 2 Coral Array", prev_level_two, level_two_array)
        log_changes("Level 3 Coral Array", prev_level_three, level_three_array)
        log_changes("Level 4 Coral Array", prev_level_four, level_four_array)

        return jsonify({"message": "Data received successfully!", "data": data})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
def get_previous_data(key):
    # Retrieve the stored value from NetworkTables and parse it as a list.
    stored_value = sd.getString(key, "[]")  # Default to "[]" if key doesn't exist
    return json.loads(stored_value)  # Convert string back to a Python list

def log_changes(key, old_data, new_data):
    # Logs and updates only the changed values.
    if old_data != new_data:
        logging.info(f"{key} changed: {old_data} -> {new_data}")
        sd.putString(key, json.dumps(new_data))  # Update NetworkTables with new value
        
# Running app
if __name__ == '__main__':
    app.run(debug=True)