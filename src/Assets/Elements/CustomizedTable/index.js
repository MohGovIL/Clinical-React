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
import StyledTableBadge from "./CustomizedTableBadge";
import CustomizedTableButton from "./CustomizedTableButton";
import CustomizedTableContainer from "./CustomizedTableContainer";

const CustomizedTable = ({tableHeaders, tableData, options}) => {

    const {t} = useTranslation();

    return (
        <CustomizedTableContainer>
            <StyledCustomizedTable size={'small'} stickyHeader>
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
                                                priority={tableRow.priority}
                                                align={'right'}
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
                                            return <TableCell padding={'none'} align={'center'} key={tableCellItemIndex}>
                                                <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'}
                                                                  value={tableRow.status} options={options}
                                                                  appointmentId={tableRow.id}
                                                                  text_color={'#076ce9'}/>
                                            </TableCell>;
                                        case 'Messages':
                                            return <TableCell padding={'none'} align={'center'} key={tableCellItemIndex}>
                                                <StyledTableBadge badgeContent={0}/>
                                            </TableCell>;
                                        case 'Patient admission':
                                            return <TableCell padding={'none'} align={'center'} key={tableCellItemIndex}>
                                                <CustomizedTableButton variant={'outlined'} color={'primary'}>
                                                    {t('Patient admission')}
                                                </CustomizedTableButton>
                                            </TableCell>;
                                        default:
                                            break;
                                    }
                                }
                            )}
                        </TableRow>)
                    })}
                </TableBody>
            </StyledCustomizedTable>
        </CustomizedTableContainer>
    );
};

export default CustomizedTable;
