
const firebaseConfig = {
  apiKey: "AIzaSyBWkRoYgXQr_JzdEpCbEauuY6-1pcmnMng",
  authDomain: "full-stack-banking-app-bd675.firebaseapp.com",
  projectId: "full-stack-banking-app-bd675",
  storageBucket: "full-stack-banking-app-bd675.appspot.com",
  messagingSenderId: "495563217108",
  appId: "1:495563217108:web:0b292df9107386c67fc341",
  measurementId: "G-SB3JSC1NYY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)




function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const ctx                 = React.useContext(UserContext); 
  const [logged,setLogged]      = React.useState({name: ctx.user.name, email: ctx.user.email});

  React.useEffect(()=>{
    ctx.user = {name: logged.name, email: logged.email};
    const span = document.getElementById("name");
    if(ctx.user.name != ''){
    setShow(false)
    span.innerHTML = `Hi there<strong> ${logged.name}!</strong>`
    }
    else {span.innerHTML = ``}
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
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
  }
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handleLogout}>
        Log out
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
            props.setStatus("not a valid user");

            console.log('err:', text);
            
        }
    });


  }
  function handleOAuth(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .signInWithPopup( provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.

      const user = result.user;
      console.log(user);
      console.log(user.displayName +" " + user.email);
      props.setLogged({name:user.displayName, email:user.email});
      
      
      
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("errors:" + errorCode)
      // ...
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
    <button type= "submit" className="btn btn-light" onClick={handleOAuth}>Login with Google</button>
   
  </>);
}