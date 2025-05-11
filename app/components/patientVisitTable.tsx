"use client";

import { useEffect, useMemo, useState } from "react";
import { PaginatedResponse } from "../lib/types/paginatedResponse";
import { PatientVisit } from "../lib/types/patientVisits";
import { patientVisits } from "../lib/api/api";
import {
  addToast,
  Button,
  ButtonGroup,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Calendar, User } from "lucide-react";

const PatientVisitTable = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<PaginatedResponse<PatientVisit>>(
    {} as PaginatedResponse<PatientVisit>
  );

  const columns = [
    { name: "MR Number", id: 1 },
    { name: "Patient Name", id: 2 },
    { name: "Date of Birth", id: 3 },
    { name: "Visit Date", id: 4 },
    { name: "Reason", id: 5 },
  ];

  useEffect(() => {
    setIsLoading(true);
    patientVisits(page)
      .then((response) => setPatients(response))
      .catch((error) =>
        addToast({
          title: "Error Fetching Patients Data!!!",
          description: error.data,
          color: "danger",
          timeout: 1500,
        })
      )
      .finally(() => setIsLoading(false));
  }, [page]);

  const topContent = useMemo(() => {
    return (
      <div className="flex items-center gap-2 py-4">
        <Calendar className="text-blue-500" />
        <p className="text-xl text-gray-700 font-bold">Patient Visits</p>
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-row-reverse px-12 py-4">
        <ButtonGroup>
          <Button
            size="lg"
            radius="sm"
            className="bg-blue-500 text-white"
            isDisabled={!patients.next}
            isLoading={isLoading}
            onPress={() => setPage(state => state + 1)}
          >
            Next
          </Button>
          <Divider orientation="vertical" />
          <Button
            size="lg"
            radius="sm"
            className="bg-blue-500 text-white"
            isDisabled={!patients.previous}
            isLoading={isLoading}
            onPress={() => setPage(state => state - 1)}
          >
            Previous
          </Button>
        </ButtonGroup>
      </div>
    );
  }, [isLoading, patients.next, patients.previous]);

  return (
    <Table
      radius="sm"
      topContent={topContent}
      bottomContent={patients && (patients.next || patients.previous) && bottomContent}
      classNames={{
        base: 'max-h-[520px]',
        th: "bg-tranperant border-b border-t border-gray-400 text-gray-700",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.id}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={patients.results}
        emptyContent="No patient records found!"
      >
        {patients.results
          ?.map((patient, idx) =>
            patient.visits?.map((p_visit, p_idx) => (
              <TableRow key={`${idx}-${p_idx}`}>
                <TableCell>{patient.mr_number}</TableCell>
                <TableCell className="inline-flex items-center gap-1">
                  <User className="h-6 w-6 text-gray-700" />
                  {patient.first_name} {patient.last_name}
                </TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{p_visit.visited_date}</TableCell>
                <TableCell>{p_visit.reason}</TableCell>
              </TableRow>
            ))
          )
          .flat()}
      </TableBody>
    </Table>
  );
};

export default PatientVisitTable;
