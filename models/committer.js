const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const CommitterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    isFufilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
CommitterSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Committer", CommitterSchema);

// if (firstGherEmail === firstPherEmail) {
//   console.log("Gh & Ph email is same user!!");
//   if (pherSorted[1] === undefined || pherSorted[1] === null) {
//     return res.status(200).send("No more Ph to pair");
//   }
//   var {
//     amount: firstPherAmt,
//     _id: firstPherID,
//     email: firstPherEmail,
//   } = pherSorted[1];
//   console.log("new pher selected", firstPherEmail);
//   const gh = await User.findOne({ email: firstGherEmail });
//   const ph = await User.findOne({ email: firstPherEmail });
//   if (firstGherAmt == firstPherAmt) {
//     console.log("is equal");
//     let obj = {
//       gher_name: gh.name,
//       gher_email: gh.email,
//       gher_accountName: gh.accountName,
//       gher_accountNo: gh.accountNo,
//       gher_bank: gh.bank,
//       gher_phone: gh.phone,
//       pher_name: ph.name,
//       pher_email: ph.email,
//       pher_phone: ph.phone,
//       amount: firstPherAmt,
//       isActivationFee: false,
//     };
//     const makeReceipt = await new Receipt(obj).save();
//     const updateIsPairedGher = await Gher.findByIdAndUpdate(
//       firstGherID,
//       {
//         isPaired: true,
//         amount: 0,
//       },
//       { new: true, runValidators: true, context: "query" }
//     );
//     const updateIsPairedPher = await Pher.findByIdAndUpdate(
//       firstPherID,
//       {
//         isPaired: true,
//         amount: 0,
//       },
//       { new: true, runValidators: true, context: "query" }
//     );
//     // SEND TEXT AND TELEGRAM
//     // let phonee = "08036734191";
//     // const textnumber = `+234${phonee.substr(1)}`;
//     // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
//     const waitForTeegram = await postTelegram(
//       makeReceipt.pher_name,
//       makeReceipt.gher_name,
//       makeReceipt.amount
//     );

//     console.log(
//       `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updateIsPairedPher.amount}`
//     );
//     // res.status(200).send("success");
//   }
//   if (firstPherAmt < firstGherAmt) {
//     console.log("pher is lesser");
//     let obj = {
//       gher_name: gh.name,
//       gher_email: gh.email,
//       gher_accountName: gh.accountName,
//       gher_accountNo: gh.accountNo,
//       gher_bank: gh.bank,
//       gher_phone: gh.phone,
//       pher_name: ph.name,
//       pher_email: ph.email,
//       pher_phone: ph.phone,
//       amount: firstPherAmt,
//       isActivationFee: false,
//     };

//     const makeReceipt = await new Receipt(obj).save();

//     const updateGherBalance = await Gher.findByIdAndUpdate(
//       firstGherID,
//       {
//         $inc: { amount: -firstPherAmt },
//         isPaired: false,
//       },
//       { new: true, runValidators: true, context: "query" }
//     );
//     const updateIsPairedPher = await Pher.findByIdAndUpdate(
//       firstPherID,
//       {
//         isPaired: true,
//         amount: 0,
//       },
//       { new: true, runValidators: true, context: "query" }
//     );
//     // SEND TEXT AND TELEGRAM
//     // let phonee = "08036734191";
//     // const textnumber = `+234${phonee.substr(1)}`;
//     // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
//     const waitForTeegram = await postTelegram(
//       makeReceipt.pher_name,
//       makeReceipt.gher_name,
//       makeReceipt.amount
//     );

//     console.log(
//       `Balance after Pairing...Gher: ${updateGherBalance.amount}, Pher:  ${updateIsPairedPher.amount}`
//     );
//     // res.status(200).send("success");
//   }
//   if (firstPherAmt > firstGherAmt) {
//     console.log("pher is greater");
//     // PHERAMT > GHERAMT
//     let obj = {
//       gher_name: gh.name,
//       gher_email: gh.email,
//       gher_accountName: gh.accountName,
//       gher_accountNo: gh.accountNo,
//       gher_bank: gh.bank,
//       gher_phone: gh.phone,
//       pher_name: ph.name,
//       pher_email: ph.email,
//       pher_phone: ph.phone,
//       amount: firstGherAmt,
//       isActivationFee: false,
//     };
//     const makeReceipt = await new Receipt(obj).save();

