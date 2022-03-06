import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader";
const Admin = () => {
  const [logs, setLogs] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const emailRef = useRef("");
  const phoneNumberRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();
    getStaffs();
  }, []);

  const getLogs = async () => {
    try {
      const res = await axios.get(
        "https://staff-face-recog.herokuapp.com/logs"
        // "http://127.0.0.1:5000/logs"
      );
      setLogs(res.data.logs);
    } catch (error) {
      console.log(error);
    }
  };

  const getStaffs = async () => {
    try {
      const res = await axios.get(
        "https://staff-face-recog.herokuapp.com/staffs"
        // "http://127.0.0.1:5000/staffs"
      );
      setStaffs(res.data.staff);
    } catch (error) {
      console.log(error);
    }
  };
  const register = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const fileInput = document.querySelector("#image-input");
    formData.append("image", fileInput.files[0]);
    formData.append("email", emailRef.current.value);
    formData.append("phone_number", phoneNumberRef.current.value);
    formData.append("first_name", firstNameRef.current.value);
    formData.append("last_name", lastNameRef.current.value);
    console.log(formData);

    // var image = imageRef.current.value;
    // var email = emailRef.current.value;
    // var phone_number = phoneNumberRef.current.value;
    // var first_name = firstNameRef.current.value;
    // var last_name = lastNameRef.current.value;

    const res = await axios.post(
      "https://staff-face-recog.herokuapp.com/register",
      // "http://127.0.0.1:5000/register",
      formData
      //   {
      //     image: image,
      //     phone_number: phone_number,
      //     email: email,
      //     first_name: first_name,
      //     last_name: last_name,
      //   }
    );
    if (res.data === "item created") {
      setLoading(false);
      alert("Staff registered successfully");
      getStaffs();
    } else {
      alert("registeration failed");
    }
  };
  return (
    <div className="max-w-7xl mx-auto m-10  ">
      <h1 className="text-2xl font-bold uppercase">admin panel</h1>
      <div className="flex flex-col sm:flex-row space-x-5 justify-center">
        <div className="p-2">
          <h2 className="fomt-bold text-xl">Register Staffs</h2>
          <div>
            <form
              onSubmit={register}
              encType="multipart/form-data"
              className="flex flex-col"
            >
              <label htmlFor="name">First Name</label>
              <input
                className="border py-1 px-2 "
                id="name"
                type="text"
                autoComplete="name"
                required
                ref={firstNameRef}
              />
              <label htmlFor="last_name">Last Name</label>
              <input
                className="border py-1 px-2 "
                id="last_name"
                type="text"
                autoComplete="name"
                required
                ref={lastNameRef}
              />
              <label htmlFor="email">Email</label>
              <input
                className="border py-1 px-2 "
                id="email"
                type="email"
                autoComplete="email"
                required
                ref={emailRef}
              />
              <label htmlFor="phone_number">Phone Number</label>
              <input
                className="border py-1 px-2 "
                id="phone_number"
                type="text"
                autoComplete="name"
                required
                ref={phoneNumberRef}
              />
              <label htmlFor="image">Staff Image</label>
              <input
                type="file"
                name="image"
                id="image-input"
                accept=".jpeg, .png, .jpg"
              />
              <br />
              <br />
              {loading ? (
                <Loader />
              ) : (
                <button
                  className="grow bg-black text-white p-2 m-2"
                  type="submit"
                >
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="">
          <h2 className="font-bold text-xl">Staff Clock ins</h2>
          <table className="table-auto border-separate border-spacing-[0.75rem] divide-y border-gray-300">
            <thead>
              <tr>
                <th>Staff</th>
                <th>date and time</th>
                <th>latitude</th>
                <th>longitude</th>
              </tr>
            </thead>
            <tbody>
              {logs.length && staffs.length > 0 ? 
                logs.map((lg) => 
                  <tr key={lg.id} className="border-b border-gray-400">
                    <td>{`${staffs[lg.staff_id - 1].first_name} ${
                      staffs[lg.staff_id - 1].last_name
                    }`}</td>
                    <td>{lg.created_date}</td>
                    <td>{lg.longitude}</td>
                    <td>{lg.latitude}</td>
                  </tr>)
               : 
                <p>loading logs ...</p>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div>
          <h2 className="font-bold text-2xl text-center">STAFFS</h2>
          <table className="table-auto border-separate [border-spacing:0.75rem] divide-y divide-gray-300">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Staff ID</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {staffs.length > 0 ? (
                staffs.map((st) => (
                  <tr key={st.id}>
                    <td>{st.first_name}</td>
                    <td>{st.last_name}</td>
                    <td>{st.id}</td>
                    {/* <td><img src={st.image} alt="" srcset="" /></td> */}
                  </tr>
                ))
              ) : (
                <p>loading staffs ...</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
