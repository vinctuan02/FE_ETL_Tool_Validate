import { createContext, useEffect, useState } from "react";
import { getReportsAxios } from "../services/ReportService";

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {

    const [isShowModalPreviewInput, setIsShowModalPreviewInput] = useState(false)
    const [dataReport, setDataReport] = useState([])
    const [nameFileReport, setNameFileReport] = useState('')

    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState([])

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataDelete, setDataDelete] = useState([])

    const [isShowModalPreviewReportDetails, setIsShowModalPreviewReportDetails] = useState(false)
    const [dataPreviewReportDetails, setDataPreviewReportDetails] = useState()

    const [isShowModalReport, setIsShowModalReport] = useState(false)

    const [listReports, setListReports] = useState([])

    const [keySearch, setKeySearch] = useState('')

    const [currentSelect, setCurrentSelect] = useState({})

    const [reportDetailsCurrent, setReportDetailsCurrent] = useState()

    const [arrDataSelectInput, setArrDataSelectInput] = useState()

    const [currentSelectTB, setCurrentSelectTB] = useState()

    useEffect(() => {
    },[currentSelect])

    useEffect(() => {
        getReports()
    }, [keySearch])

    const getReports = async () => {
        let res = await getReportsAxios({ keySearch: keySearch })
        if (res && res.data) {
            setListReports(res.data)
        }
    }

    const handleClose = () => {
        setIsShowModalPreviewInput(false)
        setIsShowModalUpdate(false)
        setIsShowModalDelete(false)
        setIsShowModalPreviewReportDetails(false)
        setIsShowModalReport(false)
    }

    const handleCloseModal = (keyModal = 'all') => {
        switch (keyModal) {
            case 'all':
                setIsShowModalPreviewInput(false)
                setIsShowModalUpdate(false)
                setIsShowModalDelete(false)
                setIsShowModalPreviewReportDetails(false)
                setIsShowModalReport(false)
                break;
            case 'previewInput':
                setIsShowModalPreviewInput(false)
                break;
            default:
            // code block
        }
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

    const convertToDataInputSelect = (data) => {
        if (data && data.length > 0) {
            const arr = [{ value: {}, label: 'Select an option' }]
            data.forEach((item, index) => {
                arr.push({
                    value: { schemaName: item.schemaName, dataSourceName: item.dataSourceName, dataSinkName: item.dataSinkName },
                    label: `Table: ${item.dataSourceName} - ${item.dataSinkName}`
                })
            })
            setArrDataSelectInput(arr)
        }
    }

    useEffect(() => {
        convertToDataInputSelect(reportDetailsCurrent)
    }, [reportDetailsCurrent])

    useEffect(() => {
        // console.log("currentSelectTB: ", currentSelectTB);
    }, [currentSelectTB])

    const value = {
        isShowModalPreviewInput, setIsShowModalPreviewInput,
        dataReport, setDataReport,
        nameFileReport, setNameFileReport,

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


        handleClose,
        handleCloseModal
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}