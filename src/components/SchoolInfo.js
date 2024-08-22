import React from 'react';

const schoolData = [
  {
    schoolName: "Hostos Community College",
    centerName: "HCC Food Pantry",
    centerInfo: "One Stop Center, Savoy Building, Fl 1 D-101, Bronx, NY 10451",
    email: "mcruz@hostos.cuny.edu",
    phone: "718-518-4141",
    appointmentInfo: "Appointment only",
    link: "mcruz@hostos.cuny.edu"
  },
  {
    schoolName: "Baruch College",
    centerName: "",
    centerInfo: "",
    centerHours: "Summer 2024: Tuesday 10:00 am - 2:00 pm, Wednesday 11:00 am - 2:00 pm",
    email: "deanofstudents@baruch.cuny.edu",
    Phone: "646-312-4570",
    appointmentInfo: "Must be an enrolled CUNY student. Appointment only.",
    link: "https://baruch.az1.qualtrics.com/jfe/form/SV_0fwrpgDtATh3qC2"
  },
  {
    schoolName: "NYC College of Technology (City Tech)",
    centerName: "Yellowjacket N.E.S.T. (Nutrition for Education and Student Achievement) Food Pantry",
    centerInfo: "Location: General Building Room G-516, 300 Jay St, Brooklyn, NY 11201",
    centerHours: "Tuesday 9:00 AM - 12:00 PM, Wednesday 3:00 PM - 6:00 PM, Thursday 12:00 PM - 3:00 PM",
    email: "studentlife@citytech.cuny.edu",
    Phone: "",
    appointmentInfo: "Appointment only",
    link: ""
  },
  {
    schoolName: "Medgar Evers College",
    centerName: "Transition Academy",
    centerInfo: "Location: Transition Academy, Room C-307, 1150 Carroll Street, Brooklyn NY 11225",
    centerHours: "Monday 10:00 am - 2:00 pm, Tuesday 3:00 pm - 7:00 pm, Wednesday 10:00 am - 2:00 pm",
    email: "transitionacademy@mec.cuny.edu",
    Phone: "718-270-6988",
    appointmentInfo: "One visit per week. Community Pantry EVERY LAST TUESDAY of the Month from 3PM-5PM (1638 Bedford Avenue). Mobile Pantry EVERY FIRST FRIDAY from 11AM-1PM (1638 Bedford Avenue). All CUNY Students Are Welcome Every Wednesday.",
    link: "https://www.mec.cuny.edu/student-success/transition-academy/"

  },
  {
    schoolName: "Kingsborough Community College",
    centerName: "Food for Thought",
    centerInfo: "Location: CUNY EDGE office: T4-216, 2001 Oriental Blvd, Brooklyn, NY 11235",
    centerHours: "",
    email: "",
    Phone: "718-368-4660",
    appointmentInfo: "",
    link: "https://www.kbcc.cuny.edu/studres/cunyedge.html"
  },
  {
    schoolName: "Brooklyn College",
    centerName: "Brooklyn College Food Pantry",
    centerInfo: "Location: Student Center, Room 524, 2705 Campus Rd, Brooklyn, NY 11210",
    centerHours: "Tuesday 11:30 am - 4:00 pm, Wednesday 11:30 am - 6:30 pm, Thursday 11:30 am - 3:00 pm",
    email: "civicengagement@brooklyn.cuny.edu, sss@brooklyn.cuny.edu",
    Phone: "718-951-5059",
    appointmentInfo: "Applicants need to complete an intake form. Two visits per month. Valid Brooklyn College ID is required. Appointment recommended or walk-in allowed.",
    link: "http://brooklyn.cuny.edu/web/about/offices/studentaffairs/student-support-services/food-pantry.php"

  },
  {
    schoolName: "Lehman College",
    centerName: "Lehman Pantry",
    centerInfo: "Student Life Building 120",
    centerHours: "",
    email: "food.bank@lehman.cuny.edu",
    Phone: "718-960-8535 (Office Manager)",
    appointmentInfo: "",
    link: "https://www.lehman.edu/student-affairs/basic-needs-center/lehman-food-bank.php"

  }
];

function SchoolInfo({ schoolName, centerName, centerInfo, email, phone, appointmentInfo, link }) {
  return (
    <div className="InfoSections">
      <h1>{schoolName}</h1>
      <h2>{centerName}</h2>
      <h2>{centerInfo}</h2>
      <h2><a href={`mailto:${link}`}>{email}</a></h2>
      <h2>{phone}</h2>
      <h2>{appointmentInfo}</h2>
    </div>
  );
}

export const renderSchoolInfo = () => {
  return schoolData.map((data, index) => (
    <SchoolInfo 
      key={index}
      schoolName={data.schoolName}
      centerName={data.centerName}
      centerInfo={data.centerInfo}
      email={data.email}
      phone={data.phone}
      appointmentInfo={data.appointmentInfo}
      link={data.link}
    />
  ));
};

export default SchoolInfo;