var galleryDatas = require('../data/galleryInfo.json');
var FigureImg = require('./imgFigure.jsx');
var GalleryReactApp = React.createClass({

	render: function() {
		var controlerNavUnits = [];
		var figureImgUnits = [];
		galleryDatas.forEach(function (value){
		figureImgUnits.push(<FigureImg data={value}/>);
		});
		return ( 
			<section className = "stage">
				<section className ="img-sec">
					{figureImgUnits}
				</section>
				<nav className = "controler-nav" >
					{controlerNavUnits}
				</nav>
			</section>
			);
	}
});


module.exports = GalleryReactApp;