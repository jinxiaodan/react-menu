require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GalleryReactApp=require('./galleryReactApp.jsx');
ReactDOM.render(React.createElement(GalleryReactApp, null), document.getElementById('app'));

},{"./galleryReactApp.jsx":5}],5:[function(require,module,exports){
var galleryDatas = require('../data/galleryInfo.json');
var FigureImg = require('./imgFigure.jsx');
var ControllerNav = require('./controllerNav.jsx');
var GalleryReactApp = React.createClass({displayName: "GalleryReactApp",
	constant: {
		/*中心图片位置*/
		centerPos: {
			left: 0,
			top: 0
		},

		// 水平方向 图片位置范围信息
		hPosRange: {
			leftSecX: [0,0],
			rightSecX: [0,0],
			y: [0,0]
		},
		//垂直方向 图片位置范围信息
		vPosRange: {
			x: [0,0],
			topSecY: [0,0]
		}
	},
	/*
	 * 取某一区间内的随机数，并向下取整
	 * @param mixNum 最小值
	 * @param maxNum 最大值
	 */
	getRangeRandom: function(mixNum,maxNum){
		return Math.ceil(Math.random() * (maxNum - mixNum) + mixNum);
	},
	// 取-30到30的随机数
	get30DegRandom: function(){
		return Math.ceil(Math.random()*60-30);
	},
	/*
	 * 翻转图片
	 * @param index 翻转的图片数组下标
	 * return {function}
	 */
	inverseFigure: function(index){
		return (function(){
			var imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});
		}.bind(this))
	},
	/*
	 * 更新中心图片
	 * @param index 更换后的中心图片下标
	 * return {function}
	 */
	changeCenterFigure: function(index){
		return (function(){
			this.rearrange(index);
		}.bind(this))
	},
	/* 
	 * 重新刷新图片部局
	 * @param centerIndex 中心图片是哪个
	*/
	rearrange: function(centerIndex){
		var imgsArrangeArr = this.state.imgsArrangeArr,
			constant = this.constant,
			centerPos = constant.centerPos,
			hPosRange = constant.hPosRange,
			vPosRange = constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeX = vPosRange.x,
			vPosRangeTopSecY = vPosRange.topSecY,

			imgsTopArrangeArr = [],
			imgTopNum = Math.ceil(Math.random() * 2), //上部图片为一张或不取
			topImgSpliceIndex = 0,

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

			//首先居中center img ,居中图片不旋转, 是否翻转
			imgsArrangeCenterArr[0] = {
				pos: centerPos,
				rotate: 0,
				isInverse: imgsArrangeCenterArr[0].isInverse,
				isCenter: true 
			}
			//居中图片不旋转
			imgsArrangeCenterArr[0].rotate = 0;

			//然后 取出要部局上部图片的状态信息
			topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - imgTopNum));
			imgsTopArrangeArr = imgsArrangeArr.splice(topImgSpliceIndex,imgTopNum);
			imgsTopArrangeArr.forEach(function (value,index){
				imgsTopArrangeArr[index] = {
					pos:{
						left: this.getRangeRandom(vPosRangeX[0],vPosRangeX[1]),
						top: this.getRangeRandom(vPosRangeTopSecY[0],vPosRangeTopSecY[0])
					},
					rotate: this.get30DegRandom(),
					isCenter: false,
					isInverse: false
	
				};
			}.bind(this));

			//部局两侧的图片状态信息
			for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++){
				var hPosRangeLORX = null;
				if(i < k){
					hPosRangeLORX = hPosRangeLeftSecX;
				}else{
					hPosRangeLORX = hPosRangeRightSecX;
				}
				imgsArrangeArr[i] = {
					pos:{
						left: this.getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1]),
						top: this.getRangeRandom(hPosRangeY[0],hPosRangeY[1])
					},
					rotate: this.get30DegRandom(),
					isCenter: false,
					isInverse: false
					
				};
			}

			//把中间和上部的imgsArrange重新变回imgsArrangeArr
			if(imgsTopArrangeArr && imgsTopArrangeArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsTopArrangeArr[0]);
			}
			imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});



	},
	//定义组件初始化状态
	getInitialState: function(){
		return {
			imgsArrangeArr: [
				// {
				// 	pos:{
				// 	left: 0,
				// 	top:
				// 	},
				//  rotate: 0,
				//  isInverse: false, //是否翻转
				//  isCenter: false //是否处于中心
				// }
			]
		}
	},
	//组件加载完成后，为每个图片重新计算位置
	componentDidMount: function(){
		//计算舞台大小
		var stageDom = this.refs.stage,
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			stageHalfW = Math.ceil(stageW/2),
			stageHalfH = Math.ceil(stageH/2);
		//计算图片的大小
		var imgFigureDom = this.refs.imgFigure0,
			imgFigureW = 320,
			imgFigureH = 360,
			imgFigureHalfW = Math.ceil(imgFigureW/2),
			imgFigureHalfH = Math.ceil(imgFigureH/2);
		//计算中心图片的位置
		this.constant.centerPos = {
			left: stageHalfW - imgFigureHalfW,
			top: stageHalfH - imgFigureHalfH
		};
		//计算左右分区的位置范围信息
		this.constant.hPosRange.leftSecX[0] = -imgFigureHalfW;
		this.constant.hPosRange.leftSecX[1] = stageHalfW - imgFigureHalfW*3;
		this.constant.hPosRange.y[0] = -imgFigureHalfH;
		this.constant.hPosRange.y[1] = stageH - imgFigureHalfH;
		this.constant.hPosRange.rightSecX[0] = stageHalfW +imgFigureHalfW;
		this.constant.hPosRange.rightSecX[1] = stageW - imgFigureHalfW;

		//计算上分区的位置范围信息
		this.constant.vPosRange.x[0] = stageHalfW - imgFigureW;
		this.constant.vPosRange.x[1] = stageHalfW;
		this.constant.vPosRange.topSecY[0] = -imgFigureHalfH;
		this.constant.vPosRange.topSecY[1] = stageHalfH -imgFigureHalfH*3;
		
		this.rearrange(0);


	},

	render: function() {
		var controllerNavUnits = [];
		var figureImgUnits = [];
		galleryDatas.forEach(function (value,index){
			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos:{
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				};
			}
			var imgArrange = this.state.imgsArrangeArr[index];

			figureImgUnits.push(React.createElement(FigureImg, {data: value, arrange: imgArrange, inverseFunc: this.inverseFigure(index), centerFunc: this.changeCenterFigure(index), ref: 'imgFigure' + index}));
			controllerNavUnits.push(React.createElement(ControllerNav, {arrange: imgArrange, inverseFunc: this.inverseFigure(index), centerFunc: this.changeCenterFigure(index)}));

		}.bind(this));
		return ( 
			React.createElement("section", {className: "stage", ref: "stage"}, 
				React.createElement("section", {className: "img-sec"}, 
					figureImgUnits
				), 
				React.createElement("nav", {className: "controller-nav"}, 
					controllerNavUnits
				)
			)
			);
	}
});


