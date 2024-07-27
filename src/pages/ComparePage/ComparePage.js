import React, { useContext, useEffect, useState } from 'react'
import './ComparePage.scss'
import SelectReportPopper from '../../components/Popper/SelectReportPopper/SelectReportPopper'
import { AppContext } from '../../context/AppContext'
import { getInfoJDBC } from '../../services/ReportService'
import ProgressBarColumn from './ProgressBarColumn/ProgressBarColumn'

const ComparePage = () => {
    const { reportDetailsCurrent } = useContext(AppContext)
    const [infoJDBCSource, setInfoJDBCSource] = useState(null)
    const [infoJDBCSink, setInfoJDBCSink] = useState(null)
    const [arrNameTables, setArrNameTables] = useState(['Table'])
    const [arrInfoSourceSink, setArrInfoSourceSink] = useState([])

    // Lấy thông tin JDBC
    const fetchInfoJDBC = async () => {
        try {
            const resJDBCSource = await getInfoJDBC(reportDetailsCurrent[0].source_connection_id)
            const resJDBCSink = await getInfoJDBC(reportDetailsCurrent[0].sink_connection_id)

            setInfoJDBCSource(resJDBCSource.data)
            setInfoJDBCSink(resJDBCSink.data)
        } catch (error) {
            console.error('Error fetching JDBC info:', error)
        }
    }

    useEffect(() => {
        if (reportDetailsCurrent && reportDetailsCurrent.length > 0) {
            fetchInfoJDBC();
        }
    }, [reportDetailsCurrent]);

    useEffect(() => {
        if (infoJDBCSource && infoJDBCSink && reportDetailsCurrent && reportDetailsCurrent.length > 0) {
            const arrSourceSink = [];
            const arrName = [];

            reportDetailsCurrent.forEach((report) => {
                arrName.push(report.dataSinkName);

                const schemaSource = report.schemaSourceName;
                const tableSource = report.dataSourceName;

                const schemaSink = report.schemaSinkName;
                const tableSink = report.dataSinkName;

                arrSourceSink.push({
                    schemaSource, tableSource, infoJDBCSource, schemaSink, tableSink, infoJDBCSink
                });
            });

            // arr to show step
            setArrNameTables(arrName);

            // arr to compare
            setArrInfoSourceSink(arrSourceSink);
        }
    }, [infoJDBCSource, infoJDBCSink, reportDetailsCurrent]);

    // console.log("arrInfoSourceSink: ", arrInfoSourceSink);

    return (
        <div className='container-compare-page'>
            <div className='r1'>
                <SelectReportPopper />
            </div>
            <div className='r2'>
                <ProgressBarColumn
                    arrNameTables={arrNameTables}
                    arrInfoSourceSink={arrInfoSourceSink}
                />
            </div>
        </div>
    )
}

export default ComparePage
