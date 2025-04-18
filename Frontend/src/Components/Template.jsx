// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import t1 from "../assets/T1.png";
// import t2 from "../assets/T2.png";
// import t3 from "../assets/T3.png";
// import t4 from "../assets/T4.png";
// import t5 from "../assets/T5.png";


// const Template = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const navigate = useNavigate();

//   const templates = [
//   { id: 1, image: t1 },
//   { id: 2, image: t2 },
//   { id: 3, image: t3 },
//   { id: 4, image: t4 },
//   { id: 5, image: t5 }
//   ];

//   const handleProceed = () => {
//     if (selectedTemplate) {
//       navigate(`/template${selectedTemplate}`);
//     }
//   };

//   return (
//     <div className="pt-20 p-8"> {/* Adjusted padding-top to make space for navbar */}
//       <h2 className="text-2xl font-bold mb-4">Select a Resume Template</h2>
//       <div className="grid grid-cols-3 gap-6">
//         {templates.map((template) => (
//           <div
//             key={template.id}
//             className={`border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105 ${
//               selectedTemplate === template.id ? "border-blue-500" : ""
//             }`}
//             onClick={() => setSelectedTemplate(template.id)}
//           >
//             <img
//               src={template.image}
//               alt={`Template ${template.id}`}
//               className="w-[250px] h-[350px] object-cover rounded"
//             />
//           </div>
//         ))}
//       </div>
//       {selectedTemplate && (
//         <div className="mt-6">
//           <button
//             className="bg-black text-white px-6 py-3 rounded-lg"
//             onClick={handleProceed}
//           >
//             Proceed with Template {selectedTemplate}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Template;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import t1 from "../assets/T4.png";
import t2 from "../assets/T2.png";
import t3 from "../assets/T3.png";
import t4 from "../assets/T6.png";
import t5 from "../assets/T5.png";

const Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const templates = [
    { id: 1, image: t1 },
    { id: 2, image: t2 },
    { id: 3, image: t3 },
    { id: 4, image: t4 },
    { id: 5, image: t5 }
  ];

  const handleProceed = () => {
    if (selectedTemplate) {
      navigate(`/template${selectedTemplate}`);
    }
  };

  return (
    <div className="pt-20 p-8 max-w-4xl mx-auto"> {/* Adjusted width to be shorter */}
      <h2 className="text-2xl font-bold mb-4 text-center">Select a Resume Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105 ${
              selectedTemplate === template.id ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <img
              src={template.image}
              alt={`Template ${template.id}`}
              className="w-[250px] h-[350px] object-cover rounded"
            />
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="mt-6 text-center">
          <button
            className="bg-black text-white px-6 py-3 rounded-lg"
            onClick={handleProceed}
          >
            Proceed with Template {selectedTemplate}
          </button>
        </div>
      )}
    </div>
  );
};

export default Template;
