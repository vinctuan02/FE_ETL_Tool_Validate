
import React, { useContext } from 'react'
import FormInputJDBC from '../../components/FormInputJDBC/FormInputJDBC'
import './CreateInput.scss'
import { AppContext } from '../../context/AppContext'
import { Button } from '@mui/material'

const CreateInput = () => {

    const { setArrTBSoureToCreateReport, setArrTBSinkToCreateReport,
        setNameSchemaSource, setNameSchemaSink, isBlockBtn,
        arrToCreateReport, handleShowModalPreviewInput,
        setJDBCSource, setJDBCSink
    } = useContext(AppContext)

    const handleSelectSchemaSource = (name) => {
        setNameSchemaSource(name)
    }

    const handleSelectSchemaSink = (name) => {
        setNameSchemaSink(name)
    }

    const handleSelectTBSource = (arrTB) => {
        setArrTBSoureToCreateReport(arrTB)
    }

    const handleSelectTBSink = (arrTB) => {
        setArrTBSinkToCreateReport(arrTB)
    }

    const handleCompare = () => {
        // console.log("arrToCreateReport: ", arrToCreateReport);
        handleShowModalPreviewInput(arrToCreateReport);
    };

    const handleSaveJDBCSource = (info) => {
        setJDBCSource(info)
    }

    const handleSaveJDBCSink = (info) => {
        setJDBCSink(info)
    }


    return (
        <div className='container-create-input1'>
            <div className='row1'>
                <div className='source'>
                    <div className='title'>Schema Source</div>
                    <FormInputJDBC
                        changeSelectSchema={handleSelectSchemaSource}
                        handleSelect={handleSelectTBSource}
                        saveJDBC={handleSaveJDBCSource}
                    />
                </div>
                <div className='sink'>
                    <div className='title'>Schema Sink</div>
                    <FormInputJDBC
                        changeSelectSchema={handleSelectSchemaSink}
                        handleSelect={handleSelectTBSink}
                        saveJDBC={handleSaveJDBCSink}
                    />
                </div>
            </div>
            <div className="row2">
                <div className="compare-button">
                    <Button
                        onClick={handleCompare}
                        disabled={isBlockBtn}
                        variant={'contained'}
                    >
                        Compare
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default CreateInput


// import React, { useContext, useEffect, useState } from 'react';
// import TableSelect from '../../components/Tables/TableSelect/TableSelect';
// import './CreateInput.scss';
// import { AppContext } from '../../context/AppContext';
// import { Button } from '@mui/material';

// const CreateInput = () => {
//     const {
//         setArrTBSoureToCreateReport,
//         setArrTBSinkToCreateReport,
//         nameSchemaSource, setNameSchemaSource,
//         nameSchemaSink, setNameSchemaSink,
//         handleShowModalPreviewInput,
//         arrToCreateReport,
//         allTBSource, allTBSink,
//         isBlockBtn
//     } = useContext(AppContext);

//     const [dataSourceTableSelect, setDataSourceTableSelect] = useState([]);
//     const [dataSinkTableSelect, setDataSinkTableSelect] = useState([]);

//     const handleChangeNameSchemaSource = (event) => {
//         setNameSchemaSource(event.target.value);
//     };

//     const handleChangeNameSchemaSink = (event) => {
//         setNameSchemaSink(event.target.value);
//     };

//     const convertToDataTableSelect = (dataInput) => {
//         if (dataInput) {
//             return dataInput.map((item, index) => ({
//                 id: index,
//                 name: Object.values(item)[0]
//             }));
//         }
//         return [];
//     };

//     useEffect(() => {
//         const dataTableSelect = convertToDataTableSelect(allTBSource);
//         setDataSourceTableSelect(dataTableSelect);
//     }, [allTBSource]);

//     useEffect(() => {
//         const dataTableSelect = convertToDataTableSelect(allTBSink);
//         setDataSinkTableSelect(dataTableSelect);
//     }, [allTBSink]);

//     const handleCompare = () => {
//         console.log("arrToCreateReport: ", arrToCreateReport);
//         handleShowModalPreviewInput(arrToCreateReport);
//     };

//     return (
//         <div className="container-create-input">
//             <div className="r1">
//                 <div className="left">
//                     <div className="schema-name">
//                         <label>Schema Source Name</label>
//                         <div className='input-btn'>
//                             <input
//                                 onChange={handleChangeNameSchemaSource}
//                                 value={nameSchemaSource}
//                             />
//                             <Button>
//                                 Find
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="table-name">
//                         {
//                             dataSourceTableSelect && dataSourceTableSelect.length > 0 &&
//                             < TableSelect
//                                 data={dataSourceTableSelect}
//                                 handleSelect={setArrTBSoureToCreateReport}
//                             />
//                         }
//                     </div>
//                 </div>
//                 <div className="right">
//                     <div className="schema-name">
//                         <label>Schema Sink Name</label>
//                         <div className='input-btn'>
//                             <input
//                                 value={nameSchemaSink}
//                                 onChange={handleChangeNameSchemaSink}
//                             />
//                             <Button>
//                                 Find
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="table-name">
//                         {
//                             dataSinkTableSelect && dataSinkTableSelect.length > 0 &&
//                             <TableSelect
//                                 data={dataSinkTableSelect}
//                                 handleSelect={setArrTBSinkToCreateReport}
//                             />
//                         }
//                     </div>
//                 </div>
//             </div>
//             <div className="r2">
//                 <Button
//                     onClick={handleCompare}
//                     disabled={isBlockBtn}
//                     variant={'contained'}
//                 >
//                     Compare
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default CreateInput;
