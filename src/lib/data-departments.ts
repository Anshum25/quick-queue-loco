
import { Department } from "./types";

// Sample departments for hospitals
export const hospitalDepartments: Department[] = [
  {
    id: "dept-1",
    name: "General Medicine",
    waitTime: 35,
    queueLength: 12,
    description: "General consultations and primary care",
    active: true
  },
  {
    id: "dept-2",
    name: "Cardiology",
    waitTime: 45,
    queueLength: 8,
    description: "Heart-related diagnoses and treatments",
    active: true
  },
  {
    id: "dept-3",
    name: "Orthopedics",
    waitTime: 25,
    queueLength: 5,
    description: "Bone and joint related care",
    active: true
  },
  {
    id: "dept-4",
    name: "Neurology",
    waitTime: 60,
    queueLength: 15,
    description: "Nervous system disorders",
    active: true
  },
  {
    id: "dept-5",
    name: "Pediatrics",
    waitTime: 20,
    queueLength: 7,
    description: "Child healthcare services",
    active: true
  },
  {
    id: "dept-6",
    name: "Dermatology",
    waitTime: 30,
    queueLength: 10,
    description: "Skin related issues",
    active: true
  },
  {
    id: "dept-7",
    name: "Ophthalmology",
    waitTime: 40,
    queueLength: 9,
    description: "Eye care services",
    active: true
  },
  {
    id: "dept-8",
    name: "Dental",
    waitTime: 15,
    queueLength: 4,
    description: "Dental care and procedures",
    active: true
  },
  {
    id: "dept-9",
    name: "Radiology",
    waitTime: 10,
    queueLength: 2,
    description: "Imaging and diagnostics",
    active: true
  },
  {
    id: "dept-10",
    name: "Emergency",
    waitTime: 15,
    queueLength: 6,
    description: "Emergency services",
    active: true
  }
];

// Mapping of hospital IDs to departments
export const hospitalDepartmentMapping: Record<string, string[]> = {
  "hosp-1": ["dept-1", "dept-2", "dept-3", "dept-4", "dept-10"],
  "hosp-2": ["dept-1", "dept-5", "dept-6", "dept-7", "dept-8", "dept-10"],
  "hosp-3": ["dept-1", "dept-2", "dept-9", "dept-10"]
};

// Function to get departments for a specific hospital
export const getDepartmentsForHospital = (hospitalId: string): Department[] => {
  const departmentIds = hospitalDepartmentMapping[hospitalId] || [];
  return departmentIds.map(id => 
    hospitalDepartments.find(dept => dept.id === id)
  ).filter((dept): dept is Department => dept !== undefined);
};
