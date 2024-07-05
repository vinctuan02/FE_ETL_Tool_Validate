import axios from './customizeAxios'

const getReportsAxios = () => {
    return axios.get(`report/get-reports`)
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

const countRecordsTB = (input) => {
    return axios.get(`get-count-record-tb`, {
        params: input
    })
}


export {
    getReportsAxios,
    getReportByReportNameAxios,
    postCreateReport,
    putUpdateReport,
    deleteReport,
    countRecordsTB
}