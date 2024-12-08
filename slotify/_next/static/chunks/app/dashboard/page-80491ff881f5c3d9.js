(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[105],{5180:(e,t,r)=>{Promise.resolve().then(r.bind(r,3686))},3686:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var n=r(5155),s=r(2115),a=r(7094),i=r(7396);function o(){let[e,t]=(0,s.useState)([]),[r,o]=(0,s.useState)({name:"Your Business Name",description:"Your business description",theme:{primaryColor:"#EC4899",secondaryColor:"#F9A8D4",font:"Inter"},paymentInfo:{accountHolder:"",accountNumber:"",routingNumber:""}}),[l,c]=(0,s.useState)(!1),[d,m]=(0,s.useState)({}),u=r=>{t(e.filter(e=>e.id!==r))};return(0,n.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,n.jsx)("div",{className:"fixed top-4 left-4 z-50",children:(0,n.jsxs)(i.default,{href:"/",className:"flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors text-gray-700",children:[(0,n.jsx)(a.QVr,{size:14}),(0,n.jsx)(a.rQ8,{size:18}),(0,n.jsx)("span",{children:"Home"})]})}),(0,n.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,n.jsx)("div",{className:"bg-white rounded-lg shadow p-6 mb-8",children:l?(0,n.jsxs)("form",{onSubmit:e=>{e.preventDefault(),c(!1)},className:"space-y-4",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"text-black block text-sm font-medium text-gray-700",children:"Business Name"}),(0,n.jsx)("input",{type:"text",value:r.name,onChange:e=>o({...r,name:e.target.value}),className:"mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"text-black block text-sm font-medium text-gray-700",children:"Description"}),(0,n.jsx)("textarea",{value:r.description,onChange:e=>o({...r,description:e.target.value}),className:"mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2",rows:3})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{className:"text-black text-lg font-medium mb-4",children:"Payment Information"}),(0,n.jsxs)("div",{className:"space-y-4",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"text-black block text-sm font-medium text-gray-700",children:"Account Holder Name"}),(0,n.jsx)("input",{type:"text",value:r.paymentInfo.accountHolder,onChange:e=>o({...r,paymentInfo:{...r.paymentInfo,accountHolder:e.target.value}}),className:"mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"text-black block text-sm font-medium text-gray-700",children:"Account Number"}),(0,n.jsx)("input",{type:"text",value:r.paymentInfo.accountNumber,onChange:e=>o({...r,paymentInfo:{...r.paymentInfo,accountNumber:e.target.value}}),className:"mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"text-black block text-sm font-medium text-gray-700",children:"Routing Number"}),(0,n.jsx)("input",{type:"text",value:r.paymentInfo.routingNumber,onChange:e=>o({...r,paymentInfo:{...r.paymentInfo,routingNumber:e.target.value}}),className:"mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"})]})]})]}),(0,n.jsxs)("div",{className:"flex gap-4",children:[(0,n.jsx)("button",{type:"submit",className:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700",children:"Save Changes"}),(0,n.jsx)("button",{type:"button",onClick:()=>c(!1),className:"inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",children:"Cancel"})]})]}):(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"flex justify-between items-start",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:r.name}),(0,n.jsx)("p",{className:"mt-2 text-gray-600",children:r.description}),r.paymentInfo.accountHolder&&(0,n.jsxs)("p",{className:"mt-2 text-gray-600",children:["Payment Account: ",r.paymentInfo.accountHolder]})]}),(0,n.jsx)("button",{onClick:()=>c(!0),className:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700",children:"Edit Business Info"})]})})}),(0,n.jsxs)("div",{className:"bg-white rounded-lg shadow p-6",children:[(0,n.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Services"}),(0,n.jsxs)("div",{className:"mb-8",children:[(0,n.jsx)("h3",{className:"text-lg font-medium text-gray-900 mb-4",children:"Add New Service"}),(0,n.jsxs)("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[(0,n.jsx)("input",{type:"text",placeholder:"Service Title",value:d.title||"",onChange:e=>m({...d,title:e.target.value}),className:"text-black rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"}),(0,n.jsx)("input",{type:"number",placeholder:"Price",value:d.price||"",onChange:e=>m({...d,price:Number(e.target.value)}),className:"text-black rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"}),(0,n.jsx)("textarea",{placeholder:"Description",value:d.description||"",onChange:e=>m({...d,description:e.target.value}),className:"text-black rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"})]}),(0,n.jsx)("button",{onClick:()=>{d.title&&d.price&&(t([...e,{id:Math.random().toString(36).substr(2,9),title:d.title,description:d.description||"",price:Number(d.price)}]),m({}))},className:"mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700",children:"Add Service"})]}),(0,n.jsx)("div",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",children:e.map(e=>(0,n.jsxs)("div",{className:"bg-gray-50 p-4 rounded-lg",children:[(0,n.jsxs)("div",{className:"flex justify-between items-start",children:[(0,n.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:e.title}),(0,n.jsx)("button",{onClick:()=>u(e.id),className:"text-red-600 hover:text-red-800",children:"Delete"})]}),(0,n.jsx)("p",{className:"mt-2 text-gray-600",children:e.description}),(0,n.jsxs)("p",{className:"mt-2 text-lg font-semibold text-gray-900",children:["\xa3",e.price]})]},e.id))})]})]})]})}},9589:(e,t,r)=>{"use strict";r.d(t,{k5:()=>d});var n=r(2115),s={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=n.createContext&&n.createContext(s),i=["attr","size","title"];function o(){return(o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach(function(t){var n,s;n=t,s=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(n))in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function d(e){return t=>n.createElement(m,o({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,r)=>n.createElement(t.tag,c({key:r},t.attr),e(t.child)))}(e.child))}function m(e){var t=t=>{var r,{attr:s,size:a,title:l}=e,d=function(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}(e,i),m=a||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,s,d,{className:r,style:c(c({color:e.color||t.color},t.style),e.style),height:m,width:m,xmlns:"http://www.w3.org/2000/svg"}),l&&n.createElement("title",null,l),e.children)};return void 0!==a?n.createElement(a.Consumer,null,e=>t(e)):t(s)}}},e=>{var t=t=>e(e.s=t);e.O(0,[422,396,441,517,358],()=>t(5180)),_N_E=e.O()}]);