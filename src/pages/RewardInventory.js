import React from 'react';
// import './App.css';
import '../static/css/RewardInventory.css';
import '../static/css/Button.css';

const RewardInventory = () => {
    const data = [
        { name: "Anom", age: 19, gender: "Male", address: "home", email: "gmail", status: "graduated", brand: "lala"},
        { name: "Megha", age: 19, gender: "Female", address: "home", email: "gmail", status: "graduated", brand: "lala"},
        { name: "Subham", age: 25, gender: "Male", address: "home", email: "gmail", status: "graduated", brand: "lala"},
    ]
    return (  
        <div className="RewardInventory">
            <h2>Reward Inventory</h2>
            <div className="button-field">
                <button className="button-pink">+ Add Reward</button>
                <button className="button-green">Carry Out Stock</button>
            </div>
            <table >
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Brand</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.age}</td>
                            <td>{val.gender}</td>
                            <td>{val.address}</td>
                            <td>{val.email}</td>
                            <td>{val.status}</td>
                            <td>{val.brand}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}
 
export default RewardInventory;