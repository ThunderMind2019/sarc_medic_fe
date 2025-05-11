interface Visit {
  visited_date: string;
  reason: string;
}

export interface PatientVisit {
  id: number;
  mr_number: number;
  first_name: string;
  last_name: string;
  dob: string;
  visits: Visit[];
}
