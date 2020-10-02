import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SelectAmount from "./SelectAmount";
import Ph from "./Ph";
import Gh from "./Gh2";
import Spinner from "./Spinner";
import Error from "./Error";
import Footer from "./Footer";
import Header from "./Header";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";

function Dashboard({}) {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [defaultFileLabel, setdefaultFileLabel] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({});
  const [selectAmount, setSelectAmount] = useState(5000);
  const [errormsg, setErrormsg] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  //   const { user, setUser } = useContext(UserContext);
  const _id = "12345678d457989";
  const name = "test name";
  const isActivated = false;
  const wantToCashout = false;
  const wantToInvest = false;
  const InvestAmt = 0;
  const updatedAt = new Date();
  const pendingInvestAmt = 0;
  const pendingCashoutAmt = false;
  const expectingGuiderCashout = true;
  const isBlocked = false;
  const guiderMatchedForCashoutList = {};
  const isGuider = false;
  const investList = {};
  const cashoutList = {};

  // const getUser = () => {
  //   axios
  //     .get("http://localhost:4000/users/user", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data);
  //       setUserData((prevState) => ({
  //         ...prevState,
  //         ...res.data,
  //       }));
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("error from deposit: ", err.response);
  //       return history.push("/");
  //     });
  //   //
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  const fileSelecthandler = (e) => {
    const filename = e.target.files[0].name;
    const file = e.target.files[0];
    setdefaultFileLabel(filename);
    setFile(file);
    console.log(file);
  };
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log("formdata: ", formData);
    try {
      const res = await axios.post("http://localhost:4000/uploads", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      axios
        .patch(`http://localhost:4000/receipts/popPath/${currentReceipt._id}`, {
          popPath: filePath,
        })
        .then((res) => {
          console.log("edit popPath successful!!", res.data);
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };
  const submitAmountHandler = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/users/wantToInvest/${_id}`, {
        InvestAmt: +selectAmount,
      })
      .then((res) => {
        console.log("edit wantToInvest successful!!", res.data);
        history.push("/temp");
        history.goBack();
      })
      .catch((err) => {
        console.log("error from edit wwantToInvest: ", err.response);
        setErrormsg(true);
      });
  };
  const selectAmountHandler = (e) => {
    e.preventDefault();
    const v = e.target.value;
    const val = +v;
    setSelectAmount(val);
    console.log(val);
  };
  const confirmPaymentHandler = () => {
    axios
      .patch(
        `http://localhost:4000/receipts/isConfirmed/${currentReceipt._id}`,
        currentReceipt
      )
      .then((res) => {
        console.log("confirm receipt successful!!", res.data);
      })
      .catch((err) => {
        console.log("error from confirm receipt: ", err.response);
      });
  };
  const purgeHandler = () => {
    axios
      .patch(
        `http://localhost:4000/receipts/isPurged/${currentReceipt._id}`,
        currentReceipt
      )
      .then((res) => {
        console.log("purge successful!!", res.data);
      })
      .catch((err) => {
        console.log("error from purge: ", err.response);
      });
  };

  return loading ? (
    <Spinner />
  ) : !isBlocked ? (
    <div>
      <header className="inner_page_header">
        <Header />
        <section className="admin_body">
          <NavBar />

          {!isActivated ? (
            <Ph
              IdSet={() => setCurrentReceipt({ name: "bla labbss" })}
              title="Please pay an activation fee of to be activated"
              fileUpload={fileUploadHandler}
              fileSelect={fileSelecthandler}
              accountName={"gfjghfjh"}
              accountNumber={"mainguider.accountNumber"}
              bank={"mainguider.bank"}
              phone={"mainguider.phone"}
              amount={1000}
              time={updatedAt}
            />
          ) : null}

          {isActivated && !wantToInvest ? (
            <SelectAmount
              submitAmount={submitAmountHandler}
              SelectAmount={selectAmountHandler}
            />
          ) : null}
          {isActivated && wantToInvest && investList.length ? (
            //    ITERATE THROUGH LIST
            <Ph
              title="You have been matched to make payment"
              fileUpload={fileUploadHandler}
              fileSelect={fileSelecthandler}
              accountName={"gfjghfjh"}
              accountNumber={"mainguider.accountNumber"}
              bank={"mainguider.bank"}
              phone={"mainguider.phone"}
              amount={1000}
              time={updatedAt}
              IdSet={() => setCurrentReceipt({ name: "bla labbss" })}
            />
          ) : null}
          {isActivated && isGuider && guiderMatchedForCashoutList.length ? (
            //ITERATE THROUGH LIST
            <Gh
              name={"payer to Guider"}
              phone={"123456789"}
              amount={1000}
              time={updatedAt}
              confirm={confirmPaymentHandler}
              purge={purgeHandler}
              pop={"path/top/file"}
              IdSet={() => setCurrentReceipt({ name: "bla labbss" })}
            />
          ) : null}
          {!isActivated && !wantToCashout && !cashoutList.length ? (
            //ITERATE THROUGH LIST

            <Gh
              name={"payer to Guider"}
              phone={"123456789"}
              amount={1000}
              time={updatedAt}
              confirm={confirmPaymentHandler}
              purge={purgeHandler}
              pop={"oie_2iE5KQclNSiP.jpg"}
              IdSet={() => setCurrentReceipt({ name: "bla labbss" })}
            />
          ) : null}
        </section>
        <Footer />
      </header>
    </div>
  ) : (
    <Error
      response="Your Account have been Blocked, Please write to support for verification and reactivation"
      setError={() => {
        history.push("/");
      }}
    />
  );
}

export default Dashboard;
