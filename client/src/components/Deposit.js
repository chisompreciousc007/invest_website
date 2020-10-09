import React, { useState, useContext, useEffect } from "react";
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
import { addHours, format } from "date-fns";
const baseUrl = process.env.baseURL || "http://localhost:4000",

function Dashboard() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [file, setFile] = useState(null);
  const [selectAmount, setSelectAmount] = useState(5000);
  const { user, setUser } = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const { _id, email, isActivated, wantToInvest, recommit } = user.user;
  const { payArr, getArr, guiderArr, activationFee } = user;
  const isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };
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
      const res = await axios.post(baseUrl+"/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { filePath } = res.data;
      const obj = {
        popPath: filePath,
      };
      axios
        .patch(
          `${baseUrl}/receipts/updatePopPath/${currentReceipt._id}`,
          obj
        )
        .then((res) => {
          console.log("edit popPath successful!!", res.data);
          setLoading(false);
          window.location.reload();
        });
    } catch (error) {
      if (error.response.status === 500) {
        console.log("there was a problem with the server");
        setError(true);
        window.scrollTo(0, 0);
      } else {
        console.log(error.response.data.msg);
        setError(true);
        window.scrollTo(0, 0);
      }
    }
  };
  const submitAmountHandler = (e) => {
    e.preventDefault();
    axios
      .patch(`${baseUrl}/users/wantToInvest`, {
        investAmt: +selectAmount,
        _id: _id,
        email: email,
      })
      .then((res) => {
        console.log("edit wantToInvest successful!!", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error from edit wwantToInvest");
        console.log(err.response);
        setResponse(err.response.data);
        setError(true);
        window.scrollTo(0, 0);
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
      .patch(`${baseUrl}/receipts/confirmpayment`, currentReceipt)
      .then((res) => {
        console.log("confirm receipt successful!!", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error from confirm receipt: ", err.response);
      });
  };
  const confirmFeeHandler = () => {
    axios
      .patch(baseUrl+"/receipts/confirmfee", currentReceipt)
      .then((res) => {
        console.log(res);
        console.log("confirm receipt successful!!", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error from confirm receipt: ", err.response);
        setResponse("Request Failed");
        setError(true);
        window.scrollTo(0, 0);
      });
  };
  const purgeHandler = () => {
    console.log(currentReceipt);
    axios
      .patch(baseUrl+"/receipts/purge", currentReceipt)
      .then((res) => {
        console.log("purge successful!!", res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setResponse("Kindly wait until the time have expired.");
        setError(true);
        window.scrollTo(0, 0);
      });
  };

  const getUserData = () => {
    console.log("get userData running");
    if (user.user._id) {
      setLoading(false);
      return console.log("already gotten user data");
    }
    axios
      .get(baseUrl+"/users/user", { withCredentials: true })
      .then((res) => {
        console.log("user data", res.data);
        if (res.data === "blocked") return history.push("/contactSupport");
        setUser((prevState) => ({
          ...prevState,
          user: { ...res.data },
        }));

        axios
          .get(`${baseUrl}/receipts/foruser/${res.data.email}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("receipt data", res.data);
            setUser((prevState) => ({
              ...prevState,
              ...res.data,
            }));
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setResponse("Request Failed");
        setError(true);
        window.scrollTo(0, 0);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  if (isEmpty(user.user)) return <Spinner />;

  return (
    <div>
      {loading && <Spinner />}
      {error && (
        <Error
          response={response}
          setError={() => {
            setError(false);
            window.location.reload();
          }}
        />
      )}
      <header className="inner_page_header">
        <Header />

        <section className="admin_body">
          <NavBar />

          {!isActivated && !isEmpty(activationFee) && (
            <Ph
              IdSet={() => setCurrentReceipt(activationFee)}
              title="Please pay an activation fee to be activated"
              fileUpload={fileUploadHandler}
              fileSelect={fileSelecthandler}
              accountName={activationFee.gher_accountName}
              accountNumber={activationFee.gher_accountNo}
              bank={activationFee.gher_bank}
              phone={activationFee.gher_phone}
              pop={activationFee.popPath}
              amount={1000}
              time={format(
                addHours(new Date(activationFee.createdAt), 8),
                "MMM-dd' 'hh:mm aaaa"
              )}
            />
          )}

          {isActivated && !wantToInvest && (
            <SelectAmount
              submitAmount={submitAmountHandler}
              SelectAmount={selectAmountHandler}
              recommit={recommit}
            />
          )}
          {payArr.length && //    ITERATE THROUGH LIST
            payArr.map((el) => (
              <Ph
                key={el._id}
                title="You have been matched to make payment"
                fileUpload={fileUploadHandler}
                fileSelect={fileSelecthandler}
                accountName={el.gher_accountName}
                accountNumber={el.gher_accountNo}
                bank={el.gher_bank}
                phone={el.gher_phone}
                amount={el.amount}
                pop={el.popPath}
                time={format(
                  addHours(new Date(el.createdAt), 8),
                  "MMM-dd' 'hh:mm aaaa"
                )}
                IdSet={() => setCurrentReceipt(el)}
              />
            ))}
          {isActivated && wantToInvest && !payArr.length && (
            //    ITERATE THROUGH LIST
            <h4>You will be Matched within the next few hours</h4>
          )}
          {guiderArr.length && //ITERATE THROUGH LIST FOR GUIDER
            guiderArr.map((el) => (
              <Gh
                key={el._id}
                name={el.pher_name}
                phone={el.pher_phone}
                amount={el.amount}
                time={format(
                  addHours(new Date(el.createdAt), 8),
                  "MMM-dd' 'hh:mm aaaa"
                )}
                confirm={confirmFeeHandler}
                purge={purgeHandler}
                pop={el.popPath}
                IdSet={() => setCurrentReceipt(el)}
              />
            ))}
          {getArr.length && //ITERATE THROUGH LIST,CHECK IF ACTIVATED and PAIRED
            getArr.map((el) => (
              <Gh
                key={el._id}
                name={el.pher_name}
                phone={el.pher_phone}
                amount={el.amount}
                time={format(
                  addHours(new Date(el.createdAt), 8),
                  "MMM-dd' 'hh:mm aaaa"
                )}
                confirm={confirmPaymentHandler}
                purge={purgeHandler}
                pop={el.popPath}
                IdSet={() => setCurrentReceipt(el)}
              />
            ))}
        </section>
        <Footer />
      </header>
    </div>
  );
}

export default Dashboard;
