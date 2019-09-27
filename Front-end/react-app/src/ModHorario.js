import React, {Component} from 'react'
import axios from 'axios'
import CurrentHorarioDropDown from './CurrentHorarioDropDown';

class ModHorario extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             id_horario: '',
             title: '',
             id_new: ''
        }
    }

    
    
    changeHandler= (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler= (e) => {
       e.preventDefault()
       console.log(this.state)
       axios
            .post('http://localhost:3001/cliente/mod_schedule/:id',this.state)
        	.then(response => {
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    callbackFunction = (childData) => {
        this.setState({id_horario: childData})
  }
  returnCallback = (childData) => {
    this.setState({id_new: childData})
}
    render(){
        const{title} =  this.state
        return (
            <div>
                 <br></br><br></br><br></br>
                <form onSubmit={this.submitHandler}>
                    
                <div> 
                    Seleccione el horario a cambiar:
                <CurrentHorarioDropDown parentCallback ={this.callbackFunction}/>
                </div>
                <br></br>
                <div> 
                    Seleccione el horario nuevo:<br></br>
                <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default ModHorario