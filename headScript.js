
folderNameSt = "Brain";
       /*  folderNameSt = "Brain";
                imageNameSt = "brain00";
                folderNameSt_a = "Mask";
               imageNameSt_a = "mask00";
              */
              
                folderNameSt = "BrainInside";
                imageNameSt = "brainInside00";
                folderNameSt_a = "Mask";
                imageNameSt_a = "brainInsideMask00";
                fileTypeSt = ".jpg";
                fileTypeSt_a = ".png";
        TotalImages = 36;
       
        
        var digit = "";
        function GetImage(PictureNumber, folderName, imageName, fileType) {
            loadedImages = false;
            ImageArray = new Array();
            for (i = 0; i < TotalImages; i++) {
                ImageArray[i] = new Image();
                ImageArray[i].onLoad = function () {}; //context.fillText("Loaded Image: " + i, 100, 0)
                if(i<10)
                digit = "0";
                else
                digit = "";
                ImageArray[i].src = folderName + "/" + imageName + digit+(i + 1) + fileType;


                if (ImageArray[TotalImages - 1]) {
                    loadedImages = true;
                }
            }
            return ImageArray[PictureNumber];
        }