//     const updatePherBalance = await Pher.findByIdAndUpdate(
//       firstPherID,
//       {
//         $inc: { amount: -firstGherAmt },
//         isPaired: false,
//       },
//       { new: true, runValidators: true, context: "query" }
//     );
//     const updateIsPairedGher = await Gher.findByIdAndUpdate(
//       firstGherID,
//       {
//         isPaired: true,
//         amount: 0,
//       },
//       { new: true, runValidators: true, context: "query" }
//     );
//     // SEND TEXT AND TELEGRAM
//     // let phonee = "08036734191";
//     // const textnumber = `+234${phonee.substr(1)}`;
//     // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
//     const waitForTeegram = await postTelegram(
//       makeReceipt.pher_name,
//       makeReceipt.gher_name,
//       makeReceipt.amount
//     );

//     console.log(
//       `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updatePherBalance.amount}`
//     );
//     // res.status(200).send("success");
//   }
//   // RERUN;
//   matchAuto();
// }

// if (exist !== null) {
//   console.log("old commit exists");
//   const checkisFulfil = exist.isFufilled;

//   if (checkisFulfil) {
//     console.log("old commit is fulfilled");

//     //CHECKS AND SETUP
//     if (amount >= pledge) {
//       console.log("current commit is fulfilled");
//       // CREATE NEW/UPDATE GHER WITH OLD COMMIT AMOUNT
//       // const handleGher = await createUpdateGher(pher_email, exist.amount);

//       const existingGher = await Gher.findOne({ email: pher_email });
//       const GherAmt = exist.amount * 1.5;
//       if (existingGher === null) {
//         console.log("No existing Gh");
//         const moveOldCommitToGherCollection = await new Gher({
//           email: pher_email,
//           amount: GherAmt,
//           isFirst: true,
//         }).save();
//         console.log("old commit used to create brand new Gher");
//       }
//       if (existingGher !== null) {
//         console.log("old Gh exists");
//         // check cashout history and decide if isFirst

//         const user3 = await User.findOne(
//           { email: pher_email },
//           "cashoutHistory"
//         );

