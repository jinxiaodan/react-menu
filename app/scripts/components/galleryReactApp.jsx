var galleryDatas = require('../../data/galleryInfo.json');
var FigureImg = require('./imgFigure.jsx');
var ControllerNav = require('./controllerNav.jsx');
var GalleryReactApp = React.createClass({
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

			figureImgUnits.push(<FigureImg data={value} arrange={imgArrange} inverseFunc={this.inverseFigure(index)} centerFunc={this.changeCenterFigure(index)} ref={'imgFigure' + index}/>);
			controllerNavUnits.push(<ControllerNav arrange={imgArrange} inverseFunc={this.inverseFigure(index)} centerFunc={this.changeCenterFigure(index)}/>);

		}.bind(this));
		return ( 
			<section className = "stage" ref="stage">
				<section className ="img-sec">
					{figureImgUnits}
				</section>
				<nav className = "controller-nav" >
					{controllerNavUnits}
				</nav>
			</section>
			);
	}
});


module.exports = GalleryReactApp;