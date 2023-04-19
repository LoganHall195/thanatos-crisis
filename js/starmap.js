
        /*** Highway Drawing ***/
        $(window).on('load', function() {
            const highways = $("#highways");

            highways.children().each(function() {
                const childId = $(this).attr('id');

                const firstVar = childId.substring(0, childId.indexOf('_'));
                const secondVar = childId.substring(childId.indexOf('_') + 1, childId.lastIndexOf('_'));
                const thirdVar = childId;

                adjustLine(firstVar, secondVar, thirdVar);
            });

            /* Temp Start Aslan */
            document.getElementById("Aslan").children[0].style.borderRadius="100%";
            document.getElementById("Aslan").children[0].style.outline="#1c9701 thick solid";
            sessionStorage.setItem("currentPlanet", "Aslan");
            showLines();
            /********************/
        });
        // Hide Lines
        function hideLines(){
            const highways = document.getElementById("highways");

            const specifiedString = sessionStorage.getItem("currentPlanet");
            const childElements = highways.querySelectorAll('[id]');

            for (let i = 0; i < childElements.length; i++) {
                const childId = childElements[i].id;
                if (childId.includes(specifiedString)) {
                childElements[i].style.opacity = 0.15;
                }
            }
        }
        // Show Close Lines
        function showLines(){
            const highways = document.getElementById("highways");

            const specifiedString = sessionStorage.getItem("currentPlanet");
            const childElements = highways.querySelectorAll('[id]');

            for (let i = 0; i < childElements.length; i++) {
                const childId = childElements[i].id;
                if (childId.includes(specifiedString)) {
                childElements[i].style.opacity = 0.5;
                }
            }
        }
        // Create Lines (https://jsfiddle.net/rdamasceno/o3Lroapa/5/)
        function adjustLine(from, to, line){
            line = document.getElementById(line);
            from = document.getElementById(from);
            to = document.getElementById(to);

            line.style.position="absolute";
            line.style.width="2px";
            line.style.marginTop="-1px";
            line.style.backgroundColor="white";
            line.style.opacity = "0.15";
            
            var fT = from.offsetTop  + from.offsetHeight/2.5;
            var tT = to.offsetTop 	 + to.offsetHeight/2.5;
            var fL = from.offsetLeft + from.offsetWidth/2.3;
            var tL = to.offsetLeft 	 + to.offsetWidth/2.3;

            var CA   = Math.abs(tT - fT);
            var CO   = Math.abs(tL - fL);
            var H    = Math.sqrt(CA*CA + CO*CO);
            var ANG  = 180 / Math.PI * Math.acos( CA/H );

            if(tT > fT){
                var top  = (tT-fT)/2 + fT;
            }else{
                var top  = (fT-tT)/2 + tT;
            }
            if(tL > fL){
                var left = (tL-fL)/2 + fL;
            }else{
                var left = (fL-tL)/2 + tL;
            }

            if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
                ANG *= -1;
            }
            top-= H/2;

            line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
            line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
            line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
            line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
            line.style["-transform"] = 'rotate('+ ANG +'deg)';
            line.style.top    = top+'px';
            line.style.left   = left+'px';
            line.style.height = H + 'px';
        }
    /*** Planet Travel ***/
        // Travel
        function travelTo(planet) {
            // Test: Is Neighbor Planet?
            const hasMatchingLocations = checkHighwayLocations(planet, sessionStorage.getItem("currentPlanet"));
            if (planet==sessionStorage.getItem("currentPlanet")){
                // Probably put interaction here
                console.log("You are already there"); 
            } else if (hasMatchingLocations){
                console.log("Traveling to "+ planet +"!");
                // Clear Last Planet
                let lastPlanet = sessionStorage.getItem("currentPlanet");
                document.getElementById(lastPlanet).children[0].style.outline="";
                hideLines();
                // Set New Planet
                document.getElementById(planet).children[0].style.outline="rgba(0, 128, 0, 0.85) thick solid";
                sessionStorage.setItem("currentPlanet", planet);
                showLines();
            } else {
                console.log("Cannot travel to non-neighboring planets");
            }
        }
        function forcetravelTo(planet) {
            // Test: Is Neighbor Planet?
            console.log("Traveling to "+ planet +"!");
            // Clear Last Planet
            let lastPlanet = sessionStorage.getItem("currentPlanet");
            document.getElementById(lastPlanet).children[0].style.outline="";
            hideLines();
            // Set New Planet
            document.getElementById(planet).children[0].style.outline="rgba(0, 128, 0, 0.85) thick solid";
            sessionStorage.setItem("currentPlanet", planet);
            showLines();
        }
        // Check if neighboring planet
        function checkHighwayLocations(location1, location2) {
            const highways = document.getElementById("highways");

            const childElements = highways.children;

            for (let i = 0; i < childElements.length; i++) {
                const childId = childElements[i].id;
                if (childId.includes(location1) && childId.includes(location2)) {
                return true;
                }
            }

            return false;
        }