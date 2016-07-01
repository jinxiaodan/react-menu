var BussinessNav = React.createClass({
	handleClick: function(e){
		this.props.onRefresh();
		e.stopPropagation();
		e.preventDefault();
	},


	render: function(){
		return (	
			<ul className="nav nav-pills">
					<li className="col-md-2"><button type="button" className="btn" onClick={this.handleClick}>刷新</button></li>
					<li><button type="button" className="btn" onClick={this.queryByNodeId}>查找</button></li>
					<li><button type="button" className="btn">重置</button></li>
					<li><button type="button" className="btn">查看转让件记录</button></li>
			</ul>
		);
	}
});
module.exports = BussinessNav;