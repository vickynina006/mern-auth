// const OtpForm = ({
//   onPaste,
//   onSubmit,
//   title,
//   description,
//   buttonText,
//   ...props
// }) => {
//   return (
//     <div className="min-h-screen bg-gray-400">
//       {" "}
//       <div className="flex justify-center px-10 py-20">
//         <div className="w-full p-8 rounded-lg flex-col space-y-8 items-center bg-slate-900 md:p-10 md:w-[50%] lg:w-[30%]">
//           <div className="flex flex-col items-center gap-2">
//             <h1 className="font-bold text-2xl max-w-full">{title}</h1>
//             <p className="text-center text-slate-300">{description}</p>
//           </div>
//           <form onSubmit={onSubmit} className="gap-5 flex flex-col w-full">
//             <div className="flex justify-center gap-2 w-full" onPaste={onPaste}>
//               {Array(6)
//                 .fill(0)
//                 .map((_, i) => (
//                   <input
//                     key={i}
//                     type="text"
//                     maxLength={1}
//                     required
//                     {...props}
//                     className=" bg-slate-700 rounded-sm w-7 h-7 text-center md:w-10 md:h-10"
//                   />
//                 ))}
//             </div>

//             <button className="bg-linear-to-r from-amber-500 to-amber-700 text-white py-1.5 px-8 rounded-full">
//               {buttonText}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpForm;
