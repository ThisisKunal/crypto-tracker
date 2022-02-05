
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from "./component/Coin";
function App() {
   const[coins,setCoins]= useState([]);
   const[search,setSearch]=useState("");

  useEffect(()=>{
    //https://www.coingecko.com/en/api
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data)
      console.log(res.data)
    })
    .catch(err=> console.log('400 page not find'))
  },[])

     const  changeHandler = (e)=>{setSearch(e.target.value)}

     const filterdcoins = coins.filter(coin=>
      coin.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="coin-app">
      <div className='coin-search'>
         <h1 className='coin-text'>Search a Currency</h1>
          <form>
          <input className='coin-input' type='text' placeholder='Search' onChange={changeHandler}/>
          </form>
      </div>     
      { filterdcoins.map(coin=>{
        return(
          <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketCap={coin.market_cap} 
           price={coin.current_price} priceChange={coin.price_change_percentage_24h} volume={coin.total_volume}/>
        )
      })}
    </div>
  );
}

export default App;
