import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, CalendarIcon } from "lucide-react"

import cv from "./cv.json";
import { useState } from "react";


export function WorkExperience() {
  const [formData] = useState(cv);

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-500 dark:border-gray-300">
          {formData.experience.map((experience, index) => (
            <li key={index} className="mb-10 ml-5">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                {experience.date_start || "N/A"} - {experience.date_end || "N/A"}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{experience.role_name}</h3>
              <Badge className="mt-1">
                <BriefcaseIcon className="w-3 h-3 mr-1" />
                {experience.company_name}
              </Badge>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 mt-2 mb-2">
                {experience.short_description}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

