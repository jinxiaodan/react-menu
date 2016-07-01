var _data1 = require('../../data/bussiness-operate.json');
var _data2 = require('../../data/bussiness-operate-query.json');
var BussinessOperateTr = React.createClass({
	render: function(){
		var _rtData = this.props.rtData;
		return (
			<tr>
				<td class="small"><input type="checkbox" name="checked"/></td>	
				<td class="small">{_rtData.nodeId}</td>
				<td class="small">{_rtData.barCode}</td>
				<td class="small">{_rtData.custName}</td>
				<td class="small">{_rtData.updateDate}</td>
			</tr>
		)
	}
})
var BussinessOperateTable = React.createClass({

	getData: function(){
		var _queryParam = this.props.queryParam;
		var _tableData={};
		if(_queryParam.nodeId == ""){
			_tableData = _data2.rows;
		}else {
			_tableData = _data1.rows;
		}
		return _tableData;
	},

	render: function(){
		var tableDataList = this.getData();
		var trList = [];
		tableDataList.forEach(function(value,index){
			// nodeIdList.push(value['nodeId']);
			// barCodeList.push(value['barCode']);
			// custNameList.push(value['custName']);
			// updateDateList.push(value['updateDate']);
			trList.push(<BussinessOperateTr rtData={value}/>);

		});
		return (
			<table class="table table-striped table-hover talbe-condensed table-bordered">
				<thead>
					<tr>
						<th class="small"><input type="checkbox" name="checked"/></th>
						<th class="small">流程编号</th>
						<th class="small">营业部</th>
						<th class="small">贷款人姓名</th>
						<th class="small">流程类型</th>
						<th class="small">贷款类型</th>
						<th class="small">来源岗位ID</th>
						<th class="small">进入时间</th>
						<th class="small">操作</th>
					</tr>
				</thead>
				<tbody>
					{trList}
				</tbody>
			</table>)
	}
});
module.exports = BussinessOperateTable; 