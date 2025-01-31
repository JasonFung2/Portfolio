import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useFormData from "@/hooks/getCvData"
import * as imgs from "./assets"

export function Skills() {
  const [formData] = useFormData()

  const cleanedLanguages = formData.skills.Languages.map((language) =>
    language
      .replace(/#/g, "Sharp")          // Replace "#" with "Sharp"
      .replace(/\+\+/g, "PlusPlus")    // Replace "++" with "PlusPlus"
      .replace(/\./g, "")              // Remove all dots
  );
  const cleanedTech = formData.skills["Technologies & Tools"].map((tech) =>
    tech
      .replace(/\./g, "")              // Remove all dots
      .replace(/ReactJS/g, "ReactJS")  // React.JS to ReactJS
      .replace(/NodeJS/g, "NodeJS")    // Node.JS to NodeJS
      .replace(/\s+/g, "") 
  );
  
  const allSkills = [...cleanedLanguages, ...cleanedTech]

  return (
    <Card className="h-full text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">My Tech Stack</CardTitle>
        <p className="text-sm text-gray-400">My favorite tech stack I use on various projects</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <TooltipProvider>
          {allSkills.map((skill, index) => {
            const Component = imgs.default[skill];
            return (
            <Tooltip key={index} delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center rounded-lg border border-gray-800 p-3 h-20">
                {Component ? <Component /> : <span>❌</span>}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5} className="bg-gray-800 text-white">
                <p>{skill}</p>
              </TooltipContent>
            </Tooltip>
      )})}
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}