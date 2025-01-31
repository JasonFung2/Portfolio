import { Card, CardContent } from "@/components/ui/card";
import cv from "./cv.json";
import { useState, useEffect } from "react";
import * as imgs from "../../public"
import AngularIcon from "../../public";
import React from "react";
const GITHUB_API_URL = "https://api.github.com/users/JasonFung2/repos";

export function Stats() {
  const [formData, setFormData] = useState(cv);
  const [timeSinceLastCommit, setTimeSinceLastCommit] = useState<string | null>("Fetching...");
  const [commitDate, setCommitDate] = useState<number | null>(null);
  console.log(imgs)
  const calculateExperience = (experience: any[]) => {
    let totalMonths = 0;

    experience.forEach((job) => {
      const startDate = new Date(job.date_start);
      const endDate = job.date_end === "Present" ? new Date() : new Date(job.date_end);

      const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      totalMonths += months;
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return { years, months };
  };

  const fetchLastCommitDate = async () => {
    console.log("Fetching GitHub commit data...");
  
    try {
      const response = await fetch(GITHUB_API_URL);
      const repos = await response.json();
  
      const commitsPromises = repos.map(async (repo: any) => {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`
        );
        const commits = await commitsResponse.json();
        return commits[0]?.commit.committer.date;
      });
  
      const commitsDates = await Promise.all(commitsPromises);
  
      const validCommitDates = commitsDates.filter((date) => date);
      if (validCommitDates.length > 0) {
        const latestCommitDate = new Date(
          Math.max(...validCommitDates.map((date) => new Date(date).getTime()))
        );
  
        const currentTimestamp = new Date().getTime();
        const timeDifference = currentTimestamp - latestCommitDate.getTime();
  
        const days = Math.floor(timeDifference / (1000 * 3600 * 24));
        const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
        const timeSinceLastCommit = `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
  
        localStorage.setItem(
          "lastCommitData",
          JSON.stringify({
            time: timeSinceLastCommit,
            commitDate: latestCommitDate.getTime(),
          })
        );
  
        setTimeSinceLastCommit(timeSinceLastCommit);
        setCommitDate(latestCommitDate.getTime());
        console.log("Latest commit date:", latestCommitDate);
      } else {
        setTimeSinceLastCommit("No commits found");
        console.log("No commits found");
      }
    } catch (error) {
      console.error("Error fetching commits:", error);
      setTimeSinceLastCommit("Error fetching commits");
    }
  };
  
  useEffect(() => {
    fetchLastCommitDate();
    const intervalId = setInterval(() => {
      fetchLastCommitDate();
    }, 150000);

    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    if (commitDate) {
      const timerInterval = setInterval(() => {
        const currentTimestamp = new Date().getTime();
        const timeDifference = currentTimestamp - commitDate;

        const days = Math.floor(timeDifference / (1000 * 3600 * 24));
        const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const timeSinceLastCommit = `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
        setTimeSinceLastCommit(timeSinceLastCommit);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [commitDate]);

  const { years, months } = calculateExperience(formData.experience);

  const stats = [
    {
      number: formData.projects.length,
      label: "Projects",
      img: "projects"

    },
    {
      number: timeSinceLastCommit || "Fetching...",
      label: "Time since last commit",
      img: "commit",
    },
    {
      number: `${years} years ${months} months`,
      label: "Experience",
      img: "experience"
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="text-3xl"><AngularIcon />{`${imgs.default}`}</div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.number}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
              {stat.subtitle && <p className="text-sm text-gray-400">{stat.subtitle}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
