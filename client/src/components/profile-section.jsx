import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, MapPin, Globe2 } from "lucide-react"
import cv from "./cv.json";
import { useState } from "react";

export function ProfileSection() {
  const [formData, setFormData] = useState(cv);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-white">{formData.full_name}</h1>
          <p className="text-sm">I'm a {formData.current_role}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Globe2 className="h-4 w-4" />
              <span>{formData.languages}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{formData.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <a href="/cv" className="flex-1">
          <Button className="w-full text-white">My Resume</Button>
        </a>
        <a
          href="https://github.com/JasonFung2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
        </a>
      </div>

    </div>
  )
}

