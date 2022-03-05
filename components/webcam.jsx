import React, { useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import Loader from "./loader";

const WebcamCapture = ({ longitude, latitude }) => {
  const [staff, setStaff] = useState("");
  const staffIdRef = useRef("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyStaff = async () => {
    const staff_id = staffIdRef.current.value;
    if (staff_id !== "") {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://staff-face-recog.herokuapp.com/verify",
          {
            image: image,
            staff_id: staff_id,
            longitude: longitude,
            latitude: latitude,
          }
        );
        setStaff(res.data.staff);
        alert | "Verification Done";
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user",
  };

  const reset = () => {
    setImage("");
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="m-2">
      {image !== "" ? (
        <img src={image} alt="staff" />
      ) : (
        <Webcam
          audio={false}
          height={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
      )}

      <div className="flex flex-col items-center justify-center mt-2 space-y-2">
        <input
          className="flex grow w-full py-2 pl-3 outline-none border-2"
          ref={staffIdRef}
          type="text"
          placeholder="enter staff ID"
        />

        <button
          className="py-2 px-10 bg-green-500 text-white font-bold"
          onClick={capture}
        >
          CAPTURE IMAGE
        </button>
        <button
          className="py-2 px-10 bg-yellow-500 text-white font-bold"
          onClick={reset}
        >
          RESET IMAGE
        </button>

        {loading ? (
          <Loader />
        ) : (
          <button
            className="py-2 px-10 bg-red-500 text-white font-bold"
            onClick={verifyStaff}
          >
            CLOCK IN
          </button>
        )}
      </div>
      <h2>{staff}</h2>
    </div>
  );
};

export default WebcamCapture;
