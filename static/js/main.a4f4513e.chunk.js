(this["webpackJsonpcontext-api-dev-tools-extension"]=this["webpackJsonpcontext-api-dev-tools-extension"]||[]).push([[0],[,,,,,,,function(e,t){t.__esModule=!0;var n={isInitialized:!1},o=!1,a={};t.default=function(e){var t=function(t){e&&e(t),a=t},r=function(){if(window.__REDUX_DEVTOOLS_EXTENSION__)return n.isInitialized=!1,"function"===typeof n.current.disconnect&&n.current.disconnect()};return!n.isInitialized&&window.__REDUX_DEVTOOLS_EXTENSION__&&(n.current=window.__REDUX_DEVTOOLS_EXTENSION__.connect({features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0}}),n.isInitialized=!0,"function"===typeof n.current.subscribe&&(n.current.subscribe((function(e){if(e.payload&&("JUMP_TO_STATE"===e.payload.type||"JUMP_TO_ACTION"===e.payload.type)&&e.state){var n=JSON.parse(e.state);t({type:"IMPORT_STATE",state:n})}else"DISPATCH"===e.type&&e.payload&&e.payload.nextLiftedState&&e.payload.nextLiftedState.computedStates.forEach((function(n,o){"@@INIT"!==(n=e.payload.nextLiftedState.actionsById[o]).action.type&&t(n.action)}))})),window.addEventListener("beforeunload",(function(e){e.preventDefault(),r()})))),{sendDispatch:t,sendUpdatedState:function(e){window.__REDUX_DEVTOOLS_EXTENSION__&&(o?"IMPORT_STATE"!==a.type&&n.current.send(a,e):(n.current.init(e),o=!0))},disconnectDevTools:r}}},,function(e,t,n){e.exports=n(17)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/logo.25bf045c.svg"},function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(6),i=n.n(r),c=(n(14),n(3)),d=n(4),u=n(8),s=n(7),l=n.n(s),f=Object(o.createContext)(void 0),p=Object(o.createContext)(void 0);function E(e,t){var n=e.root;switch(t.type){case"CREATE":var o=Math.max.apply(Math,Object(u.a)(n.map((function(e){return e.id}))))+1;return{root:n.concat({id:Number.isFinite(o)&&o||1,text:t.text,done:!1})};case"TOGGLE":return{root:n.map((function(e){return e.id===t.id?Object(d.a)(Object(d.a)({},e),{},{done:!e.done}):e}))};case"REMOVE":return{root:n.filter((function(e){return e.id!==t.id}))};case"IMPORT_STATE":return t.state;default:throw new Error("Unhandled action")}}function m(e){var t=e.children,n=Object(o.useReducer)(E,{root:[{id:1,text:"My first todo using context API",done:!0},{id:2,text:"Second one to try time travel debugging",done:!0},{id:3,text:"3rd one to import new todos",done:!1}]}),r=Object(c.a)(n,2),i=r[0],d=r[1],u=l()(d);return Object(o.useEffect)((function(){u.sendUpdatedState(i)}),[i,u]),a.a.createElement(p.Provider,{value:u.sendDispatch},a.a.createElement(f.Provider,{value:i},t))}function v(){var e=Object(o.useContext)(p);if(!e)throw new Error("TodosProvider not found");return e}var y=function(){var e=Object(o.useState)(""),t=Object(c.a)(e,2),n=t[0],r=t[1],i=v();return a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),i({type:"CREATE",text:n}),r("")},style:{display:"flex",justifyContent:"center",width:"50%"}},a.a.createElement("input",{value:n,placeholder:"What are you planning to do?",onChange:function(e){return r(e.target.value)},style:{padding:10,borderRadius:5,flexBasis:"35%"}}),a.a.createElement("button",{style:{padding:10,marginLeft:10,borderRadius:5}},"Create"))};n(15);var O=function(e){var t=e.todo,n=v();return a.a.createElement("li",{className:"TodoItem ".concat(t.done?"done":"")},a.a.createElement("span",{className:"text",onClick:function(){n({type:"TOGGLE",id:t.id})}},t.text),a.a.createElement("span",{className:"remove",onClick:function(){n({type:"REMOVE",id:t.id})}},"(X)"))};var _=function(){var e,t=function(){var e=Object(o.useContext)(f);if(!e)throw new Error("TodosStateProvider not found");return e}();return a.a.createElement("ul",null,null===t||void 0===t||null===(e=t.root)||void 0===e?void 0:e.map((function(e){return a.a.createElement(O,{todo:e,key:e.id})})))},T=function(){return a.a.createElement(m,null,a.a.createElement("div",{id:"main",style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",alignSelf:"center",height:"100vh"}},a.a.createElement("img",{src:n(16),alt:"react-logo",style:{maxHeight:200}}),a.a.createElement(y,null),a.a.createElement(_,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.a4f4513e.chunk.js.map