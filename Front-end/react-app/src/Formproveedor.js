import React, {Component} from 'react'
import axios from 'axios'
import CurrentHorarioDropDown from './CurrentHorarioDropDown';

class ModHorario extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             username: '',
             passwd: '',
             nombres: '',
             apellidos: '',
             email: '',
             cateogira: ''
        }
    }

    
    
    changeHandler= (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler= (e) => {
       e.preventDefault()
       console.log(this.state)
       axios
            .post('http://localhost:3001//proveedor/registry',this.state)
        	.then(response => {
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }
  
    render(){
        const{title} =  this.state
        return (
            <div>
                 <br></br><br></br><br></br>
                <form onSubmit={this.submitHandler}>
                    
                <div> 
                    Ingrese el nombre de usuario:
                    <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <div> 
                    Ingrese una contraseña:
                    <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <div> 
                    Ingrese su nombre:
                    <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <div> 
                    Ingrese su apellido:<br></br>
                <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                
                <br></br>
                <div> 
                   Seleccione una categoria:
                    <input type = "text" name= "title" value={title} onChange={this.changeHandler}></input>
                </div>
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default Formproveedor