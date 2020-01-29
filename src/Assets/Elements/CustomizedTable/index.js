import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {useTranslation} from "react-i18next";
import {TableBody} from "@material-ui/core";
import CustomizedTableHeaderRow from "./CustomizedTableHeaderRow";
import CustomizedTableHeaderCell from "./CustomizedTableHeaderCell";
import StyledCustomizedTable from "./Style";
import CustomizedTablePersonalInformationCell from "./CustomizedTablePersonalInformationCell";
import CustomizedTablePhoneCell from "./CustomizedTablePhoneCell";
import TableCell from "@material-ui/core/TableCell";
import CustomizedSelect from "../CustomizedSelect";

const CustomizedTable = ({tableHeaders, tableData}) => {
    const {t} = useTranslation();

    return (
        <StyledCustomizedTable size={'small'}>
            <TableHead>
                <CustomizedTableHeaderRow>
                    {tableHeaders.map((tableHeader, tableHeaderIndex) => <CustomizedTableHeaderCell
                        key={tableHeaderIndex}>{tableHeader.hideTableHeader ? null : t(tableHeader.tableHeader)}</CustomizedTableHeaderCell>)}
                </CustomizedTableHeaderRow>
            </TableHead>
            <TableBody>
                {tableData.map((tableRow, tableRowIndex) => {
                    return (<TableRow key={tableRowIndex}>
                        {tableHeaders.map((tableCellItem, tableCellItemIndex) => {
                            switch (tableCellItem.tableHeader) {
                                case 'Personal information':
                                    return <CustomizedTablePersonalInformationCell
                                        align={'right'}
                                        padding={'none'}
                                        key={tableCellItemIndex}
                                        gender={tableRow.participants?.patient.gender}
                                        id={tableRow.participants?.patient.identifier}
                                        firstName={tableRow.participants?.patient.firstName}
                                        lastName={tableRow.participants?.patient.lastName}/>;
                                case 'Cell phone':
                                    return <CustomizedTablePhoneCell padding={'none'} align={'right'}
                                                                     key={tableCellItemIndex}>
                                        {tableRow.participants?.patient?.mobileCellPhone ? tableRow.participants.patient.mobileCellPhone : null}
                                    </CustomizedTablePhoneCell>;
                                case 'Healthcare service':
                                    return <TableCell padding={'none'} align={'right'} key={tableCellItemIndex}>
                                        {t(tableRow.healthCareService)}
                                    </TableCell>;
                                case 'Test':
                                    return <TableCell padding={'none'} align={'right'} key={tableCellItemIndex}>
                                        {t(tableRow.examination)}
                                    </TableCell>;
                                case 'Time':
                                    return <TableCell padding={'none'} align={'right'} key={tableCellItemIndex}>
                                        {`${new Date(tableRow.time).getHours() >= 9 ? new Date(tableRow.time).getHours() : '0' + new Date(tableRow.time).getHours()}:${new Date(tableRow.time).getMinutes() >= 9 ? new Date(tableRow.time).getMinutes() : '0' + new Date(tableRow.time).getMinutes()}`}
                                    </TableCell>;
                                case 'Status':
                                    return <TableCell padding={'none'} align={'right'} key={tableCellItemIndex}>
                                        <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#096de9'} value={tableRow.status}/>
                                        {/*{t(tableRow.status)}*/}
                                    </TableCell>;
                                case 'Messages':
                                    break;
                                case 'Patient admission':
                                    break;
                                default:
                                    break;
                            }
                        }
                        )}
                    </TableRow>)
                })}
            </TableBody>
        </StyledCustomizedTable>
    );
};

export default CustomizedTable;
