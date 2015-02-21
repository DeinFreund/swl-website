/*
 * A slider control. Supports valueLink with LinkedStateMixin.
 */

'use strict'

var _ = require('lodash');

module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			onChange: _.noop,
			minValue: 0,
			maxValue: 100,
			step: 1,
			value: null,
			valueLink: null,
		};
	},
	getInitialState: function(){
		return { dragging: false };
	},
	updateThumbPosition: _.throttle(function(xpos){
		var node = this.getDOMNode();
		var step = this.props.step;
		var value = Math.round(((xpos - node.offsetLeft) / node.clientWidth *
			(this.props.maxValue - this.props.minValue) +
			this.props.minValue) * step) / step;
		if (value > this.props.maxValue)
			value = this.props.maxValue;
		if (value < this.props.minValue)
			value = this.props.minValue;
		if (this.props.valueLink)
			this.props.valueLink.requestChange(value);
		else
			this.props.onChange(value);
	}, 50),
	handleDragStart: function(evt){
		evt.preventDefault();
		this.setState({ dragging: true });
		this.updateThumbPosition(evt.clientX);
	},
	handleDragMove: function(evt){
		evt.preventDefault();
		if (this.state.dragging)
			this.updateThumbPosition(evt.clientX);
	},
	handleDragEnd: function(){
		this.setState({ dragging: false });
	},
	render: function(){
		var value;
		if (this.props.valueLink)
			value = this.props.valueLink.value;
		else
			value = this.props.value;
		return <div className="slider"
			onMouseDown={this.handleDragStart}
			onMouseMove={this.handleDragMove}
			onMouseUp={this.handleDragEnd}
			onMouseLeave={this.handleDragEnd}
		><div className="thumbWrapper">
			<div
				className="thumb"
				style={{ left: ((value - this.props.minValue) /
					(this.props.maxValue - this.props.minValue) * 100) + '%' }}
			/>
		</div></div>;
	}
});
