
function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const ctx                 = React.useContext(UserContext); 
  const [user,setUser]      = React.useState({name:'',email:'',valid:false});


  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        (<LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser}/>) :
        <LoginMsg setShow={setShow} setStatus={setStatus} setUser={setUser}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {props.setShow(true)}}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSONarse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);    
            props.setUser(data);  
        } catch(err) {
            props.setStatus(text);

            console.log('err:', text);
            
        }
    });


  }



  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}