import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import cv from "./cv.json";

function HomePage() {
  const [formData, setFormData] = useState(cv);
  const cvRef = useRef();

  const handleInputChange = (e, path) => {
    const { value } = e.target;
    const keys = path.split(".");
    const newFormData = { ...formData };

    let current = newFormData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setFormData(newFormData);
  };

  const renderFormFields = (data, path = "") => {
    return Object.entries(data).map(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{formatKey(key)}</h3>
            {renderFormFields(value, newPath)}
          </div>
        );
      }

      return (
        <div key={key} className="mb-4">
          <Label htmlFor={newPath} className="block mb-1">{formatKey(key)}</Label>
          {typeof value === "string" ? (
            <Input
              id={newPath}
              name={newPath}
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e, newPath)}
              placeholder={`Enter your ${formatKey(key)}`}
              className="w-full"
            />
          ) : typeof value === "number" ? (
            <Input
              id={newPath}
              name={newPath}
              type="number"
              value={value}
              onChange={(e) => handleInputChange(e, newPath)}
              placeholder={`Enter your ${formatKey(key)}`}
              className="w-full"
            />
          ) : (
            <Textarea
              id={newPath}
              name={newPath}
              value={value}
              onChange={(e) => handleInputChange(e, newPath)}
              placeholder={`Enter your ${formatKey(key)}`}
              className="w-full min-h-[100px]"
            />
          )}
        </div>
      );
    });
  };

  const renderCVData = (data) => {
    return Object.entries(data).map(([section, content]) => (
      <div key={section} className="border-b border-gray-300 pb-4 mb-4">
        <h3 className="text-2xl font-semibold mb-2">{formatKey(section)}</h3>
        {typeof content === 'object' && content !== null ? (
          Object.entries(content).map(([key, value]) => (
            <div key={key} className="mb-2">
              {typeof value === 'object' && value !== null ? (
                <div className="ml-4">{renderCVData(value)}</div>
              ) : (
                <p><strong>{formatKey(key)}:</strong> {value || "N/A"}</p>
              )}
            </div>
          ))
        ) : (
          <p>{content || "N/A"}</p>
        )}
      </div>
    ));
  };

  const formatKey = (key) => {
    return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Form Section */}
      <div className="p-8 md:p-12 flex flex-col justify-start overflow-auto border-r border-gray-300">
        <h2 className="text-3xl font-bold mb-4">Edit CV Information</h2>
        <form className="space-y-6">
          {renderFormFields(formData)}
          <Button type="button" onClick={() => console.log(formData)} className="mt-4">
            Log Data
          </Button>
        </form>
      </div>

      {/* CV Display Section */}
      <div className="flex flex-col justify-start overflow-auto">
        <div className="p-8 md:p-12 space-y-2" ref={cvRef}>
          <div className="mb-4">
            <h1 className="name font-semibold text-center m-0 leading-none">{formData?.full_name || "N/A"}</h1>
            <h6 className="text-sm mb-2 font-semibold text-center m-0 leading-none">{formData?.current_role || "N/A"}</h6>
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
                        <span className="font-semibold mt-1 leading-tight">{exp.company_name || "N/A"}</span> - {exp.location || "N/A"}
                      </span>
                      <span className="text-cv">
                        {exp.date_start || "N/A"} - {exp.date_end || "N/A"}
                      </span>
                    </p>
                    <p className="text-cv m-0 mb-1 leading-tight">{exp.role_name || "N/A"}</p>
                    <ul className="list-inside pl-3 m-0 leading-tight">
                      {exp.bullet_points && exp.bullet_points.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-cv text-sm list-disc leading-tight">
                          {bullet || "N/A"}
                        </li>
                      ))}
                    </ul>

                  </div>
                ))}

                {sectionKey === 'education' && sectionValue.map((edu, index) => (
                  <div key={index} className="mb-2">

                    <p className="text-cv m-0 flex justify-between items-center leading-tight">
                      <span>
                        <span className="font-semibold leading-tight"> {edu.university_name || "N/A"}</span> - {edu.location || "N/A"}
                      </span>
                      <span className="text-cv">
                        {edu.date_start || "N/A"} - {edu.date_end || "N/A"}
                      </span>
                    </p>
                    <p className="text-cv leading-tight">{edu.degree_name || "N/A"}, GPA: {edu.gpa || "N/A"}</p>
                  </div>
                ))}

                {sectionKey === 'projects' && sectionValue.map((project, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-cv m-0 flex justify-between items-center leading-tight">
                      <span>
                        <span className="font-semibold mt-1 leading-tight">{project.project_name || "N/A"}</span>
                      </span>
                    </p>
                    <p className="text-cv leading-tight">{project.description || "N/A"}</p>
                    {Object.entries(project).filter(([key, value]) => Array.isArray(value)).map(([skillCategory, skillList]) => (
                      <div key={skillCategory}>
                        <p className="text-cv leading-tight">
                          <span className="leading-tight">{skillCategory}:</span> <span>{skillList.join(", ") || "N/A"}</span>
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
                      <span className="font-semibold leading-tight">{skillCategory}:</span> {skillList.join(", ") || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}


          <div>
            <p className="text-sm underline-across tracking-wider leading-tight">REFERENCES</p>
            <hr />
            <p className="text-cv mb-1">{formData?.references || "N/A"}</p>
          </div>
        </div>
      </div>


      <a href="/cv"><Button type="button" className="mt-4">
        Go to Preview
      </Button></a>
    </div>
  );
}

export default HomePage;
