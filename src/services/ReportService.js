import axios from './customizeAxios'


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

const countRecordsTB = (input) => {
    return axios.get(`get-count-record-tb`, {
        params: input
    })
}

const bulkCreateReportDetails = (arrayReportDetails) => {
    return axios.post(`/report-details/bulk-create-details`, arrayReportDetails)
}

export {
    getReportsAxios,
    getReportByReportNameAxios,
    postCreateReport,
    putUpdateReport,
    deleteReport,

    getReportDetailsBy_report_id,
    bulkCreateReportDetails,

    countRecordsTB
}