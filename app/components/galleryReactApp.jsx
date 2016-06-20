var galleryDatas = require('../data/galleryInfo.json');
var FigureImg = require('./imgFigure.jsx');
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
		}
		//垂直方向 图片位置范围信息
		vPosRange: {
			x: [0,0],
			topSecY: [0,0]
		}
	},
	/* 
	 * 重新刷新图片部局
	 * @param centerIndex 中心图片是哪个
	*/
	rearrange: function(centerIndex){

	},
	//定义组件初始化状态
	getInitialState: function(){
		return {
			imgsArrangeArr: [
				// {
				// 	pos:{
				// 	left: 0,
				// 	top:
				// 	}
				// }
			]
		}
	},
	//组件加载完成后，为每个图片重新计算位置
	componentDidMount: function(){
		//计算舞台大小
		var stageDom = React.findDomNode(this.ref.stage),
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			stageHalfW = Math.ceil(stageW/2),
			stageHalfH = Math.ceil(stageH/2);
		//计算图片的大小
		var imgFigureDom = React.findDomNode(this.ref.imgFigure0),
			imgFigureW = imgFigureDom.scrollWidth,
			imgFigureH = imgFigureDom.scrollHeight,
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
		var controlerNavUnits = [];
		var figureImgUnits = [];
		galleryDatas.forEach(function (value,index){
			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos:{
						left: 0,
						top: 0
					}
				};
			}

			figureImgUnits.push(<FigureImg data={value} ref={"imgFigure"+index}/>);

		}.bind(this));
		return ( 
			<section className = "stage" ref="stage">
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