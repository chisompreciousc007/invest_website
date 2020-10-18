import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SelectAmount from "./SelectAmount";
import Ph from "./Ph";
import Gh from "./Gh2";
import Spinner from "./Spinner";
import Success from "./Successful";
import Error from "./Error";
import Footer from "./Footer";
import Header from "./Header";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";
import { addHours, format } from "date-fns";

function Dashboard() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [file, setFile] = useState(null);
  const [selectAmount, setSelectAmount] = useState(5000);
  const { user, setUser } = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const { _id, email, isActivated, wantToInvest, recommit, pledge } = user.user;
  const { payArr, getArr, guiderArr, activationFee } = user;
  const isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };
  const fileSelecthandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    if (file === null) {
      setResponse("No file Selected");
      return setError(true);
    }
    if (file.size > 500000) {
      setResponse("File size exceeds 500KB");
      return setError(true);
    }
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      setResponse("File is not an image format");
      return setError(true);
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    console.log("formdata: ", formData);
    try {
      // const res = await axios.post("/uploads", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const res = await axios.post(
        `/receipts/upload-pop/${currentReceipt._id}`,
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      setLoading(false);
      setResponse(res.data);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      // const { filePath } = res.data;
      // const obj = {
      //   popPath: filePath,
      // };
      // axios
      //   .patch(`/receipts/updatePopPath/${currentReceipt._id}`, obj)
      //   .then((res) => {
      //     setLoading(false);
      //     setResponse(res.data);
      //     setSuccess(true);
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 1000);
      //   });
    } catch (error) {
      if (error.response.status === 500) {
        console.log(error.response.data);
        setResponse("Server Error,Request Failed");
        setError(true);
      } else {
        setResponse(error.response.data);
        setError(true);
      }
    }
  };
  const submitAmountHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`/users/wantToInvest`, {
        investAmt: selectAmount,
        _id: _id,
        email: email,
        pledge: pledge,
      })
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setResponse(err.response.data);
        setError(true);
      });
  };
  const selectAmountHandler = (e) => {
    e.preventDefault();
    const v = e.target.value;
    const val = +v;
    setSelectAmount(val);
  };
  const confirmPaymentHandler = () => {
    setLoading(true);
    axios
      .patch(`/receipts/confirmpayment`, currentReceipt)
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setResponse(err.response.data);
        setError(true);
      });
  };
  const confirmFeeHandler = () => {
    setLoading(true);
    axios
      .patch("/receipts/confirmfee", currentReceipt)
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setResponse(err.response.data);
        setError(true);
      });
  };
  const purgeHandler = () => {
    setLoading(true);
    axios
      .patch("/receipts/purge", currentReceipt)
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setResponse(err.response.data);
        setError(true);
      });
  };

  const getUserData = () => {
    if (!user.user._id) {
      axios
        .get("/users/user", { withCredentials: true })
        .then((res) => {
          if (res.data === "blocked") return history.push("/contactSupport");
          setUser((prevState) => ({
            ...prevState,
            user: { ...res.data },
          }));

          axios
            .get(`/receipts/foruser/${res.data.email}`, {
              withCredentials: true,
            })
            .then((res) => {
              setUser((prevState) => ({
                ...prevState,
                ...res.data,
              }));
            });
          axios
            .get(`/ghers/${res.data.email}`, {
              withCredentials: true,
            })
            .then((res) => {
              setUser((prevState) => ({
                ...prevState,
                ...res.data,
              }));
              setLoading(false);
            });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            console.log("there was a problem with the server");
            return window.location.reload();
          }
          setResponse(err.response.data);
          setError(true);
          setTimeout(() => {
            return history.push("/login");
          }, 1000);
        });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isEmpty(user.user)) return <Spinner />;

  return (
    <div>
      {loading && <Spinner />}
      {success && (
        <Success
          response={response}
          setError={() => {
            setSuccess(false);
            window.location.reload();
          }}
        />
      )}
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
              pop={activationFee.popImage.data}
              amount={1000}
              time={format(
                addHours(new Date(activationFee.createdAt), 8),
                "MMM-dd' 'hh:mm aaaa"
              )}
            />
          )}
          {isActivated && !isEmpty(user.ghStatus) && (
            <h4 style={{ color: "goldenrod" }}>
              Your are now eligible for GH of NGN{user.ghStatus.amount}, You
              will be matched shortly.
            </h4>
          )}
          {isActivated && !wantToInvest && (
            <SelectAmount
              submitAmount={submitAmountHandler}
              SelectAmount={selectAmountHandler}
              recommit={recommit}
            />
          )}
          {isActivated &&
            payArr.length && //    ITERATE THROUGH LIST
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
                pop={el.popImage.data}
                time={format(
                  addHours(new Date(el.createdAt), 8),
                  "MMM-dd' 'hh:mm aaaa"
                )}
                IdSet={() => setCurrentReceipt(el)}
              />
            ))}
          {isActivated && wantToInvest && !payArr.length && (
            //    ITERATE THROUGH LIST
            <h4 style={{ color: "goldenrod" }}>
              You will be Matched within the next few hours for your PH
            </h4>
          )}
          {isActivated &&
            guiderArr.length && //ITERATE THROUGH LIST FOR GUIDER
            guiderArr.map((el) => (
              <Gh
                title="You have been matched to get activation fee payment"
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
                pop={el.popImage.data}
                IdSet={() => setCurrentReceipt(el)}
              />
            ))}
          {getArr.length && //ITERATE THROUGH LIST,CHECK IF ACTIVATED and PAIRED
            getArr.map((el) => (
              <Gh
                title="You have been matched to GH"
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
                pop={el.popImage.data}
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
