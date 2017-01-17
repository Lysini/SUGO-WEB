import React, { Component } from 'react';
import './Stuff.css';

class Place extends Component {
	constructor() {
	    super();
	    this.state = {
	    	addStatus: false,
	    	addLabel:false,
	    	addedLabel: false,
	    	labelName: '',
	    	label1: '',
	    	label2: '',
	    	label3: '',
	    	labelNames:[],
	    	labels: [],
	    	number: 0
	    };
	}

	saveUp() {
		this.props.saveStuff(
			this.state.labels,
			this.state.labelNames
		);
	}

	addLabel(){
		this.state.labelNames.push(this.state.labelName);
		this.setState({ addStatus: true, labelName: '' });
	}

	addStuff(){
		let stuff = {
			stuff1: this.state.label1,
			stuff2: this.state.label2,
			stuff3: this.state.label3
		};
		this.state.labels.push(stuff);
      	this.setState({ addLabel: false, addedLabel:true, label1:'',label2:'',label3:'' });
	}

	render() {
		return (
    		<div className="openedPlace">
       	 		<div className="PlaceClose" onClick={this.props.onClose}>
     				<div className="close-left"></div>
      				<div className="close-right"></div>
      			</div>
      			<div className="container pull-left addBlock">
      				<input type="text" className="form-control PlaceText pull-left" onChange={labelName => this.setState({ labelName:labelName.target.value })} value={this.state.labelName}/>
      				<button className="btn" type="button" onClick={this.addLabel.bind(this)}>Add</button>
      			</div>
      			/*<div className="container pull-left addBlock">
      			<div className="row">
				{(this.state.addStatus) ? 
					this.state.labelNames.map((item, itemIndex) => {
						return (
							<div key="itemIndex" className="col-sm-4 pull-left">
								<p>{this.state.labelNames[itemIndex]}
								<button className="btn" type="button" onClick={addStatus => this.setState({ addLabel: true })}>Add</button></p>
								{(this.state.addedLabel) ?
									<div>
				            			<p>{this.state.labels[itemIndex].stuff1}</p>
				           				<p>{this.state.labels[itemIndex].stuff2}</p>
				           				<p>{this.state.labels[itemIndex].stuff3}</p>
				           			</div>
								: null
								}	
							</div> 
						);
					}): null
				}
				</div>
				</div>*/
				<table>
					<tbody>
						{(this.state.addStatus) ? 
							this.state.labelNames.map((item, itemIndex) => {
							return (
								<tr key={itemIndex}> 
									<th>{this.state.labelNames[itemIndex]}</th>
									<button className="btn" type="button" onClick={addStatus => this.setState({ addLabel: true })}>Add</button>
								</tr>
								);
							}): null
						}
					</tbody>
				</table>
				<div className="container pull-right add-stuff">
				{ (this.state.addLabel) ? 
					<div className="form-container">
						<form>
							<div className="form-group">
								<label>Nwm co tu</label>
								<input type="text" className="form-control PlaceText" onChange={label1 => this.setState({ label1:label1.target.value })} value={this.state.label1}/>
							</div>
							<div className="form-group">
								<label>Nwm co tu</label>
								<input type="text" className="form-control PlaceText" onChange={label2 => this.setState({ label2:label2.target.value })} value={this.state.label2}/>
							</div>
							<div className="form-group">
								<label>Nwm co tu</label>
								<input type="text" className="form-control PlaceText" onChange={label3 => this.setState({ label3:label3.target.value })} value={this.state.label3}/>
							</div>
							<button className="btn" type="button" onClick={this.addStuff.bind(this)}>Add</button>
						</form> 
					</div>
					 : null
				}
				</div>
				<button className="btn pull-right PlaceSave" onClick={this.saveUp.bind(this)}>Save Up</button>
      		</div>
    );
  }
}

export default Place;