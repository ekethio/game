import React, {useState} from "react";

function Actions(props) {
  const [betSize, setBetSize] = useState('0');
  

  return props.isActing? 
  (   <div className="buttons">
          <button type="button" id="call" onClick = {() => props.act('call')}>   
            {props.isThereBet? 'call': 'check'}     
          </button>
          <button type="button" id="fold" onClick ={() =>props.act('fold', 0)}>
            Fold
          </button>
          <button type='button' id="bet" onClick = {() =>props.act('bet', betSize)} >
            {props.isThereBet? 'Raise': 'bet'}
          </button>
          <div id = 'betInputs'>
              <label> 
                  <input  type ='text' onChange={(e) => setBetSize(Number(e.target.value))} id ='betInput' value = { betSize}/>
              </label>
              <input  type = 'range' id = 'betRange' name = 'betRange' value = {betSize}
                step = '1' min = '0' max = '60'  onChange= {(e) => {setBetSize(Number(e.target.value))}}/>
           </div>  
    </div>
  ): null;
}
export default Actions;
