import React, { useContext, useEffect, useState } from 'react';
import TableSelect from '../../components/Tables/TableSelect/TableSelect';
import './CreateInput.scss';
import { AppContext } from '../../context/AppContext';
import { Button } from '@mui/material';

const CreateInput = () => {
    const {
        setArrTBSoureToCreateReport,
        setArrTBSinkToCreateReport,
        nameSchemaSource, setNameSchemaSource,
        nameSchemaSink, setNameSchemaSink,
        handleShowModalPreviewInput,
        arrToCreateReport,
        allTBSource, allTBSink,
        isBlockBtn
    } = useContext(AppContext);

    const [dataSourceTableSelect, setDataSourceTableSelect] = useState([]);
    const [dataSinkTableSelect, setDataSinkTableSelect] = useState([]);

    const handleChangeNameSchemaSource = (event) => {
        setNameSchemaSource(event.target.value);
    };

    const handleChangeNameSchemaSink = (event) => {
        setNameSchemaSink(event.target.value);
    };

    const convertToDataTableSelect = (dataInput) => {
        if (dataInput) {
            return dataInput.map((item, index) => ({
                id: index,
                name: Object.values(item)[0]
            }));
        }
        return [];
    };

    useEffect(() => {
        const dataTableSelect = convertToDataTableSelect(allTBSource);
        setDataSourceTableSelect(dataTableSelect);
    }, [allTBSource]);

    useEffect(() => {
        const dataTableSelect = convertToDataTableSelect(allTBSink);
        setDataSinkTableSelect(dataTableSelect);
    }, [allTBSink]);

    const handleCompare = () => {
        handleShowModalPreviewInput(arrToCreateReport);
    };

    return (
        <div className="container-create-input">
            <div className="r1">
                <div className="left">
                    <div className="schema-name">
                        <label>Schema Source Name</label>
                        <div className='input-btn'>
                            <input
                                onChange={handleChangeNameSchemaSource}
                                value={nameSchemaSource}
                            />
                            <Button>
                                Find
                            </Button>
                        </div>
                    </div>
                    <div className="table-name">
                        {
                            dataSourceTableSelect && dataSourceTableSelect.length > 0 &&
                            < TableSelect
                                data={dataSourceTableSelect}
                                handleSelect={setArrTBSoureToCreateReport}
                            />
                        }
                    </div>
                </div>
                <div className="right">
                    <div className="schema-name">
                        <label>Schema Sink Name</label>
                        <div className='input-btn'>
                            <input
                                value={nameSchemaSink}
                                onChange={handleChangeNameSchemaSink}
                            />
                            <Button>
                                Find
                            </Button>
                        </div>
                    </div>
                    <div className="table-name">
                        {
                            dataSinkTableSelect && dataSinkTableSelect.length > 0 &&
                            <TableSelect
                                data={dataSinkTableSelect}
                                handleSelect={setArrTBSinkToCreateReport}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className="r2">
                <Button
                    onClick={handleCompare}
                    disabled={isBlockBtn}
                    variant={'contained'}
                >
                    Compare
                </Button>
            </div>
        </div>
    );
};

export default CreateInput;
