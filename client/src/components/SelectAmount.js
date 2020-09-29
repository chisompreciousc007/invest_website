import React from 'react';

function SelectAmount({ duetime, submitAmount, SelectAmount }) {
    return (
        <div className="form-group" >
            <label htmlFor="exampleSelect1"><h5>Please Select an amount to invest, Your Deadline is <b>{duetime}</b>  </h5></label>
            <select onChange={SelectAmount} className="form-control" id="exampleSelect1" style={{ "width": "170px", "color": "rgb(28, 28, 25)", "backgroundColor": "rgba(236, 213, 44, 0.67)", "marginBottom": "inherit" }} >
                <option value="10000" >10,000</option>
                <option value="15000">15,000</option>
                <option value="20000">20,000</option>
                <option value="25000">25,000</option>
                <option value="30000">30,000</option>
                <option>40,000</option>
                <option>50,000</option>
                <option>60,000</option>
                <option>80,000</option>
                <option>100,000</option>
                <option>120,000</option>
                <option>150,000</option>
                <option>180,000</option>
                <option>200,000</option>
                <option>250,000</option>
                <option>300,000</option>
                <option>400,000</option>
            </select>
            <button type="button" class="btn btn-primary" onClick={submitAmount} >Invest</button>
        </div>
    )
}
export default SelectAmount;