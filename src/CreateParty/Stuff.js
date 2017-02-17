import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './style.css';

class Stuff extends Component {
	constructor() {
	    super();
	    this.state = {
      		showModal: false,
	    	addStatus: false,
	    	addLabel:false,
	    	modalTitle: 'Dodaj Przedmiot',
	    	editItemIndex: 0,
	    	editActive: false,
	    	addedLabel: false,
	    	selectedLabel: 0,
	    	selectedStuff: 0,
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
      	this.setState({ showModal: false, addLabel: false, addedLabel:true, stuffName:'', stuffPrice:'', stuffAmount:'' });
	}

	updateStuff(){
		let stuffItem = {
			stuffName: this.state.stuffName,
			stuffPrice: this.state.stuffPrice,
			stuffAmount: this.state.stuffAmount
		};
		this.state.stuff[this.state.selectedLabel].stuffArray[this.state.selectedStuff]=stuffItem;
		this.setState({ 
			showModal: false,
			stuffName: '',
			stuffPrice: '',
			stuffAmount: ''
		});
	}

	deleteStuff(){
			this.state.stuff[this.state.selectedLabel].stuffArray.splice(this.state.selectedStuff,1);
			this.setState({modalTitle: 'Dodaj Przedmiot'});
	}

	render() {
		return (
    		<div className="openedPlace">
       	 		<div className="PlaceClose" onClick={this.props.onClose}>
     				<div className="close-left"></div>
      				<div className="close-right"></div>
      			</div>
      			<div className="container pull-left addBlock">
      				<h3>Dodaj Label</h3>
      				<input type="text" className="form-control add-label-text pull-left" onChange={labelName => this.setState({ labelName:labelName.target.value })} value={this.state.labelName}/>
      				<i className="fa fa-plus add-people-button" onClick={this.addLabel.bind(this)} aria-hidden="true"></i>
      			</div>
      			<div className="container pull-left addBlock">
	      			<div className="row">
					{(this.state.addStatus) ? 
						this.state.stuff.map((item, itemIndex) => {
							return (
								<div className="col-sm-4 pull-left text-center">
									<h3 className="stuff-label">{this.state.stuff[itemIndex].labelName} <i className="fa fa-plus add-people-button" onClick={addStatus => this.setState({ showModal: true, selectedLabel: itemIndex, modalTitle: 'Dodaj Przedmiot', editActive: false, stuffName: '', stuffPrice: '', stuffAmount: '' })} aria-hidden="true"></i></h3>
									<div className="stuff-label-content">
									{(this.state.addedLabel) ?
										this.state.stuff[itemIndex].stuffArray.map((stuffItem, stuffIndex) => {
						                    return (
						                    	<div>
													<p>Nazwa: {stuffItem.stuffName} <button className="btn fa fa-pencil-square-o pull-right" onClick={() => this.setState({selectedLabel: itemIndex, selectedStuff: stuffIndex, stuffName: this.state.stuff[this.state.selectedLabel].stuffArray[this.state.selectedStuff].stuffName, stuffPrice: this.state.stuff[this.state.selectedLabel].stuffArray[this.state.selectedStuff].stuffPrice, stuffAmount: this.state.stuff[this.state.selectedLabel].stuffArray[this.state.selectedStuff].stuffAmount, showModal: true, editActive: true, modalTitle: 'Edytuj Przedmiot' })} aria-hidden="true"/></p>
							           				<p>Cena: {stuffItem.stuffPrice} <button className="btn fa fa-trash pull-right" onClick={() =>{ this.setState({selectedLabel: itemIndex, selectedStuff: stuffIndex}, this.deleteStuff.bind(this))}} aria-hidden="true"></button></p>
							           				<p>Ilosc: {stuffItem.stuffAmount}</p>
							           			</div>
						                    )
						                }) : null
									}
									</div>	
								</div> 
							);
						}): null
					}
					</div>
				</div>
			<ReactModal 
	           isOpen={this.state.showModal}
	           contentLabel="Inline Styles Modal Example"
	           className="Modal-stuff"
	           overlayClassName="Overlay"
	        >
				<div className="modal-header text-center">
				     <h4 className="modal-title" id="myModalLabel">{this.state.modalTitle}</h4>
				     <span className="fa fa-times" onClick={()=> this.setState({showModal: false})} aria-hidden="true"/>
				</div>
				<div className="modal-form-container-stuff">
					<form>
						<div className="form-group">
							<label>Nazwa:</label>
							<input type="text" className="form-control modal-text" onChange={stuffName => this.setState({ stuffName:stuffName.target.value })} value={this.state.stuffName}/>
						</div>
						<div className="form-group">
							<label>Cena:</label>
							<input type="text" className="form-control modal-text" onChange={stuffPrice => this.setState({ stuffPrice:stuffPrice.target.value })} value={this.state.stuffPrice}/>
						</div>
						<div className="form-group">
							<label>Ilość:</label>
							<input type="text" className="form-control modal-text" onChange={stuffAmount => this.setState({ stuffAmount:stuffAmount.target.value })} value={this.state.stuffAmount}/>
						</div>
						<button className="btn pull-right modal-save" type="button" onClick={(this.state.editActive) ? this.updateStuff.bind(this) : this.addStuff.bind(this)}>Add</button>
					</form> 
					
				</div>
	        </ReactModal>			
				
				<button className="btn pull-right PlaceSave" onClick={this.saveUp.bind(this)}>Next</button>
      		</div>
    );
  }
}

export default Stuff;