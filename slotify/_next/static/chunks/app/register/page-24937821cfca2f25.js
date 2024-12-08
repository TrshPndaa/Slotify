(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[454],{6123:(e,s,r)=>{Promise.resolve().then(r.bind(r,5659))},5659:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>o});var t=r(5155),a=r(2115);function o(){let[e,s]=(0,a.useState)({businessName:"",ownerName:"",email:"",password:"",confirmPassword:"",businessType:"salon",phoneNumber:""}),[r,o]=(0,a.useState)({}),[i,n]=(0,a.useState)(!1),l=e=>{let{name:r,value:t}=e.target;s(e=>({...e,[r]:t}))},d=async s=>{s.preventDefault(),n(!0);let r={};if(e.businessName||(r.businessName="Business name is required"),e.ownerName||(r.ownerName="Owner name is required"),e.email||(r.email="Email is required"),e.password||(r.password="Password is required"),e.password!==e.confirmPassword&&(r.confirmPassword="Passwords do not match"),o(r),0===Object.keys(r).length)try{await new Promise(e=>setTimeout(e,1e3)),console.log("Form submitted:",e),window.location.href="/dashboard"}catch(e){console.error("Registration error:",e)}n(!1)};return(0,t.jsxs)("div",{className:"min-h-screen bg-white relative",children:[(0,t.jsx)("div",{className:"absolute top-[-50px] right-[20px] w-[120px] h-[120px] rounded-full bg-pink-300/80"}),(0,t.jsx)("div",{className:"absolute top-[100px] right-[120px] w-[80px] h-[80px] rounded-full bg-pink-300/80"}),(0,t.jsxs)("main",{className:"flex flex-col items-center justify-center px-4 py-12 relative z-10",children:[(0,t.jsx)("h1",{className:"text-4xl font-semibold tracking-tight text-gray-900 mb-8",children:"Register with Slotify"}),(0,t.jsxs)("form",{onSubmit:d,className:"w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"businessName",className:"block text-sm font-medium text-gray-700 mb-1",children:"Business Name"}),(0,t.jsx)("input",{type:"text",id:"businessName",name:"businessName",value:e.businessName,onChange:l,placeholder:"Enter your business name",className:"mt-1 text-black block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-150 text-white placeholder-white"}),r.businessName&&(0,t.jsx)("p",{className:"mt-2 text-sm text-red-600",children:r.businessName})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"ownerName",className:"block text-sm font-medium text-gray-700 mb-1",children:"Owner Name"}),(0,t.jsx)("input",{type:"text",id:"ownerName",name:"ownerName",value:e.ownerName,onChange:l,placeholder:"Enter owner's name",className:"mt-1 text-black block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-150 text-white placeholder-white"}),r.ownerName&&(0,t.jsx)("p",{className:"mt-2 text-sm text-red-600",children:r.ownerName})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"businessType",className:"block text-sm font-medium text-gray-700 mb-1",children:"Business Type"}),(0,t.jsxs)("select",{id:"businessType",name:"businessType",value:e.businessType,onChange:l,className:"mt-1 text-black block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-150 text-white",children:[(0,t.jsx)("option",{value:"salon",children:"Salon"}),(0,t.jsx)("option",{value:"spa",children:"Spa"}),(0,t.jsx)("option",{value:"fitness",children:"Fitness Studio"}),(0,t.jsx)("option",{value:"medical",children:"Medical Practice"}),(0,t.jsx)("option",{value:"other",children:"Other"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),(0,t.jsx)("input",{type:"email",id:"email",name:"email",value:e.email,onChange:l,placeholder:"your@email.com",className:"mt-1 text-black block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-150 text-white placeholder-white"}),r.email&&(0,t.jsx)("p",{className:"mt-2 text-sm text-red-600",children:r.email})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"phoneNumber",className:"block text-sm font-medium text-gray-700 mb-1",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",id:"phoneNumber",name:"phoneNumber",value:e.phoneNumber,onChange:l,placeholder:"(123) 456-7890",className:"mt-1 text-black block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-150 text-white placeholder-white"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 mb-1",children:"Password"}),(0,t.jsx)("input",{type:"password",id:"password",name:"password",value:e.password,onChange:l,placeholder:"Enter your password",className:"mt-1 text-black block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-150 text-white placeholder-white"}),r.password&&(0,t.jsx)("p",{className:"mt-2 text-sm text-red-600",children:r.password})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700 mb-1",children:"Confirm Password"}),(0,t.jsx)("input",{type:"password",id:"confirmPassword",name:"confirmPassword",value:e.confirmPassword,onChange:l,placeholder:"Confirm your password",className:"mt-1 text-black block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-150 text-white placeholder-white"}),r.confirmPassword&&(0,t.jsx)("p",{className:"mt-2 text-sm text-red-600",children:r.confirmPassword})]}),(0,t.jsx)("button",{type:"submit",disabled:i,className:"w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 transition duration-150 mt-8",children:i?"Registering...":"Register"})]})]})]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[441,517,358],()=>s(6123)),_N_E=e.O()}]);