import { useState, useRef, useEffect } from "react";
import axios from "axios";
const Admin = () => {
  const [logs, setLogs] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const emailRef = useRef("");
  const phoneNumberRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");

  useEffect(() => {
    getLogs();
    getStaffs();
  }, []);

  const getLogs = async () => {
    try {
      const res = await axios.get(
        "https://staff-face-recog.herokuapp.com/logs"
      );
      setLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStaffs = async () => {
    try {
      const res = await axios.get(
        "https://staff-face-recog.herokuapp.com/staffs"
      );
      setStaffs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const register = async (event) => {
    event.preventDefault();

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
      "https://staff-face-recog.herokuapp.com/register", formData
    //   {
    //     image: image,
    //     phone_number: phone_number,
    //     email: email,
    //     first_name: first_name,
    //     last_name: last_name,
    //   }
    );
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold uppercase">admin panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2>Register Staffs</h2>
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
              />
              <label htmlFor="last_name">Last Name</label>
              <input
                className="border py-1 px-2 "
                id="last_name"
                type="text"
                autoComplete="name"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                className="border py-1 px-2 "
                id="email"
                type="email"
                autoComplete="email"
                required
              />
              <label htmlFor="phone_number">Phone Number</label>
              <input
                className="border py-1 px-2 "
                id="phone_number"
                type="text"
                autoComplete="name"
                required
              />
              <label htmlFor="image">Staff Image</label>
              <input type="file" name="image" id="image-input" accept=".jpeg, .png, .jpg" />
              <br />
              <br />
              <button className="grow bg-black text-white p-2 m-2" type="submit">Register</button>
            </form>
          </div>
        </div>
        <div>
            a
        </div>
      </div>
    </div>
  );
};

export default Admin;
