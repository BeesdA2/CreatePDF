const fs = require("fs");
const PDFDocument = require("pdfkit");
const async = require('async');
const request = require('request');
//var LineBreaker = require('linebreak');

 

function createVoorblad(voorblad, voorbladConfig, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  registerFonts(doc);
  generateHeader(doc, voorblad);
  
  generateVoorbladImages(doc, voorblad, voorbladConfig, path, function(err,data){
	if(err){
		throw err;
	}else{
		console.log(data);
		generateVoorbladKlantInformatie(doc, voorblad, voorbladConfig);
	doc.end();
  doc.pipe(fs.createWriteStream(path));
		
	}
  });
   

  
}

function generateHeader(doc, voorblad) {
	try {
  if (fs.existsSync(voorblad.overlayImage)) {
    doc
    .image(voorblad.overlayImage, 1, 1 ,{width: 600} );
  }
} catch(err) {
  //console.error(err)
}  
  
    
}

function generateVoorbladKlantInformatie(doc, voorblad, voorbladConfig) {
   

  const klantInformatieTop = voorbladConfig.offerteInfoConst.tekstTop;
  const klantInformatieTekst = voorbladConfig.offerteInfoConst.tekst;
  const klantInformatieVariabele = voorbladConfig.offerteInfoConst.variabele;

  doc
    .font('novumreg')
    .fontSize(10)
	.text(voorbladConfig.offerteInfoText.klant, klantInformatieTekst, klantInformatieTop)
	.text(voorblad.offerteInfo.klant, klantInformatieVariabele, klantInformatieTop)
	
    .text(voorbladConfig.offerteInfoText.offerte, klantInformatieTekst, klantInformatieTop + 15)
	.text(voorblad.offerteInfo.offerte, klantInformatieVariabele, klantInformatieTop + 15)
	
    .text(voorbladConfig.offerteInfoText.datum, klantInformatieTekst, klantInformatieTop + 30) 
    .text(voorblad.offerteInfo.datum, klantInformatieVariabele, klantInformatieTop + 30)
	.rect(voorbladConfig.offerteRectangle.xOffset,
          voorbladConfig.offerteRectangle.yOffset,
		  voorbladConfig.offerteRectangle.width,
		  voorbladConfig.offerteRectangle.height,
		 { color: '808080'})
    .strokeColor("#aaaaaa")
    .stroke();
    
	doc
	.font('novumbold')
	.fontSize(18)
	.text(voorblad.offerteInfo.auto, voorbladConfig.offerteInfoConst.autoXoffset, voorbladConfig.offerteInfoConst.autoYoffset, {color: '00008B'});
   
    //.moveDown();

  //generateHr(doc, 252);
}

function generateVoorbladImages(doc, voorblad, voorbladConfig, path, callback) {
var exterieurUrl = [voorblad.imagesUrls.exterieurUrl] ;	
var interieurUrl = [voorblad.imagesUrls.interieurUrl] ;	
var achterkantUrl = [voorblad.imagesUrls.achterkantUrl] ;	
var wheelsUrl = [voorblad.imagesUrls.wheelsUrl] ;	
//console.log(voorblad.imagesUrls.exterieurUrl);
//var Urls = ['https://qacas.volvocars.com/image/vbsnext-v4/exterior/MY19_1817/525/33/12/61400/R141/_/JF02/TG02/_/_/_/SR05/_/_/JB18_f12_fJF02/T20M/default.jpg?market=nl&w=320'];


function imageExterieurtoPDF(url, callback ){
	request({url: url, encoding: null}, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			doc.image(body,
			voorbladConfig.imageExterieur.xOffset,
			voorbladConfig.imageExterieur.yOffset,
            {width: voorbladConfig.imageExterieur.width,
			 height: voorbladConfig.imageExterieur.height} )
           
  

//doc.image(body, 350, 265, { width: 200, height: 100})
//   .text('Stretch', 350, 250)
 
			callback(error, 'done');
			
		}
	});
}

async.each(exterieurUrl, imageExterieurtoPDF, function(err,data){
	if(err){
		throw err;
	}else{
		//console.log(data);
	//doc.end();
  //doc.pipe(fs.createWriteStream(path));
		//callback (err, 'klaar');
	}
})

function imageInterieurtoPDF(url, callback ){
	request({url: url, encoding: null}, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			doc.image(body,
			voorbladConfig.imageInterieur.xOffset,
			voorbladConfig.imageInterieur.yOffset,
            {width: voorbladConfig.imageInterieur.width,
			 height: voorbladConfig.imageInterieur.height} )
           
  

//doc.image(body, 350, 265, { width: 200, height: 100})
//   .text('Stretch', 350, 250)
 
			callback(error, 'done');
			
		}
	});
}

async.each(interieurUrl, imageInterieurtoPDF, function(err,data){
	if(err){
		throw err;
	}else{
		//console.log(data);
	//doc.end();
  //doc.pipe(fs.createWriteStream(path));
		//callback (err, 'klaar');
	}
})

function imageAchterkanttoPDF(url, callback ){
	request({url: url, encoding: null}, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			doc.image(body,
			voorbladConfig.imageAchterkant.xOffset,
			voorbladConfig.imageAchterkant.yOffset,
            {width: voorbladConfig.imageAchterkant.width,
			 height: voorbladConfig.imageAchterkant.height} )
           
  

//doc.image(body, 350, 265, { width: 200, height: 100})
//   .text('Stretch', 350, 250)
 
			callback(error, 'done');
			
		}
	});
}
async.each(achterkantUrl, imageAchterkanttoPDF, function(err,data){
	if(err){
		throw err;
	}else{
		//console.log(data);
	//doc.end();
  //doc.pipe(fs.createWriteStream(path));
		//callback (err, 'klaar');
		async.each(wheelsUrl, imageWheelstoPDF, function(err,data){
	if(err){
		throw err;
	}else{
		//console.log(data);
	//doc.end();
  //doc.pipe(fs.createWriteStream(path));
		callback (err, 'klaar');
	}
})
		
	}
})
 
function imageWheelstoPDF(url, callback ){
	request({url: url, encoding: null}, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			doc.image(body,
			voorbladConfig.imageWheels.xOffset,
			voorbladConfig.imageWheels.yOffset,
            {width: voorbladConfig.imageWheels.width,
			 height: voorbladConfig.imageWheels.height} )
           
  

//doc.image(body, 350, 265, { width: 200, height: 100})
//   .text('Stretch', 350, 250)
 
			callback(error, 'done');
			
		}
	});
} 
 
  
}





	

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}



function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
function registerFonts(doc){
	doc.registerFont('novumbold', '/apf3812home/fonts/NOVUMBOLD.TTF');
	doc.registerFont('novumlight', '/apf3812home/fonts/NOVUMLIGHT.TTF');
	doc.registerFont('novumreg', '/apf3812home/fonts/NOVUMREG.TTF');
}


module.exports = {
  createVoorblad
};