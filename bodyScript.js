  var canvas, canvas_a;
                var context, context_a;
                var turnTable, turntable_a;
                var imageNumber = 1;
                var start_imageNumber = imageNumber;
                var travelDistance = 0;
                var startX = 0;
                var positionA = 0;
       // if (window.addEventListener) {
          
            window.addEventListener('load', function () {

                
                folderNameSt = "Brain";
                imageNameSt = "brain00";
                folderNameSt_a = "Mask";
                imageNameSt_a = "mask00";
                fileTypeSt = ".jpg";
               TotalImages = 36;
               
                function init() {
                    canvas = document.getElementById('myCanvas');
                    context = canvas.getContext('2d');
                    if (!context) {
                        alert('Error: failed to getContext!');
                        return;
                    }
                    turnTable = new turnTable_app();
                    canvas.addEventListener('mousedown', evnt_canvas, false);
                    canvas.addEventListener('mousemove', evnt_canvas, false);
                    canvas.addEventListener('mouseup', evnt_canvas, false);
                }

                function init_a() {
                    canvas_a = document.getElementById('myCanvas_a');
                    context_a = canvas_a.getContext('2d');
                    if (!context_a) {
                        alert('Error: failed to getContext alpha!');
                        return;
                    }
                    turnTable_a = new turnTable_app_a();
                    canvas_a.addEventListener('mousedown', evnt_canvas_a, false);
                    canvas_a.addEventListener('mousemove', evnt_canvas_a, false);
                    canvas_a.addEventListener('mouseup', evnt_canvas_a, false);
                }

                function turnTable_app_a() {
                    this.mousemove = function (ev) {
                    };
                }

                function turnTable_app() {
                    var turnTable = this;
                    this.started = false;

                    this.mousedown = function (ev) {
                        context.moveTo(ev._x, ev._y);
                        turnTable.started = true;
                        context_a.moveTo(ev._x, ev._y);
                        turnTable_a.started = true;
                        this.enabled = true;
                        startX = (ev._x);
                        start_imageNumber = imageNumber;
                    };

                   
                    this.mousemove = function (ev) {
                        if (turnTable.started) {
                            //distance mouse moved (in Px)                    
                            var changeDistance = Math.round((ev._x - startX));
                            var rotation = (360 * changeDistance) / canvas.width;
                            var pcnt_change = (100 * changeDistance) / canvas.width;
                            travelDistance = Math.round((TotalImages * pcnt_change) / 100);
                           
                            imageNumber = start_imageNumber + travelDistance;

                            while (imageNumber > TotalImages - 1) {
                                 imageNumber = imageNumber - TotalImages;
                            }

                            while (imageNumber < 0) {
                                imageNumber = imageNumber + TotalImages;
                            }

                            context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
                         // context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt), 0, 0);
                        }


                        if (turnTable_a.started) {
                           var changeDistance = Math.round((ev._x - startX));
                            var rotation = (360 * changeDistance) / canvas_a.width;
                            var pcnt_change = (100 * changeDistance) / canvas_a.width;

                            travelDistance = Math.round((TotalImages * pcnt_change) / 100);
                            imageNumber = start_imageNumber + travelDistance;

                            while (imageNumber > TotalImages - 1) {
                                imageNumber = imageNumber - TotalImages;
                            }

                            while (imageNumber < 0) {
                                imageNumber = imageNumber + TotalImages;
                            }

                            context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt), 0, 0);
                        }
                    };

                    this.mouseup = function (ev) {
                        if (turnTable.started) {
                            turnTable.mousemove(ev);
                            turnTable.started = false;
                            turnTable_a.mousemove(ev);
                            turnTable_a.started = false;
                        }
                    };
                }




                function evnt_canvas(ev) {
                    if (ev.layerX || ev.layerX == 0) { // Firefox
                        ev._x = ev.layerX;
                        ev._y = ev.layerY;
                    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                        ev._x = ev.offsetX;
                        ev._y = ev.offsetY;
                    }


                    var func = turnTable[ev.type];
                    if (func) {
                        func(ev);
                    }
                }

                function evnt_canvas_a(ev) {
                    if (ev.layerX || ev.layerX == 0) { // Firefox
                        ev._x = ev.layerX;
                        ev._y = ev.layerY;
                    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                        ev._x = ev.offsetX;
                        ev._y = ev.offsetY;
                    }


                    var func_a = turnTable_a[ev.type];
                    if (func_a) {
                        func_a(ev);
                    }
                }

                function findPos(obj) {
                    var current_left = 0,
                        current_top = 0;
                    if (obj.offsetParent) {
                        do {
                            current_left += obj.offsetLeft;
                            current_top += obj.offsetTop;
                        } while (obj == obj.offsetParent);
                        return {
                            x: current_left,
                            y: current_top
                        };
                    }
                    return undefined;
                }

                function rgbToHex(r, g, b) {
                    if (r > 255 || g > 255 || b > 255)
                        throw "Invalid color component";
                    return ((r << 16) | (g << 8) | b).toString(16);
                };

                init_a();
                init();
                canvas.addEventListener('click', function (e) {

                    var position = findPos(this);
                    var x = e.pageX - position.x;
                    var y = e.pageY - position.y;
                    var coordinate = "x=" + x + ", y=" + y;

                    var p = context.getImageData(x, y, 1, 1).data;
                    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
                    var p_a = context_a.getImageData(x, y, 1, 1).data;
                    var hex_a = "#" + ("000000" + rgbToHex(p_a[0], p_a[1], p_a[2])).slice(-6);
                   
                   
                   context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
                   context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt), 0, 0);
  //   context.fillText("Img:" + imageNumber, 0, 100);
     
    // if(x>canvas.width/4 && x<3*canvas.width/4 )
    document.getElementById('text').innerHTML= "(x =" + x + ", y = " + y + ")" +
                        "<BR> HEX: " + hex +
                        "<BR> r= " + p[0] +
                        "\n g= " + p[1] +
                        "\n b= " + p[2] +
                        "\n alpha = " + p[3] +
                        "<BR> MASK VALUES" +
                        "<BR> r_a = " + p_a[0] +
                        "\n g_a = " + p_a[1] +
                        "\n b_a = " + p_a[2] ;
    
               /*  alert("(x =" + x + ", y = " + y + ")" + "\n\n HEX: " + hex +
                        "\n r= " + p[0] +
                        "\n g= " + p[1] +
                        "\n b= " + p[2] +
                        "\n alpha = " + p[3] +
                        "\n\n MASK VALUES" +
                        "\n r_a = " + p_a[0] +
                        "\n g_a = " + p_a[1] +
                        "\n b_a = " + p_a[2]);*/
                });
              }, false);
       // }
       
 function next_Function (){
     imageNumber = (imageNumber+1)%TotalImages;
     document.getElementById('text').innerHTML= "imageNumber" + imageNumber;
     context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt), 0, 0);
     context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
    };
    
     function back_Function (){
        
     imageNumber = (360+imageNumber-1)%TotalImages;
     
     document.getElementById('text').innerHTML= "imageNumber" + imageNumber;
     context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt), 0, 0);
      context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
    }; 
