"use client";

import { Tab, Tabs } from "@heroui/react";
import FileUpload from "./components/fileUpload";
import PatientVisitTable from "./components/patientVisitTable";

const Home = () => {
  return (
    <div className="min-h-screen space-y-4 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <p className="text-gray-700">
          View and manage patient information and visits
        </p>
      </div>
      <Tabs classNames={{ panel: "py-8" }}>
        <Tab key={"patients"} title="Patient Visits">
          <PatientVisitTable />
        </Tab>
        <Tab key={"file-upload"} title="File Upload">
          <div className="p-6 bg-white rounded-lg border border-gray-200 space-y-4">
            <h2 className="text-lg font-semibold">Upload Patient Files</h2>
            <p className="text-gray-700">Select multiple files to upload to the patient records</p>
            <FileUpload />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
