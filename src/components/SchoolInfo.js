import React from 'react';
import schoolData from '../data/schoolData.js'
//schoolInfo Component Template
function SchoolInfo({
    schoolName,
    centerName,
    centerInfo,
    email,
    phone,
    appointmentInfo,
    link
}) {
    return (
        <div className="InfoSections">
            <h1>{schoolName}</h1>
            <h2>{centerName}</h2>
            <h2>{centerInfo}</h2>
            <h2>
                <a href={`mailto:${email}`}>{email}</a>
            </h2>
            <a href={link} target="_blank"><p>More Info</p></a>
            <h2>{phone}</h2>
            <h2>{appointmentInfo}</h2>
            
        </div>
    );
}

//creating all schoolInfo component from data
export const renderSchoolInfo = (sortedSchools) => {
    return sortedSchools.map((data, index) => (<SchoolInfo
        key={index}
        schoolName={data.schoolName}
        centerName={data.centerName}
        centerInfo={data.centerInfo}
        email={data.email}
        phone={data.phone}
        appointmentInfo={data.appointmentInfo}
        link={data.link}/>));
};

export default SchoolInfo;