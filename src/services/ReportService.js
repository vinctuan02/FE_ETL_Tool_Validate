import axios from './customizeAxios'


// tables
const countRecordsTB = (nameDB, nameTB, infoJDBC) => {
    const input = { nameDB, nameTB, infoJDBC }
    return axios.post(`get-count-record-tb`, input)
}

const getTable = (nameDB, nameTB, filter, infoJDBC) => {
    const input = { nameDB, nameTB, filter, infoJDBC }
    return axios.post(`get-table`, input)
}

const groupByColumn = (input) => {
    console.log(input);

    return axios.get(`/group-by-column`, {
        params: input
    })
}

// report
const getReportsAxios = (keySearch) => {
    return axios.get(`report/get-reports`, {
        params: keySearch
    })
}

const getReportByReportNameAxios = (reportName) => {
    return axios.get(`report/get-report-by-report-name/${reportName}`)
}

const postCreateReport = (report) => {
    return axios.post(`report/create-report`, report)
}

const putUpdateReport = (report) => {
    return axios.put(`report/update-report/${report.report_id}`, report)
}

const deleteReport = (report) => {
    return axios.delete(`report/delete-report/${report.report_id}`)
}

// report detail
const getReportDetailsBy_report_id = (report_id) => {
    return axios.get(`/report-details/get-details-by-report_id/${report_id}`)
}

const bulkCreateReportDetails = (arrayReportDetails) => {
    return axios.post(`/report-details/bulk-create-details`, arrayReportDetails)
}

// create report
const getNameTablesOfSchema = (nameDB, infoJDBC) => {
    const input = { nameDB, infoJDBC }
    return axios.post(`/get-all-name-tb-of-db`, input)
}

const testConnection = (input) => {
    return axios.get(`/test-connection`, {
        params: input
    })
}

const createConnection = (input) => {
    return axios.get(`/create-connection`, {
        params: input
    })
}

const getCountRecordTables = (nameDB, infoJDBC) => {
    const input = { nameDB, infoJDBC }
    return axios.post(`/count-record-tables`, input)
}

// jdbc
const getInfoJDBC = (id) => {
    return axios.get(`/jdbc/get-jdbc-connections/${id}`)
}

const bulkCreateJDBCConnections = (arrayInfoJDBC) => {
    return axios.post(`/jdbc/bulk-create-jdbc-connections`, arrayInfoJDBC)
}

const compareDescribe = (infoSourceSink) => {
    return axios.post(`/compare-describe`, infoSourceSink)
}

const compareCountRecords = (infoSourceSink) => {
    return axios.post(`/compare-count-records`, infoSourceSink)
}

const compareGroupRecords = (infoSourceSink) => {
    return axios.post(`/compare-group-records`, infoSourceSink)
}

export {
    getReportsAxios,
    getReportByReportNameAxios,
    postCreateReport,
    putUpdateReport,
    deleteReport,

    getReportDetailsBy_report_id,
    bulkCreateReportDetails,

    countRecordsTB,
    getTable,
    groupByColumn,
    getNameTablesOfSchema,
    testConnection,
    createConnection,

    getCountRecordTables,

    //jdbc
    getInfoJDBC,
    bulkCreateJDBCConnections,

    //compare
    compareDescribe,
    compareCountRecords,
    compareGroupRecords
}