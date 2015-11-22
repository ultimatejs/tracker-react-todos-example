## Example of the `TrackerReact` mixin in action

To test it out, run the following:

```
git clone https://github.com/ultimatejs/tracker-react-todos-example.git
cd tracker-react-todos-example
meteor
```

Here is a simplified example of the noteworthy code in this repo (check `app.jsx` for the in depth version):

```
App = React.createClass({
    mixins: [TrackerReact],

    //automatically reactive helpers, no need for `getMeteorData`!
	CurrenTaskTitle() {
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
	
	render() {
		return (
			<di>
				<h2>{this.getCurrenTaskTitle()}</h2>

				<ul>
				  	  {this._renderTasks()}
				</ul>
			</div>
		);
	}
});
```

Please test and find issues. Pull requests, welcome. To add the `TrackerReact` mixin to another project, run:

```
meteor add ultimatejs:tracker-react
``` 

ADDITIONAL INFO: `TrackerReact` was birthed out of [**Sideburns**](https://github.com/ultimatejs/tracker-react). The goal of `TrackerReact` is to solved dynamic runtime needs that can't be solved at transpilation time. To learn more about it, checkout: https://github.com/ultimatejs/tracker-react