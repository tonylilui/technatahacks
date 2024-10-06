import cv2
import numpy as np
from tkinter import Tk, filedialog

def upload_image():
    root = Tk()
    root.withdraw()  # Hide the Tkinter root window
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.png *.jpg *.jpeg *.bmp *.tiff")])
    
    if file_path:
        return file_path
    else:
        print("No image selected.")
        return None

image_path = upload_image()

if image_path is None:
    exit()

heatmap = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

if heatmap is None:
    print("Error: Could not load image.")
    exit()

heatmap_blurred = cv2.GaussianBlur(heatmap, (5, 5), 0)

_, thresh = cv2.threshold(heatmap_blurred, 127, 255, cv2.THRESH_BINARY)

contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

if len(contours) == 0:
    print("No contours found.")
    exit()

contour_image = cv2.cvtColor(heatmap, cv2.COLOR_GRAY2BGR)
cv2.drawContours(contour_image, contours, -1, (0, 255, 0), 2)

cv2.imshow('Original Heatmap', heatmap)
cv2.imshow('Thresholded Heatmap', thresh)
cv2.imshow('Contours on Heatmap', contour_image)

cv2.waitKey(0)
cv2.destroyAllWindows()