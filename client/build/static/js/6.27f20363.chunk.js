(this.webpackJsonpbtcsitewithreact=this.webpackJsonpbtcsitewithreact||[]).push([[6],{111:function(e,a,t){"use strict";t.r(a);var l=t(42),c=t(16),n=t(0),s=t.n(n),r=t(43),m=t.n(r),i=t(1),o=t(15),u=t(35),d=t(36),E=t(38),N=t(39),v=t(17),p=t(40),h=t(116),g=t(112);a.default=function(){var e=Object(i.f)(),a=Object(n.useState)(!0),t=Object(c.a)(a,2),r=t[0],b=t[1],f=Object(n.useContext)(v.a),w=f.user,_=f.setUser,y=Object(n.useState)(!1),x=Object(c.a)(y,2),O=x[0],j=x[1],k=Object(n.useState)(null),H=Object(c.a)(k,2),A=H[0],C=H[1],S=function(e){for(var a in e)return!1;return!0},D=w.user,G=D.name,T=D.username,P=D.isActivated,M=D.createdAt,F=D.cashoutHistory,R=D.investHistory,U=w.getArr,q=w.payArr;return Object(n.useEffect)((function(){!function(){if(console.log("get userData running"),w.user._id)return b(!1),console.log("already gotten user data");m.a.get("http://localhost:4000/users/user",{withCredentials:!0}).then((function(a){if(console.log("user data",a.data),"blocked"===a.data)return e.push("/contactSupport");_((function(e){return Object(l.a)(Object(l.a)({},e),{},{user:Object(l.a)({},a.data)})})),m.a.get("http://localhost:4000/receipts/foruser/".concat(a.data.email),{withCredentials:!0}).then((function(e){console.log("receipt data",e.data),_((function(a){return Object(l.a)(Object(l.a)({},a),e.data)}))})),b(!1)})).catch((function(e){if(console.log(e.response),"ACCESS DENIED"===e.response.data)return C(e.response.data),j(!0);C("err.message"),j(!0)}))}()}),[]),S(w.user)?s.a.createElement(u.a,null):s.a.createElement("div",null,O&&s.a.createElement(d.a,{response:A,setError:function(){j(!1),window.location.reload()}}),r&&s.a.createElement(u.a,null),!r&&!S(w.user)&&s.a.createElement("div",null,s.a.createElement("header",{className:"inner_page_header"},s.a.createElement(N.a,null),s.a.createElement("section",{className:"admin_body"},s.a.createElement(p.a,null),s.a.createElement("div",{className:"container",style:{marginTop:" 20px",marginBottom:"20px"}},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-5 col-sm-12"},s.a.createElement("div",{className:"admin_head_left"},s.a.createElement("h4",null,"Hello, ",G,",",s.a.createElement("span",null,"Your referral link:"," ","https://splashcash247.com/signup=".concat(T))))),s.a.createElement("div",{className:"col-md-7 col-sm-12"})),s.a.createElement("div",{className:"currency_hashrate"},s.a.createElement("div",{className:"container"},s.a.createElement("h2",{className:"common_heading"},"Your account"),s.a.createElement("div",{className:"row",style:{width:"80%",marginLeft:"auto",marginRight:"auto"}},s.a.createElement("div",{className:"col-sm-6 col-xs-6"},s.a.createElement("div",{className:"summary_box"},s.a.createElement("h3",null,"Pending PH"),s.a.createElement("h6",null,"NGN",s.a.createElement("b",{id:"total_balance"},q!==[]?q.map((function(e){return e.amount})).reduce((function(e,a){return e+a}),0):0)))),s.a.createElement("div",{className:"col-sm-6 col-xs-6"},s.a.createElement("div",{className:"summary_box"},s.a.createElement("h3",null,"Pending GH"),s.a.createElement("h6",null,"NGN",s.a.createElement("b",null,U!==[]?U.map((function(e){return e.amount})).reduce((function(e,a){return e+a}),0):0))))),s.a.createElement("div",{className:"row",style:{width:"80%",marginLeft:"auto",marginRight:"auto"}},s.a.createElement("div",{className:"col-sm-6 col-xs-6"},s.a.createElement("div",{className:"summary_box"},s.a.createElement("h3",null,"Total GH"),s.a.createElement("h6",null,"NGN",s.a.createElement("b",{id:"total_balance"},F.map((function(e){return e.amount})).reduce((function(e,a){return e+a}),0))))),s.a.createElement("div",{className:"col-sm-6 col-xs-6"},s.a.createElement("div",{className:"summary_box"},s.a.createElement("h3",null,"Total PH"),s.a.createElement("h6",null,"NGN",s.a.createElement("b",null,R.map((function(e){return e.amount})).reduce((function(e,a){return e+a}),0))))))))),P?s.a.createElement("div",{className:"hash_power_content"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-sm-6"},s.a.createElement("div",{className:"hashpower_left"},s.a.createElement("h2",null,"Deposit"),s.a.createElement(o.b,{className:"btn btn-white",to:"/deposit"},"Click Here"))),s.a.createElement("div",{className:"col-sm-6"},s.a.createElement("div",{className:"hashpower_right"},s.a.createElement("h2",null,"Withdraw"),s.a.createElement(o.b,{className:"btn btn-primary",to:"/deposit"},"Click Here")))))):s.a.createElement("div",{className:"hash_power_content"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-xs-12"},s.a.createElement("div",{className:"hashpower_left"},s.a.createElement("h2",null,"Pay a fee of NGN1000 to a guider to be activated. You have until"," "," ".concat(Object(h.a)(Object(g.a)(new Date(M),8),"MMM-dd' 'hh:mm aaaa")," "),"to make this Payment or your account will be blocked."),s.a.createElement(o.b,{className:"btn btn-white",to:"/deposit"},"Click Here"))))))),s.a.createElement(E.a,null))))}},35:function(e,a,t){"use strict";var l=t(0),c=t.n(l);a.a=function(){return c.a.createElement("div",{className:"lds-roller",style:{zIndex:"999",left:"30%",position:"absolute",top:"10%",width:"30%"}},c.a.createElement("div",null),c.a.createElement("div",null))}},36:function(e,a,t){"use strict";var l=t(0),c=t.n(l);a.a=function(e){var a=e.response,t=e.setError;return c.a.createElement("div",{className:"alert alert-dismissible alert-danger position-fixed mt-4 w-50 p-3",style:{zIndex:"999",left:"10%",position:"absolute",top:"10%",width:"70%"}},c.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert",onClick:t},"\xd7"),c.a.createElement("h4",{className:"alert-heading"},"Oops! omething went wrong"),c.a.createElement("p",{className:"mb-0"},a," "))}},38:function(e,a,t){"use strict";var l=t(0),c=t.n(l);a.a=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("section",{className:"secure"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12"},c.a.createElement("div",{className:"owl-carousel secure_carousel owl-theme",style:{opacity:"1",display:"block"}},c.a.createElement("div",{className:"owl-wrapper-outer"},c.a.createElement("div",{className:"owl-wrapper",style:{width:"4416px",left:"0px",display:"block",transition:"all 0ms ease 0s",transform:"translate3d(0px, 0px, 0px)"}},c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_1.png",alt:"secure_icon",className:"img-responsive"})))),c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_2.png",alt:"secure_icon",className:"img-responsive"})))),c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_3.png",alt:"secure_icon",className:"img-responsive"})))),c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_4.png",alt:"secure_icon",className:"img-responsive"})))),c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_5.png",alt:"secure_icon",className:"img-responsive"})))),c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_6.png",alt:"secure_icon",className:"img-responsive"})))),c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_1.png",alt:"secure_icon",className:"img-responsive"})))),c.a.createElement("div",{className:"owl-item",style:{width:"276px"}},c.a.createElement("div",{className:"item"},c.a.createElement("div",{className:"secure_inner"},c.a.createElement("img",{src:"images/secure_icon_2.png",alt:"secure_icon",className:"img-responsive"})))))),c.a.createElement("div",{className:"owl-controls clickable"},c.a.createElement("div",{className:"owl-pagination"},c.a.createElement("div",{className:"owl-page active"},c.a.createElement("span",{className:""})),c.a.createElement("div",{className:"owl-page"},c.a.createElement("span",{className:""})),c.a.createElement("div",{className:"owl-page"},c.a.createElement("span",{className:""})),c.a.createElement("div",{className:"owl-page"},c.a.createElement("span",{className:""}))))))))),c.a.createElement("footer",null,c.a.createElement("div",{className:"footer_top"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-2"}),c.a.createElement("div",{className:"col-sm-8"},c.a.createElement("div",{className:"footer_menu"},c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("a",{href:"/"},"Home")),c.a.createElement("li",null,c.a.createElement("a",{href:"/about"},"About Us")),c.a.createElement("li",null,c.a.createElement("a",{href:"/faq"},"Faq")),c.a.createElement("li",null,c.a.createElement("a",{href:"/rules"},"Terms and Agreement")),c.a.createElement("li",null,c.a.createElement("a",{href:"/support"},"Support"))))),c.a.createElement("div",{className:"col-sm-2"})))),c.a.createElement("div",{className:"footer_bottom"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12"},c.a.createElement("h6",null,"\xa9 2020 Splashcash247. All Rights Reserved.")))))))}},39:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var l=t(0),c=t.n(l),n=t(1);function s(){var e=Object(n.f)();return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"header_top"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-md-4 col-sm-6 col-xs-5"},c.a.createElement("div",{className:"logo"},c.a.createElement("a",{href:"/dashboard"},c.a.createElement("img",{src:"images/logo.png",alt:"logo",className:"img-responsive"})),c.a.createElement("ul",null))),c.a.createElement("div",{className:"col-md-5 col-sm-8 col-xs-3"},c.a.createElement("div",{className:"header_top_middle"})),c.a.createElement("div",{className:"col-md-3 col-sm-4 col-xs-3"},c.a.createElement("div",{className:"header_top_right"},c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("a",{className:"btn btn-default",href:"/login",onClick:function(){document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",e.push("/login")}},"Logout")))))))),c.a.createElement("div",{className:"headermenu"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12"},c.a.createElement("nav",{className:"navbar navbar-inverse"},c.a.createElement("div",{className:"navbar-header"},c.a.createElement("h5",null,"Main Menu"),c.a.createElement("button",{type:"button",className:"navbar-toggle","data-toggle":"collapse","data-target":"#myNavbar"},c.a.createElement("span",{className:"icon-bar"}),c.a.createElement("span",{className:"icon-bar"}),c.a.createElement("span",{className:"icon-bar"}))),c.a.createElement("div",{className:"collapse navbar-collapse",id:"myNavbar"},c.a.createElement("ul",{className:"nav navbar-nav"},c.a.createElement("li",null,c.a.createElement("a",{href:"/"},"Home")),c.a.createElement("li",null,c.a.createElement("a",{href:"/about"},"About Us")),c.a.createElement("li",null,c.a.createElement("a",{href:"/faq"},"FAQ")),c.a.createElement("li",null,c.a.createElement("a",{href:"/support"},"Support"))))))))))}},40:function(e,a,t){"use strict";var l=t(0),c=t.n(l),n=t(15);a.a=function(){return c.a.createElement("div",{className:"container admin_menu",style:{padding:"0px 0"}},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12"},c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement(n.b,{to:"/dashboard",style:{width:"80px"}},c.a.createElement("i",{className:"ti-dashboard"}),c.a.createElement("span",null,"Dashboard"))),c.a.createElement("li",null,c.a.createElement(n.b,{to:"/deposit",style:{width:"80px"}},c.a.createElement("i",{className:"ti-cloud"}),c.a.createElement("span",null,"Deposit"))),c.a.createElement("li",null,c.a.createElement(n.b,{to:"/transactions",style:{width:"80px"}},c.a.createElement("i",{className:"ti-briefcase"}),c.a.createElement("span",null,"Transactions"))),c.a.createElement("li",null,c.a.createElement(n.b,{to:"/edit_account",style:{width:"80px"}},c.a.createElement("i",{className:"ti-lock"}),c.a.createElement("span",null,"Account")))))))}}}]);
//# sourceMappingURL=6.27f20363.chunk.js.map