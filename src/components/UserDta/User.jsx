import React, { useEffect, useRef, useState } from "react";
import "./user.css";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from '@mui/material/Snackbar';


function User() {
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(1);
  const [uniqIde, setUniqIde] = useState();
  const [snackBar, setSnackBar] = useState({
    active: false,
    message: "This is a message.",
    type: "danger"
  })
  //   console.log(uniqIde);
  const [searchQuery, setSearchQuery] = useState("");
  let one = useRef();
  let two = useRef();
  function addUser() {
    let name = one.current.value;
    let city = two.current.value;
    let _id = userId;
    let rendomId = uniqIde;
    let data = {
      name,
      city,
      _id,
      rendomId,
    };
    if(userExists(name)) {
      setSnackBar({message: "User already exists", type: "danger", active: true})
      return;
    };
    // chekedUpdate(name);
    // userData.push(data);
    setUserData(users => [...users, data]);
    conter();
    uniqId();
    one.current.value = "";
    two.current.value = "";
  }
  useEffect(() => {
    uniqId();
  }, []);
  function userExists(name){
      return userData.some((user)=>user.name == name)
  }
  function conter() {
    setUserId(userId + 1);
  }
  // ********Search function *******
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchArray = userData?.filter((array) =>
    searchQuery
      .toLowerCase()
      .split(" ")
      .every((term) => {
        return array?.name?.toLowerCase().includes(term);
      })
  );
  function uniqId() {
    let id = "id" + Math.random().toString(16).slice(10);
    // let id = Math.floor(Math.random() * 100)
    setUniqIde(id);
  }
  const handleClose = ()=>setSnackBar((old)=>({...old,active: false}))
  return (
    <>
    <Snackbar
      open={snackBar.active}
      autoHideDuration={3000}
      onClose={handleClose}
      message={snackBar.message}
      action={()=>{}}
    />
      <div className="header">
        <div className="firt-box">
          <input
            ref={one}
            required
            className="input"
            type="text"
            placeholder="Enter Name"
          />
          <input
            ref={two}
            required
            className="input"
            type="text"
            placeholder="Enter city"
          />
        </div>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Search User Name"
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn" onClick={() => addUser()}>
            +Add User
          </button>
        </div>
      </div>
      {/* *****************************Table*************************** */}
      <table border={1}>
        <tbody>
          <tr
            style={{
              background: "blue",
              color: "white",
              height: "40px",
              fontSize: "17px",
            }}
          >
            <th>#Id</th>
            <th>No:</th>
            <th>Name</th>
            <th>City</th>
            {/* <th>Number</th> */}
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {searchArray?.map((item, i) => (
            <tr key={i}>
              <th>{item.rendomId}</th>
              <th>{item._id}</th>
              <th>{item.name}</th>
              <th>{item.city}</th>
              {/* <th>{item.number}</th> */}
              <th>
                <UpdateIcon
                  aria-label="UpdateIcon"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    const name = one.current.value;
                    const city = two.current.value;
                    
                    setUserData(users => users.map(user=> user.rendomId == item.rendomId? {
                      ...item, name, city
                    }: user));
                  }}
                />
              </th>
              <th>
                <DeleteIcon
                  aria-label="delete"
                  cursor="pointer"
                  onClick={() => {
                    userData.splice(i, 1);
                    setUserData([...userData]);
                  }}
                />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default User;
