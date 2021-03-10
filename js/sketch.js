// P_2_2_5_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * pack as many cirlces as possible together
 *
 * MOUSE
 * press + position x/y : move area of interest
 *
 * KEYS
 * 1                    : show/hide circles
 * 2                    : show/hide lines
 * arrow up/down        : resize area of interest
 * f                    : freeze process. on/off
 * s                    : save png
 */
 'use strict';

 var circles = [];

 const maxDistance = 200;
 
 function setup() {

   createCanvas(windowWidth * 3, windowHeight * 3);

   var ii = 0;

    fetch('https://the-one-api.dev/v2/quote?limit=800', {
        headers: {
            'Authorization': 'Bearer s9yLjQPfLF2pL2ywmOGW'
        }
    }).then(response => response.json()).then(data => {

        console.log(data);

        // Loop through all the quotes
        
        data.docs.forEach(doc => {

            // Calc position
        
            var x = random(width * -1, width * 2);
            var y = random(height * -1, height * 2);

            // Does it intersect?

            var intersection = false;
            for (var i = 0; i < circles.length; i++) {
                var d = dist(x, y, circles[i].x, circles[i].y);
                intersection = d < maxDistance;
                if (intersection) {
                    break;
                }
            }

            // Inject into page

            if (!intersection) {

                let randomColor = Math.floor(Math.random()*16777215).toString(16);

                var circle = createDiv(`
                    <div data-w-id="f58df55e-3197-5eed-975f-dfb164ea47d3" class="quote" style="background-color: #${randomColor} ;">
                        <div class="quote-preview">
                        <p class="quote-preview-text">${doc.dialog.substring(0, 14)}</p>
                        </div>
                        <div class="quote-content">
                        <p class="quote-content-text">${doc.dialog}<br><br><strong>- ${doc.character}</strong></p>
                        </div>
                    </div>
                `);

                circle.position(x,y);

                // Save to array
                circles.push(circle);

            }

        ii++;

    });

    // Now load up webflow.js
    var script = document.createElement('script');
    script.src = 'js/webflow.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(script);

    // And scroll!

    $(window).scrollTo({left:windowWidth, top: windowHeight})
    
  });

 }
 
 function draw() {



 }
 


 