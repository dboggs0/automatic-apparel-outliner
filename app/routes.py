import random
import string

from flask import send_from_directory, send_file, request, json
from app import app
from app.process.segnet.segment import img_process
from app.tools.dirs import save_upload, save_processed, get_original, get_segmented
from app.process.outline import *
from app.process.base64conversion import *
from PIL import Image  # Delete once purged of pillow
import cv2.cv2 as cv2


@app.route('/')
@app.route('/home')
def index():
    return send_file('../dist/web/index.html', 'text/html')


# delete img after processing
@app.route('/segment', methods=['GET', 'POST'])
def upload_file():
    b64_string = request.form['image']

    serial_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    filename = serial_id + '.png'
    image = from_base64(b64_string)

    file_info = save_upload(image, filename)
    img_data = img_process(file_info[0])
    pro_img = save_processed(img_data, file_info[1])

    processed_base64 = to_base64(pro_img)
    temp = from_base64(processed_base64)
    cv2.imwrite('temp.png', temp)
    return json.jsonify(segmentedImage=get_html(processed_base64), serialID=serial_id)


@app.route('/outline', methods=['GET', 'POST'])
def select_segment():
    seg_rgb = request.form['segmentColor']
    outline_color = request.form['outlineColor']
    outline_thickness = request.form['outlineThickness']
    outline_thickness_int = int(outline_thickness)
    serial_id = request.form['serialID']

    seg_image_path = get_segmented(serial_id)
    orig_image_path = get_original(serial_id)
    seg_img = Image.open(seg_image_path)
    img_outline = get_outline(seg_img, seg_rgb)
    orig_image = Image.open(orig_image_path)
    orig_image = paste_outline(orig_image, img_outline, outline_color, outline_thickness_int)
    seg_img = paste_outline(seg_img, img_outline, outline_color, outline_thickness_int)

    orig_image.save(orig_image_path)
    seg_img.save(seg_image_path)

    seg_img = get_html(to_base64(seg_image_path))
    orig_image = get_html(to_base64(orig_image_path))

    return json.jsonify(originalOutline=orig_image, segmentedOutline=seg_img)


# @app.route('/download_image', methods=['POST'])
# def download_image():


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('../dist/web', path)
