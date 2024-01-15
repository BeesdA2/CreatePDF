const fs = require("fs");
const PDFDocument = require("pdfkit");
const async = require('async');
const request = require('request');
//var LineBreaker = require('linebreak');

 

function createOfferte(offerte, offerteConfig, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  registerFonts(doc);
  generateHeader(doc, offerte);
  generateVoorbladKlantInformatie(doc, offerte, offerteConfig);
	doc.end();
  doc.pipe(fs.createWriteStream(path));
  
  
   

  
}

function generateHeader(doc, offerte) {
	try {
  if (fs.existsSync(offerte.overlayImage)) {
    doc
    .image(offerte.overlayImage, 1, 1 ,{width: 600} );
  }
} catch(err) {
  //console.error(err)
}  
  
    
}

function generateVoorbladKlantInformatie(doc, offerte, offerteConfig) {
   

  const klantInformatieTop = offerteConfig.offerteInfoConst.tekstTop;
  const klantInformatieTekst = offerteConfig.offerteInfoConst.tekst;
  const klantInformatieVariabele = offerteConfig.offerteInfoConst.variabele;

  doc
    .font('novumreg')
    .fontSize(10)

	.text(offerte.offerteInfo.klant, klantInformatieVariabele, klantInformatieTop)
	
    
	.text(offerte.offerteInfo.adres, klantInformatieVariabele, klantInformatieTop + 15)
	
    
    .text(offerte.offerteInfo.woonplaats, klantInformatieVariabele, klantInformatieTop + 30)
	.rect(offerteConfig.offerteRectangle.xOffset,
          offerteConfig.offerteRectangle.yOffset,
		  offerteConfig.offerteRectangle.width,
		  offerteConfig.offerteRectangle.height,
		 { color: '808080'})
    .strokeColor("#aaaaaa")
    .stroke();
    
	doc.text(offerteConfig.offerteInfo.offerteTekst, offerteConfig.offerteInfoConst.offerteTekstXoffset, offerteConfig.offerteInfoConst.offerteTekstYoffset);
	doc.text(offerteConfig.offerteInfo.dubbelepuntTekst, offerteConfig.offerteInfoConst.dubbelepuntTekstXoffset, offerteConfig.offerteInfoConst.offerteTekstYoffset);
	doc.text(offerte.offerteInfo.offerte, offerteConfig.offerteInfoConst.offerteXoffset, offerteConfig.offerteInfoConst.offerteYoffset);
	
	doc.text(offerteConfig.offerteInfo.verkoperTekst, offerteConfig.offerteInfoConst.verkoperTekstXoffset, offerteConfig.offerteInfoConst.verkoperTekstYoffset);
	doc.text(offerteConfig.offerteInfo.dubbelepuntTekst, offerteConfig.offerteInfoConst.dubbelepuntTekstXoffset, offerteConfig.offerteInfoConst.verkoperTekstYoffset);
	doc.text(offerte.offerteInfo.verkoper, offerteConfig.offerteInfoConst.verkoperXoffset, offerteConfig.offerteInfoConst.verkoperYoffset);
	
	doc.text(offerteConfig.offerteInfo.datumTekst, offerteConfig.offerteInfoConst.datumTekstXoffset, offerteConfig.offerteInfoConst.datumTekstYoffset);
	doc.text(offerteConfig.offerteInfo.dubbelepuntTekst, offerteConfig.offerteInfoConst.dubbelepuntTekstXoffset, offerteConfig.offerteInfoConst.datumTekstYoffset);
	doc.text(offerte.offerteInfo.datum, offerteConfig.offerteInfoConst.datumXoffset, offerteConfig.offerteInfoConst.datumYoffset);
	
	doc
	.font('novumbold')
	.fontSize(18)
	.text('Offerte', offerteConfig.offerteInfoConst.statusOfferteXoffset, offerteConfig.offerteInfoConst.statusOfferteYoffset);
	
	doc
	.font('novumbold')
	.fontSize(12)
	.text(offerte.offerteInfo.autojaar, offerteConfig.offerteInfoConst.autojaarXoffset, offerteConfig.offerteInfoConst.autojaarYoffset);
	doc
	.font('novumbold')
	.fontSize(12)
	.text(offerte.offerteInfo.automodel, offerteConfig.offerteInfoConst.automodelXoffset, offerteConfig.offerteInfoConst.automodelYoffset);
	doc
	.font('novumbold')
	.fontSize(12)
	.text(offerte.offerteInfo.autobedrag, offerteConfig.offerteInfoConst.autobedragXoffset, offerteConfig.offerteInfoConst.autobedragYoffset);
	
   
    //.moveDown();

  //generateHr(doc, 252);
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
  createOfferte
};