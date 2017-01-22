import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './Stuff.css';

class Stuff extends Component {
	constructor() {
	    super();
	    this.state = {
      		showModal: false,
	    	addStatus: false,
	    	addLabel:false,
	    	addedLabel: false,
	    	selectedLabel: 0,
	    	stuff: [],
	    	stuffLabels: '',
	    	stuffItems: '',
	    	labelName: '',
	    	stuffName: '',
	    	stuffPrice: '',
	    	stuffAmount: ''
	    };
	}

	saveUp() {
		this.props.saveStuff(
			this.state.stuff
		);
	}

	addLabel(){
		let stuffLabel = {
			labelName: this.state.labelName,
			stuffArray: []
		};
		this.state.stuff.push(stuffLabel);
		this.setState({ addStatus: true, labelName: '' });
	}

	addStuff(){
		let stuffItem = {
			stuffName: this.state.stuffName,
			stuffPrice: this.state.stuffPrice,
			stuffAmount: this.state.stuffAmount
		};
		this.state.stuff[this.state.selectedLabel].stuffArray.push(stuffItem);
      	this.setState({ addLabel: false, addedLabel:true, stuffName:'', stuffPrice:'', stuffAmount:'' });
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
      			<div className="container pull-left addBlock">
	      			<div className="row">
					{(this.state.addStatus) ? 
						this.state.stuff.map((item, itemIndex) => {
							return (
								<div className="col-sm-4 pull-left">
									<h3>{this.state.stuff[itemIndex].labelName}</h3>
									<button className="btn" type="button"onClick={addStatus => this.setState({ addLabel: true, showModal: true, selectedLabel: itemIndex })}>Add</button>
									{(this.state.addedLabel) ?
										this.state.stuff[itemIndex].stuffArray.map(function(stuffItem, stuffIndex) {
						                    return (
						                    	<div>
													<p>{stuffItem.stuffName}</p>
							           				<p>{stuffItem.stuffPrice}</p>
							           				<p>{stuffItem.stuffAmount}</p>
							           			</div>
						                    )
						                }) : null
									}	
								</div> 
							);
						}): null
					}
					</div>
				</div>
			<ReactModal 
	           isOpen={this.state.showModal}
	           contentLabel="Inline Styles Modal Example"
	           className="Modal"
	           overlayClassName="Overlay"
	        >
				      <div className="modal-header">
				        <h4 className="modal-title" id="myModalLabel">Dodaj przedmiot</h4>
				        <span className="close pull-right" onClick={()=> this.setState({showModal: false})} aria-hidden="true">&times;</span>
				      </div>
				<div className="modal-form-container">
							<form>
								<div className="form-group">
									<label>Nazwa:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffName => this.setState({ stuffName:stuffName.target.value })} value={this.state.stuffName}/>
								</div>
								<div className="form-group">
									<label>Cena:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffPrice => this.setState({ stuffPrice:stuffPrice.target.value })} value={this.state.stuffPrice}/>
								</div>
								<div className="form-group">
									<label>Ilość:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffAmount => this.setState({ stuffAmount:stuffAmount.target.value })} value={this.state.stuffAmount}/>
								</div>
							</form> 
							</div>
				      <div className="modal-footer">
				      	<button className="btn btn-success" type="button" onClick={this.addStuff.bind(this)}>Add</button>
				      </div>
	        </ReactModal>			
				<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h4 className="modal-title" id="myModalLabel">Dodaj przedmiot</h4>
				        <span className="close pull-right" data-dismiss="modal" aria-hidden="true">&times;</span>
				      </div>
				      <div className="modal-body">
							<div className="modal-form-container">
							<form>
								<div className="form-group">
									<label>Nazwa:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffName => this.setState({ stuffName:stuffName.target.value })} value={this.state.stuffName}/>
								</div>
								<div className="form-group">
									<label>Cena:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffPrice => this.setState({ stuffPrice:stuffPrice.target.value })} value={this.state.stuffPrice}/>
								</div>
								<div className="form-group">
									<label>Ilość:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffAmount => this.setState({ stuffAmount:stuffAmount.target.value })} value={this.state.stuffAmount}/>
								</div>
							</form> 
							</div>
				      </div>
				      <div className="modal-footer">
				      	<button className="btn btn-success" type="button" onClick={this.addStuff.bind(this)}>Add</button>
				      </div>
				    </div>
				  </div>
				</div>
				<button className="btn pull-right PlaceSave" onClick={this.saveUp.bind(this)}>Next</button>
      		</div>
    );
  }
}

export default Stuff;

							/*<div className="modal-form-container">
							<form>
								<div className="form-group">
									<label>Nazwa:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffName => this.setState({ stuffName:stuffName.target.value })} value={this.state.stuffName}/>
								</div>
								<div className="form-group">
									<label>Cena:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffPrice => this.setState({ stuffPrice:stuffPrice.target.value })} value={this.state.stuffPrice}/>
								</div>
								<div className="form-group">
									<label>Ilość:</label>
									<input type="text" className="form-control PlaceText" onChange={stuffAmount => this.setState({ stuffAmount:stuffAmount.target.value })} value={this.state.stuffAmount}/>
								</div>
							</form> 
							</div>*/