Task = React.createClass({ //not every component needs to make use of `TrackerReact` directly
	taskInfo() {
        let task = this.props.task.text;
        let note = this.state && this.state.note;

        return note ? `${task} - ${note}` : task;
    },
    addNote() {
        let note = prompt('Enter a note for the tasks');

        this.setState({note: note}); 
		
		//make sure things like state continue to work as exepcted
        Session.set('currentTaskTitle', this.props.task.text); //trigger a reactive helper method in app.jsx
    },
	render() {
		return (
			<li>
				{this.taskInfo()}
				<span onClick={this.addNote} style={{color: 'blue', fontStyle: 'italic', cursor: 'pointer'}}> add note</span>
			</li>
		);
	}
});