import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, Code2 } from "lucide-react";
import useFormData from "@/hooks/getCvData";
export function Education() {
  const [formData, setFormData] = useFormData();

  return (
    <Card className="h-full text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {formData.education.map((edu) => (
          <div key={edu.title} className="flex items-start gap-4 ">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-white">
                  {edu.university_name} - {edu.location}
                </p>
                <span className="text-sm text-gray-400">
                  {edu.date_start} - {edu.date_end}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">{edu.degree_name}</p>
              <p className="mt-1 text-sm text-gray-400">GPA: {edu.gpa}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
