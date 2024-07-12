// import React, { useContext, useEffect, useState } from 'react'
// import './OtherPage.scss'
// import { AppContext } from '../../context/AppContext';
// import Find from '../../components/FilterSubComponent/Sub1/Find';

// const OtherPage = () => {

//     const { handleOpenModalReport, currentSelect, arrDataSelectInput, setCurrentSelectTB } = useContext(AppContext)

//     const [selectedButton, setSelectedButton] = useState('sub1')
//     // const [isShowModalReport, setIsShowModalReport] = useState(false)

//     // const [reportDetailsCurrent, setReportDetailsCurrent] = useState('')


//     // useEffect(() => {
//     //     if (reportDetailsCurrent) {
//     //         console.log(reportDetailsCurrent);
//     //     }
//     // }, [reportDetailsCurrent])

//     const DescribeComponent = () => <div>Describe Component</div>;

//     const handleButtonClick = (buttonName) => {
//         setSelectedButton(buttonName);
//     };



//     return (
//         <div className='container-sub-filter'>
//             <div className='r'>
//                 <div className='nav-sub'>
//                     <button
//                         className={`btn-info1 btn ${selectedButton === 'sub1' ? 'btn-primary' : ''}`}
//                         onClick={() => handleButtonClick('sub1')}
//                     >
//                         Find
//                     </button>
//                     <button
//                         className={`btn-info1 btn ${selectedButton === 'sub2' ? 'btn-primary' : ''}`}
//                         onClick={() => handleButtonClick('sub2')}
//                     >
//                         Range
//                     </button>
//                 </div>
//             </div>
//             <div className='r'>
//                 <div className='body-sub'>
//                     {/* <TableTest /><div> */}
//                     {selectedButton === 'sub1' &&
//                         <Find />
//                     }
//                     {selectedButton === 'sub2' &&
//                         <Sub2 />
//                     }
//                 </div>
//             </div>
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

