var BussinessOperateTable = require('./bussiness-operate-table.jsx');
var BNav = require('./bussiness-nav.jsx');
var BussinessIframe = React.createClass({
	//处理点击事件函数
	refresh: function(){
		return (function(){
			var _onRefresh = this.state.refresh;
			this.state.refresh = !_onRefresh;
			this.state.queryParam['nodeId'] = 'new';
		}.bind(this))
	},
	/*初始化state*/
	getInitialState: function(){
		return {
			refresh:false,
			queryParam:{
				'nodeId':'',
				'barCode': '',
				'custName': '',
				'updateDate': ''
			}
		}
	},
	render: function(){
		var _queryParam = {
			'nodeId':'',
			'barCode': '',
			'custName': '',
			'updateDate': ''
			};
		var _refresh = false;
		if(!this.state.refresh){
			this.state.refresh = _refresh;
		}
		if(!this.state.queryParam){
			this.state.queryParam = _queryParam;
		}

		return (	
			<div>

				<BNav onRefresh={this.refresh()}/>
				<BussinessOperateTable queryParam={this.state.queryParam}/>
			</div>
		)
	}
});

module.exports = BussinessIframe;
