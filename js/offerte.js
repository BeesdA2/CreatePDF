const { createOfferte } = require("./createOfferte.js");
var fs = require('fs');

 // Parameter 1 ophalen
	 var vbljson = process.argv[2];
	  console.log('vbljson '+vbljson);
	  
	// Parameter 2 ophalen
	  var vblpdf = process.argv[3];
	  console.log('vblpdf '+vblpdf);

let rawdata = fs.readFileSync(vbljson);  
let offerte = JSON.parse(rawdata);  
let rawdataConfig = fs.readFileSync('/volvo/idas/websphere/config/voorblad/config/offerteConfig.json');  
let offerteConfig = JSON.parse(rawdataConfig);  

createOfferte(offerte, offerteConfig, vblpdf);