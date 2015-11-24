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

	//tracker-based reactivity in action, no need for `getMeteorData`!
    tasks() {
        return Tasks.find({}).fetch(); //fetch must be called to trigger reactivity
    },
	
	
	//state-based reactivity working in conjunection with tracker-based reactivity.
	//track render autoruns are kept up to date!
    title() {
		return this.state && this.state.title ? `(${this.state.title})` : ``;
    },
	
	render() {
		return (
			<di>
				<h2>{this.title()}</h2>

				<ul>
				  	  {this.tasks().map((task) => {
						  return <Task key={task._id} task={task} />;
					  })}
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

ADDITIONAL INFO: `TrackerReact` was birthed out of [**Sideburns**](https://github.com/timbrandin/blaze-react). The goal of `TrackerReact` is to solved dynamic runtime needs that can't be solved at transpilation time. To learn more about it, checkout: https://github.com/ultimatejs/tracker-react