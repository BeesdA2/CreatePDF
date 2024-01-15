const { createVoorblad } = require("./createVoorblad.js");
var fs = require('fs');

 // Parameter 1 ophalen
	 var vbljson = process.argv[2];
	  console.log('vbljson '+vbljson);
	  
	// Parameter 2 ophalen
	  var vblpdf = process.argv[3];
	  console.log('vblpdf '+vblpdf);

let rawdata = fs.readFileSync(vbljson);  
let voorblad = JSON.parse(rawdata);  
let rawdataConfig = fs.readFileSync('/volvo/idas/websphere/config/voorblad/config/voorbladConfig.json');  
let voorbladConfig = JSON.parse(rawdataConfig);  

createVoorblad(voorblad, voorbladConfig, vblpdf);