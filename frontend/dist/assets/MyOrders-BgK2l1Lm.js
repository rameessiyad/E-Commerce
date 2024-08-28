import{r as a,j as e,B as x}from"./index-DFFnt1R-.js";const o=()=>{const[r,c]=a.useState([]),d=async()=>{try{const t=await fetch(`${x}/order/my-orders`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});if(!t.ok)throw new Error("Failed to fetch orders");const s=await t.json();c(s.orders),console.log(r)}catch(t){console.error("Error fetching orders:",t)}};return a.useEffect(()=>{d()},[]),e.jsxs("div",{className:"max-w-7xl mx-auto p-4",children:[e.jsx("h2",{className:"text-3xl font-medium text-center my-8",children:"My Orders"}),r.length===0?e.jsx("div",{className:"h-72",children:e.jsx("p",{className:"text-center text-3xl text-priamry font-bold",children:"No orders found."})}):e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full bg-white border border-gray-200",children:[e.jsx("thead",{className:"bg-gray-100",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left px-6 py-3 font-medium text-primary",children:"Product Image"}),e.jsx("th",{className:"text-left px-6 py-3 font-medium text-primary",children:"Product Name"}),e.jsx("th",{className:"text-left px-6 py-3 font-medium text-primary",children:"Quantity"}),e.jsx("th",{className:"text-left px-6 py-3 font-medium text-primary",children:"Price"}),e.jsx("th",{className:"text-left px-6 py-3 font-medium text-primary",children:"Address"}),e.jsx("th",{className:"text-left px-6 py-3 font-medium text-primary",children:"Status"})]})}),e.jsx("tbody",{children:r.map(t=>t.items.map((s,l)=>e.jsxs("tr",{className:"border-b border-gray-200",children:[e.jsx("td",{className:"px-6 py-4",children:e.jsx("img",{src:s.image,alt:"image",className:"w-12 h-12 object-cover rounded"})}),e.jsx("td",{className:"px-6 py-4 text-gray-700",children:s.name}),e.jsx("td",{className:"px-6 py-4 text-gray-700",children:s.quantity}),e.jsxs("td",{className:"px-6 py-4 text-gray-700",children:["₹ ",s.price]}),e.jsx("td",{className:"px-6 py-4 text-gray-700",children:t.shippingAddress.town}),e.jsx("td",{className:"px-6 py-4 text-gray-700 font-semibold",children:t.status})]},l)))})]})})]})};export{o as default};