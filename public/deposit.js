function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [validE, setValidE]   = React.useState(false); 
  const [validD, setValidD] = React.useState(false)

  function handleEmail(e){
    const value = e.currentTarget.value;
    setEmail(value);
      fetch(`/account/findOne/${value}`) 
      .then(response => response.text())
      .then(text => {
        try{
          const data1 = JSON.parse(text);
          setValidE(true);
          console.log(data1)
        }
        catch(err){
          console.log("err");
          setValidE(false);
        }
      })
    }

    function handleDeposit(e){
        const value = e.currentTarget.value;
        setAmount(value);
        if (value <= 0 || value == '' || value == NaN || value == null ){
            setValidD(false);
        }
        else {
            setValidD(true);}
    }
  
  function handle(){
    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value.name)+ " actual balance is : "+" "+JSON.stringify(data.value.balance));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  return(<>
    { !(validE&&validD) ?
      (<div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> those are not valid email or amount!
      </div>):<></>}
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={handleEmail}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={handleDeposit}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle} disabled={!(validD&&validE)}>Deposit</button>

  </>);
}