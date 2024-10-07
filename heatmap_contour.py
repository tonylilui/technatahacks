import cv2
import numpy as np
from tkinter import Tk, filedialog, Button, Label

def upload_image():
    """Open a file dialog to upload an image."""
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.png *.jpg *.jpeg *.bmp *.tiff")])
    if file_path:
        image_label.config(text=f"Selected Image: {file_path.split('/')[-1]}")
        process_image(file_path)  
    else:
        image_label.config(text="No image selected.")

def process_image(image_path):
    """Process the uploaded image."""
    heatmap = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    if heatmap is None:
        print("Error: Could not load image.")
        return

    heatmap_blurred = cv2.GaussianBlur(heatmap, (5, 5), 0)
    _, thresh = cv2.threshold(heatmap_blurred, 127, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    if len(contours) == 0:
        print("No contours found.")
        return

    contour_image = cv2.cvtColor(heatmap, cv2.COLOR_GRAY2BGR)
    cv2.drawContours(contour_image, contours, -1, (0, 255, 0), 2)

    cv2.imshow('Original Heatmap', heatmap)
    cv2.imshow('Thresholded Heatmap', thresh)
    cv2.imshow('Contours on Heatmap', contour_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

root = Tk()
root.title("Image Upload")
root.geometry("300x150")  

upload_button = Button(root, text="EcoScan 📸", command=upload_image)
upload_button.pack(pady=20)
image_label = Label(root, text="No image selected.")
image_label.pack(pady=10)
root.mainloop()