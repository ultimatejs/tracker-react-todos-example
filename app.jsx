App = React.createClass({
    mixins: [TrackerReact],

    //automatically reactive helpers, no need for `getMeteorData`!
    title() {
        return Session.get('title') ? ' (' + Session.get('title') + ')' : '';
    },
    getCurrenTaskTitle() {
        return Session.get('currentTaskTitle') || 'n/a';
    },
    getTasks() {
        return Tasks.find({}).fetch();
    },

    //underscore prevents method from being reactive
	_renderTasks() {
		return this.getTasks().map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},

    //events are also blocked from being reactive; for now we put them in a map return from a method named `events` 
    events() {
        return {
            editTitle: function() {
                let title = prompt('Enter a title for this to do list');
                Session.set('title', title);
            },
            addTask: function() {
                Tasks.insert({text: prompt('Enter the title of a task buddy')});
            }
        }
    },

	
	render() {
		return (
			<div className="container">
				<header>
					<h1>
						Todo List {this.title()}
						<span style={{color: 'blue', fontStyle: 'italic', cursor: 'pointer'}} onClick={this.editTitle}> edit title</span>
					</h1> 

					<h2>current task: <i>{this.getCurrenTaskTitle()}</i></h2>

					<button onClick={this.addTask}>ADD TASK</button>
				</header>

				<ul>
				  	  {this._renderTasks()}
				</ul>
			</div>
		);
	}
});


Tasks = new Mongo.Collection('tasks');