import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf'; // Import jsPDF
import html2canvas from 'html2canvas'; // Import html2canvas

import cv from './cv.json';

// Component to print
const CVPrint = React.forwardRef((props, ref) => {
  const { formData } = props;

  return (
    <div className="flex flex-col justify-start overflow-auto">
      <div className="" ref={ref}>
        <div className="mb-4">
          <h1 className="name font-semibold text-center m-0 leading-none">{formData?.full_name || 'N/A'}</h1>
          <h6 className="text-sm mb-2 font-semibold text-center m-0 leading-none">{formData?.current_role || 'N/A'}</h6>
          {formData.information && (
              <div className="text-sm text-center text-blue-500">
                {Object.entries(formData.information)
                  .map(([key, value]) => {
                    const isEmail = key === 'email_address';
                    const formattedValue = value || 'N/A';

                    return isEmail ? (
                      <a
                        key={key}
                        href={`mailto:${formattedValue}`}
                        className="underline"
                      >
                        {formattedValue}
                      </a>
                    ) : (
                      <a
                        key={key}
                        href={formattedValue.startsWith('http') ? formattedValue : '#'}
                        className="underline"
                      >
                        {formattedValue}
                      </a>
                    );
                  })
                  .reduce((prev, curr) => [
                    prev,
                    <span key={Math.random()} className="text-black px-2">•</span>, // Black separator
                    curr,
                  ])}
              </div>
            )}
        </div>

        {Object.entries(formData).map(([sectionKey, sectionValue]) => {
          if (!Array.isArray(sectionValue)) return null; // Skip non-array data

          const sectionTitle = sectionKey.replace(/_/g, ' ').toUpperCase(); // Convert key to title format

          return (
            <div key={sectionKey}>
              <p className="text-sm underline-across tracking-wider">{sectionTitle}</p>
              <hr />
              {sectionKey === 'experience' && sectionValue.map((exp, index) => (
                <div key={index} className="mb-4">
                  <p className="text-cv m-0 flex justify-between items-center m-0 leading-tight">
                    <span>
                      <span className="font-semibold mt-1 leading-tight">{exp.company_name || 'N/A'}</span> - {exp.location || 'N/A'}
                    </span>
                    <span className="text-cv">
                      {exp.date_start || 'N/A'} - {exp.date_end || 'N/A'}
                    </span>
                  </p>
                  <p className="text-cv m-0 mb-1 leading-tight">{exp.role_name || 'N/A'}</p>
                  <ul className="list-inside pl-3 m-0 leading-tight">
                    {exp.bullet_points && exp.bullet_points.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-cv text-sm list-disc leading-tight">
                        {bullet || 'N/A'}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {sectionKey === 'education' && sectionValue.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="text-cv m-0 flex justify-between items-center leading-tight">
                    <span>
                      <span className="font-semibold leading-tight"> {edu.university_name || 'N/A'}</span> - {edu.location || 'N/A'}
                    </span>
                    <span className="text-cv">
                      {edu.date_start || 'N/A'} - {edu.date_end || 'N/A'}
                    </span>
                  </p>
                  <p className="text-cv leading-tight">{edu.degree_name || 'N/A'}, GPA: {edu.gpa || 'N/A'}</p>
                </div>
              ))}

              {sectionKey === 'projects' && sectionValue.map((project, index) => (
                <div key={index} className="mb-2">
                  <p className="text-cv m-0 flex justify-between items-center leading-tight">
                    <span>
                      <span className="font-semibold mt-1 leading-tight">{project.project_name || 'N/A'}</span>
                    </span>
                  </p>
                  <p className="text-cv leading-tight">{project.description || 'N/A'}</p>
                  {Object.entries(project).filter(([key, value]) => Array.isArray(value)).map(([skillCategory, skillList]) => (
                    <div key={skillCategory}>
                      <p className="text-cv leading-tight">
                        <span className="leading-tight">{skillCategory}:</span> <span>{skillList.join(', ') || 'N/A'}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}

        {formData.skills && (
          <div>
            <p className="text-sm underline-across tracking-wider leading-tight">SKILLS</p>
            <hr />
            <div className="mb-2">
              {Object.entries(formData.skills).map(([skillCategory, skillList]) => (
                <div key={skillCategory} className="flex flex-wrap justify-between leading-tight">
                  <p className="text-cv mb-0 leading-tight">
                    <span className="font-semibold leading-tight">{skillCategory}:</span> {skillList.join(', ') || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm underline-across tracking-wider leading-tight">REFERENCES</p>
          <hr />
          <p className="text-cv mb-1">{formData?.references || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
});

const Cv = () => {
  const componentRef = useRef(null);

  const handlePrint = () => {
    html2canvas(componentRef.current, { scale: 2 }).then((canvas) => {
      const doc = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Save the PDF
      doc.save('cv.pdf');
    });
  };

  return (
    <div className="flex items-center justify-center mt-2">
        <CVPrint formData={cv} ref={componentRef} />
      </div>
  );
};

export default Cv;