module.exports = GalleryReactApp;

},{"../data/galleryInfo.json":7,"./controllerNav.jsx":4,"./imgFigure.jsx":6}],7:[function(require,module,exports){
module.exports=[
{
	"filename": "images/1.jpg",
	"title": "picture name",
	"desc": "from phone and weekend photo. a happy day.hah aah ahah ah ahhah ha"
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
},{}],6:[function(require,module,exports){
var ImgFigure = React.createClass({displayName: "ImgFigure",

	/*
	 * 点击事件处理函数
	 * 
	 */
	handleClick: function(e){
		var isCenter = this.props.arrange.isCenter;
		if(isCenter){
			this.props.inverseFunc();
		}else{
			this.props.centerFunc();
		}
		e.stopPropagation();
		e.preventDefault();
	},
	render: function (){
		var styleObj = {};
	//如果props中指定了图片的状态信息，则设置样式
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
			//console.log(styleObj);
		}
		//如果图片的旋转角度有值，且不为0,添加旋转角度
		if(this.props.arrange.rotate){
			(['','Webkit','Moz','ms']).forEach(function (value){
				styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));
		}
		//如果图片需旋转 修改classname
		var figureClassName = "img-figure";
		figureClassName += (this.props.arrange.isInverse)?" img-inverse":""; 

		//设置中心图片的 z-index 为11
		if(this.props.arrange.isCenter){
			styleObj["zIndex"] = 11;
		}

		return (
			React.createElement("figure", {className: figureClassName, style: styleObj, onClick: this.handleClick}, 
				React.createElement("img", {src: this.props.data.filename, alt: this.props.data.title}), 
				React.createElement("figcaption", {onClick: this.handleClick}, 
					React.createElement("h2", {className: "img-title"}, this.props.data.title), 
					React.createElement("div", {className: "img-back"}, 
						React.createElement("p", null, 
						this.props.data.desc
						)
					)
				)
			)
		);
	}
});
module.exports = ImgFigure;

},{}],4:[function(require,module,exports){
var ControllerUnit = React.createClass({displayName: "ControllerUnit",
	//处理点击事件函数
	handleClick: function(e){
		var isCenter = this.props.arrange.isCenter;
		if(isCenter){
			this.props.inverseFunc();
		}else{
			this.props.centerFunc();
		}
		e.stopPropagation();
		e.preventDefault();
	},
	render: function(){
		var controllerUnitClassName = "controller-unit";
		//如果选中的需要居中，则设置居中
		if(this.props.arrange.isCenter){
			controllerUnitClassName += "is-center";
			//如果选中的标识点击后需要翻转，则设置翻转样式
			if(this.props.arrange.isInverse){
				controllerUnitClassName += "inverse";
			}
		}
		return (
			React.createElement("span", {className: controllerUnitClassName, onClick: this.handleClick})
			);
	}
});
module.exports = ControllerUnit;

},{}]},{},[1]);
