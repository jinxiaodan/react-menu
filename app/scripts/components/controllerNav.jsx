var ControllerUnit = React.createClass({
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
			controllerUnitClassName += " is-center";
			//如果选中的标识点击后需要翻转，则设置翻转样式
			if(this.props.arrange.isInverse){
				controllerUnitClassName += " inverse";
			}
		}
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick}></span>
			);
	}
});
module.exports = ControllerUnit;