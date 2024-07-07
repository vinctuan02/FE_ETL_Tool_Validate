// import React, { useState } from 'react'
// import TableReports from '../../components/TableReports/TableReports'
// import ModalReport from '../../components/ModalReport/ModalReport'
// import TableReact from '../../components/TableReact/TableReact'
// import TableTest from '../../components/TableTest/TableTest'

// import './OtherPage.scss'
// import CompareComponent from '../../components/CompareComponent/CompareComponent'

// const OtherPage = () => {

//     const [selectedButton, setSelectedButton] = useState('compare');

//     const DataComponent = () => <div>Data Component</div>;
//     const DescribeComponent = () => <div>Describe Component</div>;

//     const handleButtonClick = (buttonName) => {
//         setSelectedButton(buttonName);
//     };

//     return (
//         <div className='container-report-info'>
//             <div className='nav-info'>
//                 <button
//                     className={`btn-info1 btn ${selectedButton === 'compare' ? 'btn-primary' : ''}`}
//                     onClick={() => handleButtonClick('compare')}
//                 >
//                     Compare
//                 </button>
//                 <button
//                     className={`btn-info1 btn ${selectedButton === 'data' ? 'btn-primary' : ''}`}
//                     onClick={() => handleButtonClick('data')}
//                 >
//                     Data
//                 </button>
//                 <button
//                     className={`btn-info1 btn ${selectedButton === 'describe' ? 'btn-primary' : ''}`}
//                     onClick={() => handleButtonClick('describe')}
//                 >
//                     Describe
//                 </button>
//             </div>
//             <div className='body-info'>
//                 {/* <TableTest /><div> */}
//                 {selectedButton === 'compare' && <CompareComponent />}
//                 {selectedButton === 'data' && <DataComponent />}
//                 {selectedButton === 'describe' && <DescribeComponent />}
//             </div>
//             {/* </div> */}
//         </div>
//     )
// }

// export default OtherPage

import React from 'react'

const OtherPage = () => {
    return (
        <div>

        </div>
    )
}

export default OtherPage

