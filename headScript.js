
folderNameSt = "Brain";
        imageNameSt = "Brain00";
        folderNameSt_a = "Mask";
        imageNameSt_a = "Mask00";
        TotalImages = 36;
        fileTypeSt = ".jpg";
        
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