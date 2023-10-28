import pytesseract
from PIL import Image
import cv2
import pickle
import os

# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# with open(".././Model/IT20175702/my_trained_model.h5", "rb") as file:
#     loaded_model = pickle.load(file)


def detect_letters(resized_img):
    custom_config = r'--oem 3 --psm 6 -l tam'
    img_text = pytesseract.image_to_string(resized_img, config=custom_config)
    return img_text


def extract_sentences(image):
    img = cv2.imread("./Uploads/"+image)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    resized_img = cv2.resize(gray_img, None, fx=2, fy=2,
                             interpolation=cv2.INTER_CUBIC)

    boxes = pytesseract.image_to_data(img)

    for x, b in enumerate(boxes.splitlines()):
        if x != 0:
            b = b.split()

            if len(b) == 12:
                x, y, w, h = int(b[6]), int(b[7]), int(b[8]), int(b[9])
                cv2.rectangle(img, (x, y), (w+x, h+y), (0, 0, 255), 3)

    return detect_letters(resized_img)
