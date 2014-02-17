  var canvas, canvas_a;
                var context, context_a;
                var turnTable, turntable_a;
                var imageNumber = 1;
                var start_imageNumber = imageNumber;
                var travelDistance = 0;
                var startX = 0;
                var positionA = 0;
                
               var FONTAL_LOBE = 230;
               var PARIETAL_LOBE = 191;
               var OCCIPITAL_LOBE = 26;
               var TEMPORAL_LOBE = 64;
               var CEREBELLUM = 128;
               var LONGITUDINAL_FISSURE= 13;
               var CEREBRAL_CORETX = 166;
               var THALAMUS = 204;
               var HYPOTHALAMUS = 217;
               var OTHER = 243;
             
               var area_00={name:"FONTAL_LOBE",
                        color:230,
                        filename:"select_00_00",
                        content:"<b>Frontal Lobe:</b><br/> Frontal part of the cerebral cortex, centrally involved in higher thought processes."}; 
               
               var area_01={name:"PARIETAL LOBE",
                        color:191,
                        filename:"select_01_00",
                        content:"<b>Parietal Lobe:</b><br/> Cerebral lobes located just above the temporal lobes, between the frontal and occipital lobes. The parietal lobes are involved in sensation."};
                        
              var area_02={name:"OCCIPITAL LOBE",
                        color:26,
                        filename:"select_02_00",
                        content:"<b>Occipital Lobe:</b><br/> Part of the cerebral cortex located at the rear of the brain, involved in vision."};
             
             var area_03={name:"TEMPORAL LOBE",
                        color:64,
                        filename:"select_03_00",
                        content:"<b>Temporal Lobe:</b><br/> Cerebral structure located on either side of the cerebrum, associated primarily with speech, language, and hearing."};
            
            var area_04={name:"CEREBELLUM",
                        color:128,
                        filename:"select_04_00",
                        content:"<b>Cerebellum:</b><br/> A major brain structure attached to the rear of the brain stem, whose principal functions appear to be coordinating motor activity and maintaining balance."};
                        
            var area_05={name:"LONGITUDINAL_FISSURE",
                        color:13,
                        filename:"select_05_00",
                        content:""};
                        
            var area_06={name:"CEREBRAL_CORETX",
                        color: 166,
                        filename:"select_06_00",
                        content:"<b>Cerebral Cortex:</b><br/> The convoluted outer covering of the cerebrum, the main functions of which have to do with higher mental processes like thinking and imagining."};
                        
            var area_07={name:"THALAMUS",
                        color:204,
                        filename:"select_07_00",
                        content: "<b>Thalamus:</b><br/> A small brain structure that serves as a major relay center for incoming sensory signals."};
                        
             var area_08={name:"HYPOTHALAMUS",
                        color:217,
                        filename:"select_08_00",
                        content:"<b>Hypothalamus:</b><br/> A small structure at the base of the brain involved in the functioning of the autonomic nervous system and in temperature regulation."};
                        
             var area_09={name:"OTHER",
                        color:243,
                        filename:"select_09_00",
                        content:"<b>Corpus Callosum</b>"};
                        
          var brain = new Array();
          brain[0] = area_00;
          brain[1] = area_01;
          brain[2] = area_02;
          brain[3] = area_03;
          brain[4] = area_04;
          brain[5] = area_05;
          brain[6] = area_06;
          brain[7] = area_07;
          brain[8] = area_08;
          brain[9] = area_09;
          
          
                
       // if (window.addEventListener) {
          
            window.addEventListener('load', function () {

              
                folderNameSt = "BrainInside";
                imageNameSt = "brainInside00";
                fileTypeSt = ".jpg";
               
                folderNameSt_a = "Mask";
                imageNameSt_a = "brainInsideMask00";
                 fileTypeSt_a = ".png";
               
                folderNameSt_s = "Select";
                fileTypeSt_s = ".png";
                
                
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
                    context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
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
                    context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt_a), 0, 0);
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

                            context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt_a), 0, 0);
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
                    
                    //var p_select = context_a.getImageData(x, y, 640, 480).data;
                    
                    var hex_a = "#" + ("000000" + rgbToHex(p_a[0], p_a[1], p_a[2])).slice(-6);
                   
                   context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
                   context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt_a), 0, 0);
                  /* 
                   // Fill Style
                   context.fillStyle = "rgba(200,200,0,0.30)";
                   context.beginPath();
                    //Canvas shape
                    context.arc(x,y,20,0,Math.PI*2,true);
                    // Close path
                    context.closePath();
                    // Fill shape
                    context.fill();
                    */

          // Draw Selection image    
               for (var i=0;i<brain.length;i++){
                if(p_a[0] == brain[i].color)
               { document.getElementById('text').innerHTML= brain[i].content;
                 context.drawImage(GetImage(imageNumber, folderNameSt_s, brain[i].filename, fileTypeSt_s), 0, 0);
               }
               }
           
                });
              }, false);
       // }
       
 function next_Function (){
     imageNumber = (imageNumber+1)%TotalImages;
     document.getElementById('text').innerHTML= "Click on the Right and Left arrows to rotate the brain. Double click on the brain to identify part.";
     context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt_a), 0, 0);
     context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
    };
    
     function back_Function (){
        
     imageNumber = (360+imageNumber-1)%TotalImages;
     
     document.getElementById('text').innerHTML= "Click on the Right and Left arrows to rotate the brain. Click on the brain to identify part.";
     context_a.drawImage(GetImage(imageNumber, folderNameSt_a, imageNameSt_a, fileTypeSt_a), 0, 0);
      context.drawImage(GetImage(imageNumber, folderNameSt, imageNameSt, fileTypeSt), 0, 0);
    }; 
