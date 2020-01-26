import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {useTranslation} from "react-i18next";
import {TableBody} from "@material-ui/core";
import CustomizedTableHeaderRow from "./CustomizedTableHeaderRow/Style";
import CustomizedTableHeaderCell from "./CustomizedTableHeaderCell/Style";
import StyledCustomizedTable from "./Style";
import CustomizedTablePersonalInformationCell from "./CustomizedTablePersonalInformationCell";
import CustomizedTableCellPhoneCell from "./CustomizedTableCellPhoneCell/Style";

const CustomizedTable = ({tableHeaders, tableData}) => {
    console.log(tableData);
    const {t} = useTranslation();
    return (
        <StyledCustomizedTable>
            <TableHead>
                <CustomizedTableHeaderRow>
                    {tableHeaders.map((tableHeader, tableHeaderIndex) => <CustomizedTableHeaderCell
                        key={tableHeaderIndex}>{tableHeader.hideTabName ? null : t(tableHeader.tabName)}</CustomizedTableHeaderCell>)}
                </CustomizedTableHeaderRow>
            </TableHead>
            <TableBody>
                {tableData.map((tableRow, tableRowIndex) => {
                    return (<TableRow key={tableRowIndex}>
                        {tableHeaders.map((tableCellItem, tableCellItemIndex) => {
                                switch (tableCellItem.tabName) {
                                    case 'Personal information':
                                        return <CustomizedTablePersonalInformationCell key={tableCellItemIndex}
                                                                                       gender={tableRow.participants.patientsObjItem.gender}
                                                                                       id={tableRow.participants.patientsObjItem.identifier}
                                                                                       firstName={tableRow.participants.patientsObjItem.firstName}
                                                                                       lastName={tableRow.participants.patientsObjItem.lastName}/>;
                                    case 'Cell phone':
                                        return <CustomizedTableCellPhoneCell key={tableCellItemIndex}>

                                        </CustomizedTableCellPhoneCell>;
                                    default:
                                        return <TableCell key={tableCellItemIndex}/>
                                }

                            }
                            // tableCellItem.tabName === 'Personal information' ?
                            //     <CustomizedTablePersonalInformationCell key={tableCellItemIndex}
                            //                                             gender={tableRow.participants.patientsObjItem.gender}
                            //                                             id={tableRow.participants.patientsObjItem.identifier}
                            //                                             firstName={tableRow.participants.patientsObjItem.firstName}
                            //                                             lastName={tableRow.participants.patientsObjItem.lastName}/> :
                            //     <TableCell key={tableCellItemIndex}/>
                        )}
                    </TableRow>)
                })}
            </TableBody>
        </StyledCustomizedTable>
    );
};

export default CustomizedTable;
