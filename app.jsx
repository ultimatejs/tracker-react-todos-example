App = React.createClass({
	mixins: [TrackerReact],
	
	componentWillMount() {
		window.MAIN = this; //use `MAIN` from console to perform various tests
	},
	componentWillUpdate() {
		console.log('APP - componentWillUpdate')
	},
    

	//tracker-based reactivity in action, no need for `getMeteorData`!
    currenTaskTitle() {
        return Session.get('currentTaskTitle') || 'n/a'; //session var set by child component!
    },
    tasks() {
		if(this.state && this.state.limit) return Tasks.find({}, {limit: this.state.limit}).fetch()
        return Tasks.find({}).fetch(); //fetch must be called to trigger reactivity
    },
	
	
	//state-based reactivity working in conjunection with tracker-based reactivity. 
	//track render autoruns are kept up to date!
    title() {
		return this.state && this.state.title ? `(${this.state.title})` : ``;
    },
	

	_renderTasks() {
		if(!this.state || !this.state.title) return <li>ADD A TITLE TO SEE TO DO LIST</li>;
		
		return this.tasks().map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},

    //events are also blocked from being reactive; for now we put them in a map return from a method named `events` 
    editTitle: function() {
        let title = prompt('Enter a title for this to do list');
        this.setState({title: title});
    },
    addTask: function() {
        Tasks.insert({text: prompt('Enter the title of a task buddy')});
    },

	
	render() {
		console.log('APP - RENDER');
		
		return (
			<div className="container">
				<header>
					<h1> 
						Todo List {this.title()} -- extra: {outerVar.get()}
						<span style={{color: 'blue', fontStyle: 'italic', cursor: 'pointer'}} onClick={this.editTitle}> edit title</span>
					</h1> 

					<h2>current task: <i>{this.currenTaskTitle()}</i></h2>

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
outerVar = new ReactiveVar('outer'); //tes tto show that outer scope variables are reactive