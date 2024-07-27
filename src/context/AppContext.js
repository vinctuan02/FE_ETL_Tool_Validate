import { createContext, useEffect, useState } from "react";
import { getInfoJDBC, getNameTablesOfSchema, getReportDetailsBy_report_id, getReportsAxios, getTable } from "../services/ReportService";

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {


    // modal
    const [isShowModalPreviewInput, setIsShowModalPreviewInput] = useState(false)
    const [dataReport, setDataReport] = useState([])
    const [nameFileReport, setNameFileReport] = useState('')
    const [nameReport, setNameReport] = useState('')

    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState([])

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataDelete, setDataDelete] = useState([])
    const [isShowModalPreviewReportDetails, setIsShowModalPreviewReportDetails] = useState(false)
    const [dataPreviewReportDetails, setDataPreviewReportDetails] = useState()

    const [isShowModalReport, setIsShowModalReport] = useState(false)

    const [listReports, setListReports] = useState([])
    const [keySearch, setKeySearch] = useState('')


    // report
    const [currentSelect, setCurrentSelect] = useState({}) // report
    const [reportDetailsCurrent, setReportDetailsCurrent] = useState() // report detail
    const [arrDataSelectInput, setArrDataSelectInput] = useState() // arr schema-tb
    const [currentSelectTB, setCurrentSelectTB] = useState() // tb in report

    //detail component
    const [tableSource, setTableSource] = useState()
    const [tableSink, setTableSink] = useState()

    const [isASC, setIsASC] = useState(true);
    const [limit, setLimit] = useState(200);

    const [fieldName, setFieldName] = useState('')
    const [fieldValue, setFieldValue] = useState('')

    const [startValue, setStartValue] = useState('')

    const [endValue, setEndValue] = useState('')

    const [filter, setFilter] = useState()


    // create input page
    const [arrTBSoureToCreateReport, setArrTBSoureToCreateReport] = useState([])
    const [arrTBSinkToCreateReport, setArrTBSinkToCreateReport] = useState([])
    const [arrToCreateReport, setArrToCreateReport] = useState([])
    const [nameSchemaSource, setNameSchemaSource] = useState('')
    const [nameSchemaSink, setNameSchemaSink] = useState('')
    const [allTBSource, setAllTBSource] = useState([])
    const [allTBSink, setAllTBSink] = useState([])
    const [isBlockBtn, setIsBlockBtn] = useState(true)

    // more popper
    const [arrSourceSinkToCount, setArrSourceSinkToCount] = useState([])

    //DraggableWindow
    const [isShowDraggableWindow, setIsShowDraggableWindow] = useState(false)
    const [nameColumn, setNameColumn] = useState()

    // group windown
    const [isShowGroupWindow, setIsShowGroupWindow] = useState(false)

    // create jdbc
    const [JDBCSource, setJDBCSource] = useState()
    const [JDBCSink, setJDBCSink] = useState()


    //
    const getTB = async () => {
        if (currentSelectTB) {

            //get tb source
            const nameDBSource = currentSelectTB.schemaSourceName
            const nameTBSource = currentSelectTB.dataSourceName
            const resInfoJDBCSource = await getInfoJDBC(currentSelectTB.source_connection_id)
            const infoJDBCSource = resInfoJDBCSource.data

            const resSource = await getTable(nameDBSource, nameTBSource, filter, infoJDBCSource)

            setTableSource(resSource.data)

            //get tb sink
            const nameDBSink = currentSelectTB.schemaSinkName
            const nameTBSink = currentSelectTB.dataSinkName
            const resInfoJDBCSink = await getInfoJDBC(currentSelectTB.sink_connection_id)
            const infoJDBCSink = resInfoJDBCSink.data

            const resSink = await getTable(nameDBSink, nameTBSink, filter, infoJDBCSink)

            setTableSink(resSink.data)
        }
    }


    // useEffect(() => {
    //     currentSelectTB && getTB()
    // }, [filter])


    useEffect(() => {
        setFilter({ isASC, limit, fieldName, fieldValue, startValue, endValue })
    }, [isASC, limit, fieldName, fieldValue, startValue, endValue])


    const toggleASCDESC = () => {
        setIsASC(!isASC);
    };

    useEffect(() => {
        getTB()
        // console.log(currentSelectTB);
    }, [currentSelectTB, filter])

    useEffect(() => {
        getReports()
    }, [keySearch])

    const getReports = async () => {
        let res = await getReportsAxios({ keySearch: keySearch })
        // let res = await getReportsAxios()
        if (res && res.data) {
            setListReports(res.data)
        }
    }

    const handleCloseModal = (keyModal = 'all') => {
        switch (keyModal) {
            case 'all':
                setIsShowModalPreviewInput(false)
                setIsShowModalUpdate(false)
                setIsShowModalDelete(false)
                setIsShowModalPreviewReportDetails(false)
                setIsShowModalReport(false)

                setDataReport([])
                setNameReport('')

                break;
            case 'previewInput':
                setIsShowModalPreviewInput(false)
                break;
            default:
            // code block
        }
    }

    const handleShowModalPreviewInput = (data) => {
        setDataReport(data)
        setIsShowModalPreviewInput(true)
    }

    const handleShowModalUpdate = (item) => {
        setDataUpdate(item)
        setIsShowModalUpdate(true)
    }

    const handleShowModalDelete = (item) => {
        setDataDelete(item)
        setIsShowModalDelete(true)
    }

    const handleShowReportDetails = (item) => {
        setDataPreviewReportDetails(item)
        setIsShowModalPreviewReportDetails(true)
    }

    let handleOpenModalReport = () => {
        setIsShowModalReport(true)
    }

    const handleOnChangeKeySearch = (event) => {
        setKeySearch(event.target.value)
    }

    const handleOpenDraggableWindown = (fieldName) => {
        setNameColumn(fieldName)
        setIsShowDraggableWindow(true)
    }

    const convertToDataInputSelect = (data) => {
        if (data && data.length > 0) {
            // const arr = [{ value: {}, label: 'Select an option' }]
            const arr = []
            data.forEach((item, index) => {
                arr.push({
                    value: {
                        schemaSourceName: item.schemaSourceName,
                        schemaSinkName: item.schemaSinkName,
                        dataSourceName: item.dataSourceName,
                        dataSinkName: item.dataSinkName
                    },
                    label: `Table: ${item.dataSourceName} - ${item.dataSinkName}`
                })
            })
            setArrDataSelectInput(arr)
        }
    }

    useEffect(() => {
        convertToDataInputSelect(reportDetailsCurrent)
    }, [reportDetailsCurrent])


    // report
    const fetchReportDetails = async () => {
        if (currentSelect && currentSelect.report_id) {
            const res = await getReportDetailsBy_report_id(currentSelect?.report_id)
            setReportDetailsCurrent(res.data)
        }
    }

    useEffect(() => {
        fetchReportDetails()
    }, [currentSelect, isShowModalReport])

    // create input page
    const renderArrObjecstReport = () => {
        let arrObjects = []

        if (arrTBSoureToCreateReport.length === arrTBSinkToCreateReport.length) {
            setIsBlockBtn(false)
            for (let i = 0; i < arrTBSoureToCreateReport.length; i++) {
                const objectReport = {
                    schemaSourceName: nameSchemaSource,
                    schemaSinkName: nameSchemaSink,
                    dataSourceName: arrTBSoureToCreateReport[i].table_name,
                    dataSinkName: arrTBSinkToCreateReport[i].table_name
                }
                arrObjects.push(objectReport)

                setArrToCreateReport(arrObjects)
            }
        }
        return arrObjects
    }

    useEffect(() => {
        if (arrTBSoureToCreateReport && arrTBSoureToCreateReport.length > 0) {
            renderArrObjecstReport()
        }
        else {
            setIsBlockBtn(true)
        }
    }, [arrTBSoureToCreateReport])

    useEffect(() => {
        if (arrTBSinkToCreateReport && arrTBSinkToCreateReport.length > 0) {
            renderArrObjecstReport()
        }
        else {
            setIsBlockBtn(true)
        }
    }, [arrTBSinkToCreateReport])

    useEffect(() => {
    }, [arrToCreateReport])

    useEffect(() => {
        getAllTBSource()
    }, [nameSchemaSource])

    const getAllTBSource = async () => {
        let res
        if (nameSchemaSource && JDBCSource) {
            res = await getNameTablesOfSchema(nameSchemaSource, JDBCSource)
        }

        if (res && res.data) {
            setAllTBSource(res.data)
        }
    }

    useEffect(() => {
        getAllTBSink()
    }, [nameSchemaSink])

    const getAllTBSink = async () => {
        let res
        if (nameSchemaSink && JDBCSink) {
            res = await getNameTablesOfSchema(nameSchemaSink, JDBCSink)
        }

        if (res && res.data) {
            setAllTBSink(res.data)
        }
    }



    const value = {
        isShowModalPreviewInput, setIsShowModalPreviewInput,
        dataReport, setDataReport, handleShowModalPreviewInput,
        nameFileReport, setNameFileReport, nameReport, setNameReport,

        handleShowModalUpdate, isShowModalUpdate,
        setIsShowModalUpdate, dataUpdate,

        isShowModalDelete, setIsShowModalDelete,
        handleShowModalDelete, dataDelete,

        isShowModalPreviewReportDetails, setIsShowModalPreviewReportDetails,
        handleShowReportDetails, dataPreviewReportDetails,

        isShowModalReport, setIsShowModalReport,
        handleOpenModalReport,

        listReports, getReports,
        keySearch,
        handleOnChangeKeySearch,

        currentSelect, setCurrentSelect,
        reportDetailsCurrent, setReportDetailsCurrent,

        arrDataSelectInput,
        currentSelectTB, setCurrentSelectTB,

        handleCloseModal,

        tableSource, tableSink,

        isASC, setIsASC,
        limit, setLimit,
        toggleASCDESC,

        fieldName, setFieldName, fieldValue, setFieldValue,
        startValue, setStartValue, endValue, setEndValue,
        getTB,

        //create input
        arrTBSoureToCreateReport, setArrTBSoureToCreateReport,
        arrTBSinkToCreateReport, setArrTBSinkToCreateReport,
        nameSchemaSource, setNameSchemaSource,
        nameSchemaSink, setNameSchemaSink, arrToCreateReport,
        allTBSource, setAllTBSource, allTBSink, setAllTBSink,
        isBlockBtn, setIsBlockBtn,

        //more popper
        arrSourceSinkToCount, setArrSourceSinkToCount,

        //DraggableWindow
        isShowDraggableWindow, setIsShowDraggableWindow,
        handleOpenDraggableWindown,

        //group windown
        isShowGroupWindow, setIsShowGroupWindow,
        nameColumn,


        // JDBC
        JDBCSource, setJDBCSource, JDBCSink, setJDBCSink
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}