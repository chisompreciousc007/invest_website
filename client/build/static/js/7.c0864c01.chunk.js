(this.webpackJsonpbtcsitewithreact=this.webpackJsonpbtcsitewithreact||[]).push([[7],{113:function(e,a,t){"use strict";t.r(a);var l=t(42),n=t(16),c=t(0),r=t.n(c),s=t(1),m=t(39),i=t(38),o=t(40),u=t(17),E=t(36),d=t(43),p=t.n(d),N=t(35);a.default=function(){var e=Object(s.f)(),a=Object(c.useContext)(u.a),t=a.user,d=a.setUser,v=Object(c.useState)(!1),F=Object(n.a)(v,2),g=F[0],b=F[1],h=Object(c.useState)(null),f=Object(n.a)(h,2),w=f[0],_=f[1],y=Object(c.useState)(!0),x=Object(n.a)(y,2),O=x[0],j=x[1],k=t.user,A=k.name,C=k.username,S=k.accountName,D=k.accountNo,T=k.bank,U=k.email,B=k.phone;return Object(c.useEffect)((function(){console.log("useeffect running"),function(){if(console.log("get userData running"),t.user._id)return j(!1),console.log("already gotten user data");p.a.get("http://localhost:4000/users/user",{withCredentials:!0}).then((function(a){if(console.log("user data",a.data),"blocked"===a.data)return e.push("/contactSupport");d((function(e){return Object(l.a)(Object(l.a)({},e),{},{user:Object(l.a)({},a.data)})})),p.a.get("http://localhost:4000/receipts/foruser/".concat(a.data.email),{withCredentials:!0}).then((function(e){console.log("receipt data",e.data),d((function(a){return Object(l.a)(Object(l.a)({},a),e.data)}))})),j(!1)})).catch((function(e){if(console.log(e.response),"ACCESS DENIED"===e.response.data)return _(e.response.data),b(!0);_("err.message"),b(!0)}))}()}),[]),function(e){for(var a in e)return!1;return!0}(t.user)?r.a.createElement(N.a,null):r.a.createElement("div",null,g?r.a.createElement(E.a,{response:w,setError:function(){b(!1),window.location.reload()}}):null,O?r.a.createElement(N.a,null):r.a.createElement("header",{className:"inner_page_header"},r.a.createElement(m.a,null),r.a.createElement("section",{className:"admin_body"},r.a.createElement(o.a,null),r.a.createElement("div",{className:"container",style:{marginTop:" 20px",marginBottom:"20px"}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-10 col-sm-12"},r.a.createElement("form",{style:{textAlign:"left",color:"#fff"}},r.a.createElement("h3",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"Your account:")),r.a.createElement("table",{style:{margin:"auto"}},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"Account Name:")),r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},A))),r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"Username:")),r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},C))),r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"Phone:")),r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},B))),r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"Bank Account Name:")),r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},S))),r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"Bank Account Number:")),r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},D))),r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"Bank Name:")),r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},T))),r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{style:{color:"#FFFFFF"}},"E-mail address:")),r.a.createElement("td",null,U)),r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,"\xa0"),r.a.createElement("td",null,r.a.createElement("input",{type:"submit",value:"Change Account data",className:"sbmt"})))))))))),r.a.createElement(i.a,null)))}},35:function(e,a,t){"use strict";var l=t(0),n=t.n(l);a.a=function(){return n.a.createElement("div",{className:"lds-roller",style:{zIndex:"999",left:"30%",position:"absolute",top:"10%",width:"30%"}},n.a.createElement("div",null),n.a.createElement("div",null))}},36:function(e,a,t){"use strict";var l=t(0),n=t.n(l);a.a=function(e){var a=e.response,t=e.setError;return n.a.createElement("div",{className:"alert alert-dismissible alert-danger position-fixed mt-4 w-50 p-3",style:{zIndex:"999",left:"10%",position:"absolute",top:"10%",width:"70%"}},n.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert",onClick:t},"\xd7"),n.a.createElement("h4",{className:"alert-heading"},"Oops! omething went wrong"),n.a.createElement("p",{className:"mb-0"},a," "))}},38:function(e,a,t){"use strict";var l=t(0),n=t.n(l);a.a=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("section",{className:"secure"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("div",{className:"owl-carousel secure_carousel owl-theme",style:{opacity:"1",display:"block"}},n.a.createElement("div",{className:"owl-wrapper-outer"},n.a.createElement("div",{className:"owl-wrapper",style:{width:"4416px",left:"0px",display:"block",transition:"all 0ms ease 0s",transform:"translate3d(0px, 0px, 0px)"}},n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_1.png",alt:"secure_icon",className:"img-responsive"})))),n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_2.png",alt:"secure_icon",className:"img-responsive"})))),n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_3.png",alt:"secure_icon",className:"img-responsive"})))),n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_4.png",alt:"secure_icon",className:"img-responsive"})))),n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_5.png",alt:"secure_icon",className:"img-responsive"})))),n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_6.png",alt:"secure_icon",className:"img-responsive"})))),n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_1.png",alt:"secure_icon",className:"img-responsive"})))),n.a.createElement("div",{className:"owl-item",style:{width:"276px"}},n.a.createElement("div",{className:"item"},n.a.createElement("div",{className:"secure_inner"},n.a.createElement("img",{src:"images/secure_icon_2.png",alt:"secure_icon",className:"img-responsive"})))))),n.a.createElement("div",{className:"owl-controls clickable"},n.a.createElement("div",{className:"owl-pagination"},n.a.createElement("div",{className:"owl-page active"},n.a.createElement("span",{className:""})),n.a.createElement("div",{className:"owl-page"},n.a.createElement("span",{className:""})),n.a.createElement("div",{className:"owl-page"},n.a.createElement("span",{className:""})),n.a.createElement("div",{className:"owl-page"},n.a.createElement("span",{className:""}))))))))),n.a.createElement("footer",null,n.a.createElement("div",{className:"footer_top"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-2"}),n.a.createElement("div",{className:"col-sm-8"},n.a.createElement("div",{className:"footer_menu"},n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("a",{href:"/"},"Home")),n.a.createElement("li",null,n.a.createElement("a",{href:"/about"},"About Us")),n.a.createElement("li",null,n.a.createElement("a",{href:"/faq"},"Faq")),n.a.createElement("li",null,n.a.createElement("a",{href:"/rules"},"Terms and Agreement")),n.a.createElement("li",null,n.a.createElement("a",{href:"/support"},"Support"))))),n.a.createElement("div",{className:"col-sm-2"})))),n.a.createElement("div",{className:"footer_bottom"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("h6",null,"\xa9 2020 Splashcash247. All Rights Reserved.")))))))}},39:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var l=t(0),n=t.n(l),c=t(1);function r(){var e=Object(c.f)();return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"header_top"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-4 col-sm-6 col-xs-5"},n.a.createElement("div",{className:"logo"},n.a.createElement("a",{href:"/dashboard"},n.a.createElement("img",{src:"images/logo.png",alt:"logo",className:"img-responsive"})),n.a.createElement("ul",null))),n.a.createElement("div",{className:"col-md-5 col-sm-8 col-xs-3"},n.a.createElement("div",{className:"header_top_middle"})),n.a.createElement("div",{className:"col-md-3 col-sm-4 col-xs-3"},n.a.createElement("div",{className:"header_top_right"},n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("a",{className:"btn btn-default",href:"/login",onClick:function(){document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",e.push("/login")}},"Logout")))))))),n.a.createElement("div",{className:"headermenu"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("nav",{className:"navbar navbar-inverse"},n.a.createElement("div",{className:"navbar-header"},n.a.createElement("h5",null,"Main Menu"),n.a.createElement("button",{type:"button",className:"navbar-toggle","data-toggle":"collapse","data-target":"#myNavbar"},n.a.createElement("span",{className:"icon-bar"}),n.a.createElement("span",{className:"icon-bar"}),n.a.createElement("span",{className:"icon-bar"}))),n.a.createElement("div",{className:"collapse navbar-collapse",id:"myNavbar"},n.a.createElement("ul",{className:"nav navbar-nav"},n.a.createElement("li",null,n.a.createElement("a",{href:"/"},"Home")),n.a.createElement("li",null,n.a.createElement("a",{href:"/about"},"About Us")),n.a.createElement("li",null,n.a.createElement("a",{href:"/faq"},"FAQ")),n.a.createElement("li",null,n.a.createElement("a",{href:"/support"},"Support"))))))))))}},40:function(e,a,t){"use strict";var l=t(0),n=t.n(l),c=t(15);a.a=function(){return n.a.createElement("div",{className:"container admin_menu",style:{padding:"0px 0"}},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement(c.b,{to:"/dashboard",style:{width:"80px"}},n.a.createElement("i",{className:"ti-dashboard"}),n.a.createElement("span",null,"Dashboard"))),n.a.createElement("li",null,n.a.createElement(c.b,{to:"/deposit",style:{width:"80px"}},n.a.createElement("i",{className:"ti-cloud"}),n.a.createElement("span",null,"Deposit"))),n.a.createElement("li",null,n.a.createElement(c.b,{to:"/transactions",style:{width:"80px"}},n.a.createElement("i",{className:"ti-briefcase"}),n.a.createElement("span",null,"Transactions"))),n.a.createElement("li",null,n.a.createElement(c.b,{to:"/edit_account",style:{width:"80px"}},n.a.createElement("i",{className:"ti-lock"}),n.a.createElement("span",null,"Account")))))))}}}]);
//# sourceMappingURL=7.c0864c01.chunk.js.map