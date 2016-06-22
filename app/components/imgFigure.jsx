var ImgFigure = React.createClass({

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
			<figure className={figureClassName} style={styleObj} onClick={this.handleClick}>
				<div className="img-front">
				<img src={this.props.data.filename} alt={this.props.data.title}/>
				<figcaption  onClick={this.handleClick}>
					<h2 className="img-title">{this.props.data.title}</h2>
		
				</figcaption>
				</div>
				<a href="#" onClick={this.handleClick}>
				<div className="img-back" onClick={this.handleClick}>
					<p  onClick={this.handleClick}>
					{this.props.data.desc}
					</p>
				</div>
				</a>
			</figure>
		);
	}
});
module.exports = ImgFigure;