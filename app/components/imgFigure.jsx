var ImgFigure = React.createClass({

	render: function (){
		var styleObj = {};
	//如果props中指定了图片的状态信息，则设置样式
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
			//console.log(styleObj);
		}
		//如果图片的旋转角度有值，且不为0,添加旋转角度
		if(this.props.arrange.rotate){
			(['','-webkit-','-moz-','-ms-']).forEach(function (value){
				styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));
		}
		return (
			<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.filename} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
});
module.exports = ImgFigure;