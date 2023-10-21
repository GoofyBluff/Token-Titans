import React, {useState} from 'react';
import {ethers} from 'ethers';
import './App.css';



const MetaMask = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectWallet = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChanged([result[0]])
            })
        }
        else{
            setErrorMessage('Install Metamask please!!')
        }
    }


    const accountChanged = (accountName) => {
        setDefaultAccount(accountName);
        getUserBalance(accountName)
    }

    const getUserBalance = (accountAddress) => {
        window.ethereum
        .request({method: 'eth_getBalance', params: [String(accountAddress),'latest']})
        .then(balance => {
            setUserBalance(ethers.formatEther(balance) + 'ETH');
        })
       .catch(error => {
        setErrorMessage('Error fetching balance: ' + error.message);
    })
};

    async function sendTransaction(e) {
        let params = [{
            from: "0xeB1092328F7b6FDB3d2f9203174C5D204F72770a",

            to: e.target.to_address.value,

            gas: Number(21000).toString(16),

            gasPrice: Number(2500000).toString(16),

            value: Number(1000000000000000000).toString(16),
        }]

        let result = await window.ethereum.request({method: "eth_sendTransaction", params}).catch((err) => {
            console.log(err)
        })
    }

    async function productPicker(e) {
        let sales_value;

        if(e.target.product_form.value == "product1")
        {
            sales_value = 1000000000000000000
        };

        if(e.target.product_form.value == "product2")
        {
            sales_value = 2000000000000000000
        };

        if(e.target.product_form.value == "product3")
        {
            sales_value = 3000000000000000000
        };

        let params = [{
            from: "0xeB1092328F7b6FDB3d2f9203174C5D204F72770a",

            to: "0xeB1092328F7b6FDB3d2f9203174C5D204F72770a",

            gas: Number(21000).toString(16),

            gasPrice: Number(2500000).toString(16),

            value: Number(sales_value).toString(16),
        }]

        let result = await window.ethereum.request({method: "eth_sendTransaction", params}).catch((err) => {
            console.log(err)
        })
    }

    return(
        <div style={{ textAlign: 'center', border: '300px solid slateblue', padding: '20px', fontSize: '20px', borderRadius: '20px'}}>
            <div className="container">
            <div style={{border: '10px solid black', borderRadius: '30px', objectFit: 'cover'}}><h1>Wallet Connection</h1>
    
    <button onClick={connectWallet} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '15px', border: 'none', fontSize: '30px', cursor: 'pointer'}}>
        Connect Wallet Button
    </button>
    
    <h3>Address: {defaultAccount}</h3>
    <h3>Balance: {userBalance} $</h3>

    <form onSubmit={sendTransaction}>
        <h3>Enter Transaction Address:</h3>
        <input type="text" name='to_address' placeholder='Address:' style={{ width: '80%', fontSize: '20px'}} />
        <input type="submit" value="Submit" style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '20px', border: 'none', fontSize: '20px', margin: '10px'}} />
    </form>

    <hr />

    <form onSubmit={productPicker}>
    <label htmlFor="product_form" style={{ fontWeight: 'bold' }}>Pick Your Product:</label>

        <select id="product_form" style={{ width: '80%', fontSize: '20px' }}>
            <option value='product1'>Product 1</option>
            <option value='product2'>Product 2</option>
            <option value='product3'>Product 3</option>
        </select>
        <input type="submit" value="Submit" style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '20px', border: 'none', fontSize: '20px', margin: '10px', cursor: 'pointer'}} />
    </form></div>
</div>
            
    

    {errorMessage}
</div>

    );
};

export default MetaMask;