//         if (user3.cashoutHistory.length > 0) {
//           console.log("there is cashout history");
//           const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
//             { email: pher_email },
//             { $inc: { amount: GherAmt }, isFirst: false, isPaired: false }
//           );
//           console.log("old commit used to update Gher & isFirst:false");
//         } else {
//           console.log("there is no cashout history");
//           const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
//             { email: pher_email },
//             { $inc: { amount: GherAmt }, isFirst: true, isPaired: false }
//           );
//           console.log(
//             "old commit used to update a running Gher and isFirst:true"
//           );
//         }
//       }
//       // RESET COMMIT
//       const savedCommit = await Committer.findOneAndUpdate(
//         { email: pher_email },
//         { amount: amount, isFufilled: true }
//       );
//       console.log("commit reset");
//       // const setisFufilledTrue = setCommitIsFulfilled(pher_email, true);
//       const setWantToInvestFalse = setWantToInvest(pher_email, false);
//       // const setisFufilledTruePromise = await setisFufilledTrue;
//       const setWantToInvestFalsePromise = await setWantToInvestFalse;
//       console.log("commit set isfulfilled:true, wantToInvest:false");
//     }
//     if (amount < pledge) {
//       console.log("curent commit is not fulfilled");
//       // CREATE NEW/UPDATE pENDING GHER WITH OLD COMMIT AMOUNT
//       // const existingPendingGher = await PendingGher.findOne({
//       //   email: pher_email,
//       // });
//       const pendingGherAmt = exist.amount * 1.5;
//       // if (existingPendingGher === null) {
//       const moveOldCommitToPendingGherCollection = await new PendingGher({
//         email: pher_email,
//         amount: pendingGherAmt,
//       }).save();
//       console.log("old commit used to create pending Gher");
//       // }
//       // if (existingPendingGher !== null) {
//       //   const moveOldCommitToPendingGherCollection = await PendingGher.findOneAndUpdate(
//       //     { email: pher_email },
//       //     { $inc: { amount: pendingGherAmt } }
//       //   );
//       //   console.log("old commit used to update pending Gher");
//       // }
//       // RESET COMMIT
//       const savedCommit = await Committer.findOneAndUpdate(
//         { email: pher_email },
//         { amount: amount, isFufilled: false }
//       );
//       console.log("commit reset");
//       // const setisFufilledFalse = setCommitIsFulfilled(pher_email, false);
//       const setwantToInvestTrue = setWantToInvest(pher_email, true);
//       // const setisFufilledFalsePromise = await setisFufilledFalse;
//       const setwantToInvestTruePromise = await setwantToInvestTrue;
//       console.log("commit set isfulfilled:false, wantToInvest:true");
//     }
//   } else {
//     console.log("old commit is not fulfilled");
//     //INCREMENT TO COMMIT
//     const incCommit = await Committer.findOneAndUpdate(
//       { email: pher_email },
//       { $inc: { amount: amount } },
//       { new: true, runValidators: true, context: "query" }
//     );
//     console.log("total new incremented commit :", incCommit.amount);
//     //CHECKS AND SETUP
//     if (incCommit.amount >= pledge) {
//       console.log("total increased commit is fulfilled");
//       // CHECK FOR PENDING GHER AND CONFIRM IF ANY
//       const existingPendingGher = await PendingGher.findOne({
//         email: pher_email,
//       });
//       if (existingPendingGher !== null) {
//         console.log("pending Gh exist");
//         //  CONFIRM PENDING GHER TO MAIN GHER
//         const existingGher2 = await Gher.findOne({ email: pher_email });
//         if (existingGher2 === null) {
//           console.log("no existing Gh");
//           const moveOldCommitToGherCollection = await new Gher({
//             email: existingPendingGher.email,
//             amount: existingPendingGher.amount,
//             isFirst: true,
//           }).save();
//           console.log(
//             "pending Gher used to create fresh Gher with isFirst:true"
//           );
//         }
//         if (existingGher2 !== null) {
//           console.log("there is existing Gh");
//           //  CHECK     CASHOUT HISTORY AND DECIDE IF ITS FIRST COMMIT
//           const user3 = await User.findOne(
//             { email: pher_email },
//             "cashoutHistory"
//           );

//           if (user3.cashoutHistory.length > 0) {
//             console.log("user have cashout history ");
//             const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
//               { email: pher_email },
//               {
//                 amount: existingPendingGher.amount,
//                 isFirst: false,
//                 isPaired: false,
//               }
//             );
//             console.log(
//               "pending Gher used to create new Gher from alreay paired gher, setting isFirst:false"
//             );
//           } else {
//             console.log("user do not have cashout history ");
//             const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
//               { email: pher_email },
//               {
//                 $inc: { amount: existingPendingGher.amount },
//                 isFirst: true,
//                 isPaired: false,
//               }
//             );
//             console.log(
//               "pending Gher used to update a running Gher & isFirst:true "
//             );
//           }
//         }
//       }
//       const setisFufilledTrue = setCommitIsFulfilled(pher_email, true);
//       const setwantToInvestFalse = setWantToInvest(pher_email, false);
//       const setIsFulfilledTruePromise = await setisFufilledTrue;
//       const setwantToInvestFalsePromise = await setwantToInvestFalse;
//       console.log("commit set isfulfilled:true, wantToInvest:false");
//     } else {
//       console.log("total increased commit is not fulfilled");
//       // const setisFufilledFalse = setCommitIsFulfilled(pher_email, false);
//       // const setwantToInvestTrue = setWantToInvest(pher_email, true);
//       // const setIsFulfilledFalsePromise = await setisFufilledFalse;
//       // const setwantToInvestTruePromise = await setwantToInvestTrue;
//       console.log(
//         "commit retained as  isfulfilled:false, wantToInvest:true"
//       );
//     }
//   }
// }
