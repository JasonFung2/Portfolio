import { useState } from "react";
import cv from "../components/cv.json";

const useFormData = () => {
  const [formData, setFormData] = useState(cv);

  return [formData, setFormData];
};

export default useFormData;
