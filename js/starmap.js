
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
            //document.getElementById("Aslan").children[0].style.borderRadius="100%";
            //document.getElementById("Aslan").children[0].style.outline="#1c9701 thick solid";
            //sessionStorage.setItem("currentPlanet", "Aslan");
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
            } else if (hasMatchingLocations && sessionStorage.getItem("fuel")>0){
                sessionStorage.setItem("fuel",sessionStorage.getItem("fuel")-1);
                document.getElementById("fuelText").textContent=sessionStorage.getItem("fuel");
                console.log("Traveling to "+ planet +"!");
                // Clear Last Planet
                let lastPlanet = sessionStorage.getItem("currentPlanet");
                document.getElementById(lastPlanet).children[0].style.outline="";
                hideLines();
                // Set New Planet
                document.getElementById(planet).children[0].style.outline="rgba(0, 128, 0, 0.85) thick solid";
                sessionStorage.setItem("currentPlanet", planet);
                showLines();
                // Check for events
                checkEvent(planet);
            } else if (sessionStorage.getItem("fuel")==0){
                alert("You are out of fuel! You have no choice but to send out distress signals.")
                setTimeout(function(){
                    var randInt = Math.floor(Math.random() * 3)+1;
                    randInt = 2;
                    if (randInt == 1){
                        console.log("Out of fuel! Pirate arrives!");
                        // Battle

                    } else if (randInt == 2){
                        console.log("Out of fuel! Civilian arrives!");
                        // Fuel donation
                        alert("After some time, a civilian vessel arrives - it takes pity on you and offers 1 fuel.");
                        sessionStorage.setItem("fuel",1);
                        document.getElementById("fuelText").textContent=sessionStorage.getItem("fuel");
                    } else if (randInt == 3){
                        console.log("Out of fuel! Trader arrives!");
                        // Trade

                    }
                 }, 1000); 
            } else {
                console.log("Cannot travel to non-neighboring planets");
            }
        }
        function forcetravelTo(planet) {
            // Test: Is Neighbor Planet?
            //console.log("Force traveling to "+ planet);
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
        
        function worldSeed(sessionSeed){
            var difficulty = sessionStorage.getItem("difficulty");
            var lastPos = sessionStorage.getItem("currentPlanet");
            
            // For testing
            difficulty = '1'; sessionStorage.setItem("difficulty", difficulty);
            //lastPos = null; //sessionStorage.setItem("currentPlanet", lastPos);

            // Populate Events
            var faction1Planets = ["Aslan","Seidon","Valera","Hymera","Starholm","Bioholm","Kaelda","Caema","Serenity","Lumera","Crysholm","Thyrmae"];
            var faction2Planets = ["KG-348", "Irulan", "Acheron", "Cerulan", "Thedus", "Cigni", "Neo Eden", "LV-223", "Providence", "Caladan", "LV-178"];
            var faction3Planets = ["Betelgeuse", "Alnitak", "Alnilam", "Mintaka", "Omni Prime", "Meissa", "Theta-1E", "Hatsya", "Rigel", "Theta-1B", "Fury-161"];
            var faction4Planets = ["Forge", "New Hope", "Ionus", "Liberty", "Haven", "XT-5", "Sky Ark", "Drybone", "XT-0", "Theta-1C", "Eos", "XT-3"];
            //console.log(faction1Planets);
            sessionStorage.setItem("allFactionsPlanets",[faction1Planets,faction2Planets,faction3Planets,faction4Planets]);
            var allFactionsPlanets = sessionStorage.getItem("allFactionsPlanets");

            // Ensure Spawn
            if (lastPos==null){ // If no session save found
                console.log("Save Not Found")
                switch(difficulty){ // Set spawn location based on faction select 
                    case '1':
                        forcetravelTo("Hymera");
                        faction1Planets.splice(faction1Planets.findIndex(el => el == "Hymera"), 1);
                        break;
                    case '2':
                        forcetravelTo("Acheron");
                        faction2Planets.splice(faction2Planets.findIndex(el => el == "Acheron"), 1);
                        
                        break;
                    case '3':
                        forcetravelTo("Meissa");
                        faction3Planets.splice(faction3Planets.findIndex(el => el == "Meissa"), 1);
                        
                        break;
                }
            } else {
                forcetravelTo(lastPos);
            }

            // Ensure Seed
            if (sessionSeed==null){
                // Generating Seed
                var seed = Math.floor((Math.random()*eval("faction"+sessionStorage.getItem("difficulty")+"Planets.length"))+1);
                seed = 0; // Testing
                sessionStorage.setItem("seed", seed);
            } 

            // Faction Events - Last event may be cut depending on player start
            //var exampleEvents=["battle", "battle", "asteroid"] //3 events
            var faction1Events=["battle", "", "", "", "", "", "", "", "", "asteroid", "", ""] //12 events
            var faction2Events=["", "", "", "", "", "", "", "", "", "", ""] //11 events
            var faction3Events=["", "", "", "", "", "", "", "", "", "", ""] //11 events
            var faction4Events=["", "", "", "", "", "", "", "", "", "", "", ""] //12 events

            // Apply Seed Randomizer
            for (i=0; i<sessionStorage.getItem("seed"); i++){ // Faction 1
                var temp=faction1Events[faction1Events.length-1];
                faction1Events.splice(faction1Events.length-1,1);
                faction1Events.unshift(temp)
            }
            for (i=0; i<sessionStorage.getItem("seed"); i++){ // Faction 2
                var temp=faction2Events[faction2Events.length-1];
                faction2Events.splice(faction2Events.length-1,1);
                faction2Events.unshift(temp)
            }
            for (i=0; i<sessionStorage.getItem("seed"); i++){ // Faction 3
                var temp=faction3Events[faction3Events.length-1];
                faction3Events.splice(faction3Events.length-1,1);
                faction3Events.unshift(temp)
            }
            for (i=0; i<sessionStorage.getItem("seed"); i++){ // Faction 4
                var temp=faction4Events[faction4Events.length-1];
                faction4Events.splice(faction4Events.length-1,1);
                faction4Events.unshift(temp)
            }
            // Events and Planets Log
            //console.log(faction1Planets, faction2Planets, faction3Planets, faction4Planets);
            //console.log(faction1Events, faction2Events, faction3Events, faction4Events);
            
            sessionStorage.setItem("faction1Planets",JSON.stringify(faction1Planets));
            sessionStorage.setItem("faction2Planets",JSON.stringify(faction2Planets));
            sessionStorage.setItem("faction3Planets",JSON.stringify(faction3Planets));
            sessionStorage.setItem("faction4Planets",JSON.stringify(faction4Planets));
            sessionStorage.setItem("faction1Events",JSON.stringify(faction1Events));
            sessionStorage.setItem("faction2Events",JSON.stringify(faction2Events));
            sessionStorage.setItem("faction3Events",JSON.stringify(faction3Events));
            sessionStorage.setItem("faction4Events",JSON.stringify(faction4Events));
        }

        function checkEvent(planet){
            var faction1Planets = JSON.parse(sessionStorage.getItem("faction1Planets"));
            var faction2Planets = JSON.parse(sessionStorage.getItem("faction2Planets"));
            var faction3Planets = JSON.parse(sessionStorage.getItem("faction3Planets"));
            var faction4Planets = JSON.parse(sessionStorage.getItem("faction4Planets"));
            var faction1Events = JSON.parse(sessionStorage.getItem("faction1Events"));
            var faction2Events = JSON.parse(sessionStorage.getItem("faction2Events"));
            var faction3Events = JSON.parse(sessionStorage.getItem("faction3Events"));
            var faction4Events = JSON.parse(sessionStorage.getItem("faction4Events"));
            
            var event;

            for (i=1; i<4; i++){
                var index = eval("faction" + i + "Planets.indexOf(\""+planet+"\");");
                //console.log(faction1Planets.indexOf("Aslan"))
                if (index==-1){
                    //console.log("Planet not found in array")
                } else {
                    event = eval("faction" + i + "Events[" + index + "]");
                    console.log("Planet: " + planet + "|" + "Faction: " + i + 
                                "|" + "Event: " + event);
                    switch(event){
                        case "battle":
                            console.log("Battle Initiated!");
                            debug("battle");
                            sessionStorage.setItem("activeEvent", "battle");
                            break;
                        case "asteroid":
                            console.log("Asteroids detected!");
                            debug("asteroid");
                            sessionStorage.setItem("activeEvent", "asteroid");
                            break;
                        default:
                            break;
                    }
                }
            }
            
        }
