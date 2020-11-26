# Automatic Apparel Outliner

This repository is a fork of [Look-Into-Person](https://github.com/foamliu/Look-Into-Person).

This repository has the full functionality of the Automatic Apparel Outliner application, all in one convenient location.

WORKING WITH AAO 

Following are the detailed steps and instructions to use AAO application 

AAO webpage is displayed on the web browser when clicked on AAO application link    

http://localhost:12345/home 


You can click on the button “SELECT A FILE” and browse through your device to select an image to upload. The selected image should be of type JPEG, PNG or BMP. Once you select a file, click on “Open” in the bottom to upload that image. 

Select an image with good resolution, white background, and only a single model in it for the best results. 


Once image is uploaded in AAO application, it will show uploaded image on the left side and segmented image on the right side. Segmented image will have mutiple sections in different colors detected by edge detection algorithm. It allows to distiguish the apparel section(s). 


AAO offers customizing outlining color and thickness of an outline. You can select any outline color for the apparel by clicking the box next to “Select an outline color” under Segmented Image section. Click on the desired color for the outlining apparel from color bar and select the shade from above box. Selected color shade appears in color selection box. 



To select the thickness of an outline, click on the box next to “Select an outline thickness” under Segmented Image section. It will bring a small box with options Small, Medium and Large. Choose the desired option by clicking on either of them. Selected option appears in the thickness selection box. 


Then click on the desired apperal section to apply the outline in the Segmented image. Once you click  on the apparel section, the apperal section color is displayed in the box next to “Click the processed image to select the section to outline” under Segmented Image section. It confirms chosen section to apply outline. 


Once all three selections are done, click on the “Outline Selected Segment” button at the bottom. It generates outline with selected color and thickness in both uploaded image and segmented image around the section of the apparel selected.  


To reset the selection and select different color, thickness or section of the image, then click on the “CLEAR OUTLINES” button.  It clears the outlines from Original Image and Segmented image. Select different color, thickness and section of the image as desired. 


Once Original and Segmented image outlined as desired, download them by clicking on “DOWNLOAD IMAGES”.  A Download Options modal will appear with different images options to download.   


Click on the small square selection box next to image options and click on “SUBMIT” to download selected image options. Click “CANCEL” to go back to previous step. 

After clicking SUBMIT button to download selected image options, a zip folder is saved on user device containing all the images you selected to download. Selected image options are then available for use. 