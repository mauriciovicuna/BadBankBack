
function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const ctx                 = React.useContext(UserContext); 
  const [logged,setLogged]      = React.useState({name: ctx.user.name, email: ctx.user.email});
  const mystyle = {float:"right", width: "50%"}

  React.useEffect(()=>{
    ctx.user = {name: logged.name, email: logged.email}
    if(ctx.user.name != ''){
    setShow(false)
    const span = document.getElementById("name");
    span.innerHTML = `<strong>Hi there ${logged.name}!</strong>`
    }
  },[logged])
  return (
    <>
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        (<LoginForm setShow={setShow} setStatus={setStatus} setLogged={setLogged}/>) :
        <LoginMsg setShow={setShow} setStatus={setStatus} setLogged={setLogged}/>}
    />
    </>
  ) 
}

function LoginMsg(props){
  function handleLogout(){
    props.setShow(true)
    props.setLogged({name:'',email:''})
    
  }
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handleLogout}>
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
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);    
            props.setLogged(data); 
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