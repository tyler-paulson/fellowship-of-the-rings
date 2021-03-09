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
   createCanvas(windowWidth, windowHeight);
   noFill();
   ellipseMode(RADIUS);
   rectMode(RADIUS);

   var ii = 0;

    fetch('https://the-one-api.dev/v2/quote?limit=1000', {
        headers: {
            'Authorization': 'Bearer s9yLjQPfLF2pL2ywmOGW'
        }
    })
    .then(response => response.json())
    .then(data => {
    console.log(data.docs.length);
    data.docs.forEach(doc => {
        
        var x = random(0, width * 3);
        var y = random(0, height * 3);

        var intersection = false;
        for (var i = 0; i < circles.length; i++) {
            var d = dist(x, y, circles[i].x, circles[i].y);
            intersection = d < maxDistance;
            if (intersection) {
                break;
            }
        }

        if (!intersection) {

            var randomColor = Math.floor(Math.random()*16777215).toString(16);

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
            circles.push(circle);

        }

        ii++;

    });

    var script = document.createElement('script');
    script.src = 'js/webflow.js';
    script.type = 'text/javascript';

    document.getElementsByTagName('body')[0].appendChild(script);
    
  });

 }
 
 function draw() {

    

 }
 


 