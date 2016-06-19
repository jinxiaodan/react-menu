require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GalleryReactApp=require('./galleryReactApp.jsx');
ReactDOM.render(React.createElement(GalleryReactApp, null), document.getElementById('app'));

},{"./galleryReactApp.jsx":4}],4:[function(require,module,exports){
var galleryDatas = require('../data/galleryInfo.json');
var FigureImg = require('./imgFigure.jsx');
var GalleryReactApp = React.createClass({displayName: "GalleryReactApp",

	render: function() {
		var controlerNavUnits = [];
		var figureImgUnits = [];
		galleryDatas.forEach(function (value){
		figureImgUnits.push(React.createElement(FigureImg, {data: value}));
		});
		return ( 
			React.createElement("section", {className: "stage"}, 
				React.createElement("section", {className: "img-sec"}, 
					figureImgUnits
				), 
				React.createElement("nav", {className: "controler-nav"}, 
					controlerNavUnits
				)
			)
			);
	}
});


module.exports = GalleryReactApp;

},{"../data/galleryInfo.json":6,"./imgFigure.jsx":5}],6:[function(require,module,exports){
module.exports=[
{
	"filename": "images/1.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/2.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/3.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/4.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/5.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/6.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/7.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/8.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/9.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/10.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/11.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
{
	"filename": "../images/12.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},{
	"filename": "../images/13.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},{
	"filename": "../images/14.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},{
	"filename": "../images/15.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},{
	"filename": "../images/16.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hahaahahahahahhahha"
},
]
},{}],5:[function(require,module,exports){
var ImgFigure = React.createClass({displayName: "ImgFigure",
	render: function (){
		return (
			React.createElement("figure", {className: "img-figure"}, 
				React.createElement("img", {src: this.props.data.filename, alt: this.props.data.title}), 
				React.createElement("figcaption", null, 
					React.createElement("h2", {className: "img-title"}, this.props.data.title)
				)
			)
		);
	}
});
module.exports = ImgFigure;

},{}]},{},[1]);
