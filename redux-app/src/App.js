import React from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from './reducers';
import {loadData,updateData} from './actions';
import {fetchData} from './util';
import {Modal} from 'react-modal';

class App extends React.Component {

  constructor(){
    super(); // call super() before any other statement. Otherwise, this.state will be undefined
    
    //Set default values of state variables
    this.state ={route:'home',selected:'',userlist:[],show:false,name:'',email:'',city:'',phone:'',website:'',company:'',index:NaN};
  }

  //Lifecycle method to get data before app starts
  //Whenever React renders a component, it’s going to call componentWillMount first
  componentWillMount(){
    //Adds a change listener. It will be called any time an action is dispatched, and some part of the state tree may potentially have changed
    store.subscribe((listener)=>{
      //The state could also change in response to actions and events: in React you can update the local component’s state with setState.
      this.setState({userlist:store.getState().userDataReducer.map((item,index)=>(
        <div onDoubleClick={()=>{this.showUserUpdateModal(index)}} key={index} style={{boxShadow:'0px 0px 3px #ccc',display:'flex',flexDirection:'column',justifyContent:'center',backgroundColor:'blue',color:'#fff',border:'2px solid #000',borderRadius:'7px'}}>
          <p style={{backgroundColor:'lightblue',marginTop:0,padding:'10px',textAlign:'center',fontSize:'2em',color:'#000'}}>{item.name}</p>
          <p style={{textAlign:'center'}}>{item.email}</p>
          <p style={{textAlign:'center'}}>{item.address.city}</p>
          <p style={{textAlign:'center'}}>{item.phone}</p>
          <p style={{textAlign:'center'}}>{item.website}</p>
          <p style={{textAlign:'center'}}>{item.company.name}</p>
        </div>)
      )
      })
    })
  }

  /*  Lifecycle method to get redux data for when app starts
   **  componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. 
   **  If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   */
  componentDidMount() {
    let data = fetchData();
    // console.log("init");
    // console.log(loadData(data))
    store.dispatch(loadData(data));
  }
  //Updates the user information in the state using Onchange event on input fields.
  updateField = (field,input)=>{
    switch(field){
      case 'name':
        this.setState({name:input.target.value});
        // console.log(this.state.name);
        break;

      case 'email':
        this.setState({email:input.target.value});
        // console.log(this.state.email);
        break;

      case 'city':
        this.setState({city:input.target.value});
        // console.log(this.state.city);
        break;
      
      case 'phone':
        this.setState({phone:input.target.value});
        // console.log(this.state.phone);
        break;

      case 'website':
        this.setState({website:input.target.value});
        // console.log(this.state.website);
        break;

      case 'company':
        this.setState({company:input.target.value});
        // console.log(this.state.company);
        break;
    }
  }

  // Method to handle showing modal for editing user information
  // Sets default value of input fields
  showUserUpdateModal = (indexID)=>{
    this.setState({index:indexID})
    let record = store.getState().userDataReducer[indexID];
    this.setState({name:record.name});
    this.setState({email:record.email});
    this.setState({phone:record.phone});
    this.setState({website:record.website});
    this.setState({city:record.address.city});
    this.setState({company:record.company.name});
    this.setState({showModal:true});
  }

  //Method uses redux store to update user info by dispatching the new values in the input fields
  // input fields are tracked by corresponding state variables e.g name => state.name
  updateUserInformation = ()=>{
    //Dispatch update to redux store
    store.dispatch(updateData({id:this.state.index,data:{
      name:this.state.name,
      email:this.state.email,
      phone:this.state.phone,
      company:this.state.company,
      website:this.state.website,
      city:this.state.city
    }
  }
    ))

    //Update the UI to new content in store after dispatching updated data
    store.subscribe((listener) => { //Adds a change listener. It will be called any time an action is dispatched (see above), and some part of the state tree may potentially have changed
      this.setState({userlist:store.getState().userDataReducer.map((item,index)=>(
        <div onDoubleClick={()=>{this.showUserUpdateModal(index)}} key={index} style={{boxShadow:'0px 0px 3px #ccc',display:'flex',flexDirection:'column',justifyContent:'center',backgroundColor:'blue',color:'#fff',border:'2px solid #000',borderRadius:'7px'}}>
          <p style={{backgroundColor:'lightblue',marginTop:0,padding:'10px',textAlign:'center',fontSize:'2em',color:'#000'}}>{item.name}</p>
          <p style={{textAlign:'center'}}>{item.email}</p>
          <p style={{textAlign:'center'}}>{item.address.city}</p>
          <p style={{textAlign:'center'}}>{item.phone}</p>
          <p style={{textAlign:'center'}}>{item.website}</p>
          <p style={{textAlign:'center'}}>{item.company.name}</p>
        </div>)
      )
      })
    });
    this.setState({showModal:false});
  }

  //Method for routing to userlist from entry point button
  showUserList=()=>{
    this.setState({route:'userlist'});
  }
  

  render(){
    return (
      <div>
        <div style={{padding:'1rem',position:'relative'}}>
          
          {/* Entry point button */}
          {this.state.route=='home' && <div>
            <button className='btn btn-outline btn-primary' onClick={this.showUserList}>Entry Point</button>
          </div>}


          {/* User list boxes */}
          {this.state.route=='userlist' && <div>
            <div style={style.container}>
              {this.state.userlist}
            </div>
          </div>}

        </div>
        {/* Modal for updating user data */}
        {this.state.showModal && 
          <div style={{position:'absolute',height:'100%',width:'100%',top:0,display:'flex',backgroundColor:'rgba(0,0,0,0.6)',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:400,zIndex:1000}}>
              <input className='form-control' style={{margin:10,display:'block'}} type="text" placeholder='Name' defaultValue={this.state.name} onChange={(text)=>{this.updateField('name',text)}}></input>
              <input className='form-control' style={{margin:10,display:'block'}} type="text" placeholder='E-mail' defaultValue={this.state.email} onChange={(text)=>{this.updateField('email',text)}}></input>
              <input className='form-control' style={{margin:10,display:'block'}} type="text" placeholder='City' defaultValue={this.state.city} onChange={(text)=>{this.updateField('city',text)}}></input>
              <input className='form-control' style={{margin:10,display:'block'}} type="text" placeholder='Phone' defaultValue={this.state.phone} onChange={(text)=>{this.updateField('phone',text)}}></input>
              <input className='form-control' style={{margin:10,display:'block'}} type="text" placeholder='Website' defaultValue={this.state.website} onChange={(text)=>{this.updateField('website',text)}}></input>
              <input className='form-control' style={{margin:10,display:'block'}} type="text" placeholder='Company' defaultValue={this.state.company} onChange={(text)=>{this.updateField('company',text)}}></input>
              <button className='btn btn-block btn-outline-primary' onClick={this.updateUserInformation}>Update</button>
              <button className='btn btn-block btn-outline-primary' onClick={()=>{this.setState({showModal:false})}}>Close</button>
              </div>
          </div>}
      </div>
    );
  }
  
}

const style={
  container:{
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr 1fr',
    height:'100%',
    columnGap:'1rem',
    rowGap:'1rem'
  },
  app:{
    display:'flex',
    flex:1
  }
}

export default App;
