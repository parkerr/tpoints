module.exports.about = function(req, res){
	res.render('about', { 
    title: 'About TraPoints',
    pageHeader: {
      title: 'TraPoints',
    }
   });	
}