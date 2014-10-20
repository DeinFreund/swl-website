/** @jsx React.DOM
 *
 * Battle user list.
 */

'use strict'

var _ = require('lodash');
var UserItem = require('./UserItem.jsx');

module.exports = React.createClass({
	handleTeamClick: function(n){
		this.props.onChangeTeam(n);
	},
	render: function(){
		var userCount = _.reduce(_.map(this.props.teams, _.size), function(a, b){ return a + b }, 0);
		return (<div className="userList">
			<div className="listHeader">
				{userCount - _.size(this.props.teams[0])} players, {_.size(this.props.teams[0])} spectators
				<span className="listHeaderButtons">
					<button>balance</button>
					<button>spec afk</button>
					<button>add team</button>
				</span>
			</div>
			<ul>
			{_.map(this.props.teams, function(team, num){
				return [<li className="listTeam" onClick={_.partial(this.handleTeamClick, num)} key={'t'+num}>
					<span className="listTeamName">Team {num}</span>
					<span className="listTeamButtons">
						<button>join</button>
						<button>add bot</button>
					</span>
				</li>].concat(_.map(team, function(user){
					return <UserItem user={user} />
				}.bind(this)));
			}.bind(this))}
			</ul>
		</div>);
	}
});
