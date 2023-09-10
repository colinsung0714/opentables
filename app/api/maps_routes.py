from flask import Blueprint, jsonify
import os

maps_routes = Blueprint('maps', __name__)

@maps_routes.route('/key', methods=['POST'])
def google_maps():
    google_api_key = os.environ.get('MAPS_API_KEY')
    return {'googleMapsAPIKey':google_api_key}