const GEOJSON_BASEURL = "http://geojson.io/#data=data:application/json,"

function getGeojson(coordinates){
    return {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": JSON.parse(coordinates)
            }
          }
        ]
      }
}

function getGeojsonUrl(geojson){
    return GEOJSON_BASEURL+encodeURIComponent(JSON.stringify(geojson));
}

function lineToDateString(strEpochMillis){
    return new Date(parseInt(strEpochMillis)).toString()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function main(){
    await sleep(5000); // wait for thee page to load
    console.log("hello from main");

    // input field for date display
    inp = document.createElement("input");
    inp.id = "inp";
    inp.style["width"]="1000px";
    document.getElementsByClassName("kuiLocalBreadcrumb")[0].append(inp);
    attached_inp = document.getElementById("inp"); 


    // url element for geojson url
    url = document.createElement("a");
    url.id = "geojsonUrl";
    url.style["margin"]="20px";
    url.target="_blank";
    url.innerHTML="to Geojson";
    document.getElementsByClassName("kuiLocalBreadcrumb")[0].append(url);
    attached_url = document.getElementById("geojsonUrl"); 
    
    // Listen to "copy" event 
    document.addEventListener('copy', (event) => {
        navigator.clipboard.readText()
            .then(text => {
                let epochMillis = text.match(/(?:^|\D)(\d{13})(?:$|\D)/); // matches epoch millis in the copied text
                let coordinates = text.match(/\[\s+\[\s+\[(?:.|\n)*\]\s+\]\s+\]/) // matches coordinates in he copied text
                
                if (epochMillis){
                    // set the input fields value to the formatted date
                    attached_inp.value = lineToDateString(epochMillis[1]);
                }
                
                if (coordinates){
                    // set the url href to geojson url 
                    attached_url.href = getGeojsonUrl(getGeojson(coordinates[0]));
                }
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
    });
}

main();

// I tried to get the selected text instead of having to copy it, but his method did not work on kibana

// function getSelectionText() {
//     var text = "";
//     if (window.getSelection) {
//         text = window.getSelection().toString();
//     } else if (document.selection && document.selection.type != "Control") {
//         text = document.selection.createRange().text;
//     }
//     return text;
// }
