import React, {useState} from "react";

function Actions(props) {
  const [betSize, setBetSize] = useState('0');
  let amountCall;
  let amountRaise;
  let diff; 
  if (props.isActing){
      diff = 2*(props.maxWager - props.player.currentWager);
      amountCall = 'call $' + (props.maxWager-props.player.currentWager);
      console.log(props.player.currentWager);
      
      amountRaise = 'Raise $' + (2*(props.maxWager - props.player.currentWager));
      
      console.log(amountCall);
  }
  return props.isActing? 
  (   <div className="buttons">
          <button type="button" id="call" onClick = {() => props.act('call')}>   
            {props.isThereBet? amountCall: 'check'}     
          </button>
          <button type="button" id="fold" onClick ={() =>props.act('fold', 0)}>
            Fold
          </button>
          <button type='button' id="bet" onClick = {() =>props.act('bet', Number(props.isThereBet?diff: betSize ))} >
            {props.isThereBet? amountRaise: 'bet'}
          </button>
          <div id = 'betInputs'>
              <label> 
                  <input  type ='text' onChange={(e) => setBetSize(Number(e.target.value))} id ='betInput' value = {props.isThereBet? diff: betSize}/>
              </label>
              <input  type = 'range' id = 'betRange' name = 'betRange' value = {props.isThereBet? diff: betSize}
                step = '1' min = '0' max = '60'  onChange= {(e) => {setBetSize(Number(e.target.value))}}/>
           </div>  
    </div>
  ): null;
}
export default Actions;
