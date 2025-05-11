import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const uploadPatientFiles = async (files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("files", file));

  try {
    const url = `${API_BASE_URL}/patient/bulk_upload/`;
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error while uploading patient files", error);
    throw error;
  }
};

export const patientVisits = async (page: number) => {
  try {
    const url = `${API_BASE_URL}/patients/?page=${page}`
    const response = await axios.get(url, {headers: {'Content-Type': 'application/json'}})
    return response.data
  } catch (error) {
    console.log("Error fetching patient records!")
    throw error;
  }
}
