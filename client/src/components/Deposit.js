import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import SelectAmount from "./SelectAmount";
import Ph from "./Ph";
import Gh from "./Gh2";
import Spinner from "./Spinner";
import Error from "./Error";
import Footer from "./Footer";
import Header from "./Header";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";
// import { addHours, format } from "date-fns";

function Dashboard({}) {
  const history = useHistory();
  const [error, setError] = useState(false);
  // const [defaultFileLabel, setdefaultFileLabel] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(null);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({});
  const [selectAmount, setSelectAmount] = useState(5000);
  const [errormsg, setErrormsg] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const {
    _id,
    name,
    email,
    isActivated,
    wantToCashout,
    wantToInvest,
    InvestAmt,
    updatedAt,
    pendingInvestAmt,
    pendingCashoutAmt,
    isBlocked,
    guider,
    createdAt,
    investList,
    isGuider,
  } = user.user;
  const { receipt } = user;

  const fileSelecthandler = (e) => {
    // const filename = e.target.files[0].name;
    const file = e.target.files[0];
    // setdefaultFileLabel(filename);
    setFile(file);
    console.log("File Selected");
  };
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        .patch(
          `http://localhost:4000/receipts/updatePopPath/${currentReceipt._id}`,
          {
            popPath: filePath,
          }
        )
        .then((res) => {
          console.log("edit popPath successful!!", res.data);
          setLoading(false);
        });
    } catch (error) {
      if (error.response.status === 500) {
        console.log("there was a problem with the server");
        setError(true);
      } else {
        console.log(error.response.data.msg);
        setError(true);
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
        setError(true);
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
        `http://localhost:4000/receipts/confirm/${currentReceipt._id}`,
        currentReceipt
      )
      .then((res) => {
        console.log("confirm receipt successful!!", res.data);
      })
      .catch((err) => {
        console.log("error from confirm receipt: ", err.response);
      });
  };
  const confirmFeeHandler = () => {
    axios
      .patch(
        `http://localhost:4000/receipts/confirmfee/${currentReceipt._id}`,
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
        `http://localhost:4000/receipts/purge/${currentReceipt._id}`,
        currentReceipt
      )
      .then((res) => {
        console.log("purge successful!!", res.data);
      })
      .catch((err) => {
        console.log("error from purge: ", err.response);
      });
  };
  const phReceiptArr = receipt.filter((el) => el.pher_email === email);
  const ghReceiptArr = receipt.filter(
    (el) => el.gher_email === email && el.isActivationFee === false
  );
  const FeeArr = receipt.filter(
    (el) => el.gher_email === email && el.isActivationFee === true
  );
  const getUserData = () => {
    console.log("get userData running");
    if (user.user._id) {
      setLoading(false);
      return console.log("already gotten user data");
    }
    axios
      .get("http://localhost:4000/users/user", { withCredentials: true })
      .then((res) => {
        console.log("user data", res.data);
        setUser((prevState) => ({
          ...prevState,
          user: { ...res.data },
        }));

        axios
          .get(`http://localhost:4000/receipts/foruser/${res.data.email}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("receipt data", res.data);
            setUser((prevState) => ({
              ...prevState,
              receipt: [...res.data],
            }));
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        const errmsg = err.response.data;
        setResponse(errmsg);
        setError(true);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  return loading ? (
    redirect ? (
      <Redirect to="/login" />
    ) : (
      <Spinner />
    )
  ) : !isBlocked ? (
    <div>
      {error ? (
        <Error
          response={response}
          setError={() => {
            setError(false);
            setRedirect(true);
          }}
        />
      ) : null}
      <header className="inner_page_header">
        <Header />

        <section className="admin_body">
          <NavBar />

          {!isActivated
            ? phReceiptArr.map((el) => (
                <Ph
                  IdSet={() => setCurrentReceipt(el)}
                  title="Please pay an activation fee to be activated"
                  fileUpload={fileUploadHandler}
                  fileSelect={fileSelecthandler}
                  accountName={el.gher_accountName}
                  accountNumber={el.gher_accountNo}
                  bank={el.gher_bank}
                  phone={el.gher_phone}
                  amount={1000}
                  time={el.createdAt}
                />
              ))
            : null}

          {isActivated && !wantToInvest ? (
            <SelectAmount
              submitAmount={submitAmountHandler}
              SelectAmount={selectAmountHandler}
            />
          ) : null}
          {isActivated && wantToInvest && phReceiptArr.length
            ? //    ITERATE THROUGH LIST
              phReceiptArr.map((el) => (
                <Ph
                  title="You have been matched to make payment"
                  fileUpload={fileUploadHandler}
                  fileSelect={fileSelecthandler}
                  accountName={el.gher_accountName}
                  accountNumber={el.gher_accountNo}
                  bank={el.gher_bank}
                  phone={el.gher_phone}
                  amount={el.amount}
                  time={el.createdAt}
                  IdSet={() => setCurrentReceipt(el)}
                />
              ))
            : null}
          {isActivated && wantToInvest && !phReceiptArr.length ? (
            //    ITERATE THROUGH LIST
            <h4>You will be Matched within the next few hours</h4>
          ) : null}
          {!isActivated && FeeArr.length
            ? //ITERATE THROUGH LIST FOR GUIDER
              FeeArr.map((el) => (
                <Gh
                  name={el.pher_name}
                  phone={el.pher_phone}
                  amount={el.amount}
                  time={el.createdAt}
                  confirm={confirmFeeHandler}
                  purge={() => console.log("cant purge new user")}
                  pop={el.popPath}
                  IdSet={() => setCurrentReceipt(el)}
                />
              ))
            : null}
          {isActivated && wantToCashout && ghReceiptArr.length
            ? //ITERATE THROUGH LIST,CHECK IF ACTIVATED and PAIRED
              phReceiptArr.map((el) => (
                <Gh
                  name={el.pher_name}
                  phone={el.pher_phone}
                  amount={el.amount}
                  time={el.createdAt}
                  confirm={confirmPaymentHandler}
                  purge={purgeHandler}
                  pop={el.popPath}
                  IdSet={() => setCurrentReceipt(el)}
                />
              ))
            : null}
        </section>
        <Footer />
      </header>
    </div>
  ) : (
    <Error
      response="Your Account have been Blocked, Please write to support for verification and reactivation"
      setError={() => {
        history.push("/login");
      }}
    />
  );
}

export default Dashboard;
