import React, { Component } from 'react'
import axios from 'axios'

 class getHorariobyProv extends Component {
     constructor(props){
         super(props)

         this.state = {
             posts: []
         }
     }

     componentDidMount(){
         axios.get('http://localhost:3001/prov/cita/notsel')
         .then(response => {
             console.log(response)
             this.setState({posts: response.data})
         })
         .catch(error =>{
             console.log(error)
         })
     }

     sendData = () => {
         var a = document.getElementById("selection");
        this.props.parentCallback(a.options[a.selectedIndex].value);
   }
    render() {
        const{posts} = this.state
        return (
            <div>
                <select id ="selection" onChange={this.sendData}>
                <option disabled selected value> -- select an option -- </option>
                {posts &&
                posts.length > 0 &&
              posts.map(post =>  <option key={post.id_cita} value={post.codhorario}>{post.fecha}</option>) 
              }
          </select>
            </div>
        )
    }
}

export default getHorariobyProv
