import React, { Component } from 'react'
import axios from 'axios'

 class CurrentHorarioDropDown extends Component {
     constructor(props){
         super(props)

         this.state = {
             posts: []
         }
     }

     
     sendData = () => {
         var a = document.getElementById("selection");
        this.props.parentCallback(a.options[a.selectedIndex].value);
   }
    render() {
        var selStyle = {
            width:175   
          };
        const{posts} = this.state
        return (
            <div>
                <select id ="selection" style={selStyle} onChange={this.sendData} >
                <option disabled selected value> -- select an option -- </option>
                <option value ="1">Electronicos </option>
                <option value ="2">Medicina </option>
                
          </select>
            </div>
        )
    }
}

export default CategoriaSelect
