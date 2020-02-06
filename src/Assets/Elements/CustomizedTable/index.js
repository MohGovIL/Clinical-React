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
import CustomizedTableBadge from "./CustomizedTableBadge";
import CustomizedTableButton from "./CustomizedTableButton";
import CustomizedTableContainer from "./CustomizedTableContainer";
import CustomizedTableLabelCell from "./CustomizedTableLabelCell";
import CustomizedTableButtonCell from "./CustomizedTableButtonCell";
import CustomizedTableBadgeCell from "./CustomizedTableBadgeCell";
import CustomizedTableSelectCell from "./CustomizedTableSelectCell";
import {
    SELECT_CELL,
    BADGE_CELL,
    BUTTON_CELL,
    LABEL_CELL,
    PERSONAL_INFORMATION_CELL
} from "./CustomizedTableComponentsTypes";

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
                                        //DONE
                                        case 'Personal information':
                                            return <CustomizedTablePersonalInformationCell
                                                priority={tableRow.priority}
                                                align={'right'}
                                                key={tableCellItemIndex}
                                                gender={tableRow.participants?.patient.gender}
                                                id={tableRow.participants?.patient.identifier}
                                                firstName={tableRow.participants?.patient.firstName}
                                                lastName={tableRow.participants?.patient.lastName}/>;
                                        //DONE
                                        case 'Cell phone':
                                            return <CustomizedTablePhoneCell padding={'none'} align={'right'}
                                                                             key={tableCellItemIndex}>
                                                {tableRow.participants?.patient?.mobileCellPhone ? tableRow.participants.patient.mobileCellPhone : null}
                                            </CustomizedTablePhoneCell>;
                                        //DONE
                                        case 'Healthcare service':
                                            return <TableCell padding={'none'} align={'right'} key={tableCellItemIndex}>
                                                {t(tableRow.healthcareService)}
                                            </TableCell>;
                                        //DONE
                                        case 'Test':
                                            return <TableCell padding={'none'} align={'right'} key={tableCellItemIndex}>
                                                {t(tableRow.examination)}
                                            </TableCell>;
                                        case 'Time':
                                            //DONE
                                            return <TableCell padding={'none'} align={'right'} key={tableCellItemIndex}>
                                                {`${new Date(tableRow.time).getHours() >= 9 ? new Date(tableRow.time).getHours() : '0' + new Date(tableRow.time).getHours()}:${new Date(tableRow.time).getMinutes() >= 9 ? new Date(tableRow.time).getMinutes() : '0' + new Date(tableRow.time).getMinutes()}`}
                                            </TableCell>;
                                        //DONE
                                        case 'Status':
                                            return <TableCell padding={'none'} align={'center'} key={tableCellItemIndex}>
                                                <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'}
                                                                  value={tableRow.status} options={options}
                                                                  appointmentId={tableRow.id}
                                                                  text_color={'#076ce9'}/>
                                            </TableCell>;
                                        //DONE
                                        case 'Messages':
                                            return <TableCell padding={'none'} align={'center'} key={tableCellItemIndex}>
                                                <CustomizedTableBadge badgeContent={0}/>
                                            </TableCell>;
                                        //DONE
                                        case 'Patient admission':
                                            return <TableCell padding={'none'} align={'center'} key={tableCellItemIndex}>
                                                <CustomizedTableButton variant={'outlined'} color={'primary'}>
                                                    {t('Patient admission')}
                                                </CustomizedTableButton>
                                            </TableCell>;
                                        case BUTTON_CELL:
                                            return <CustomizedTableButtonCell label={tableRow.label} align={tableRow.align}
                                                                              padding={tableRow.padding}
                                                                              color={tableRow.color}
                                                                              variant={tableRow.variant}
                                                                              onClickHandler/>;
                                        case LABEL_CELL:
                                            return <CustomizedTableLabelCell padding={tableRow.padding}
                                                                             align={tableRow.align}
                                                                             color={tableRow.color}
                                                                             label={tableRow.label}/>;
                                        case BADGE_CELL:
                                            return <CustomizedTableBadgeCell badgeContent={tableRow.badgeContent}
                                                                             align={tableRow.align}
                                                                             padding={tableRow.padding}/>;
                                        case SELECT_CELL:
                                            return <CustomizedTableSelectCell onChangeHandler={tableRow.onChangeHandler}
                                                                              text_color={tableRow.text_color}
                                                                              padding={tableRow.padding}
                                                                              value={tableRow.value}
                                                                              icon_color={tableRow.icon_color}
                                                                              background_color={tableRow.background_color}
                                                                              align={tableRow.align}
                                                                              options={tableRow.options}
                                            />;
                                        case PERSONAL_INFORMATION_CELL:
                                            return <CustomizedTablePersonalInformationCell
                                                priority={tableRow.priority}
                                                align={tableRow.align}
                                                gender={tableRow.gender}
                                                id={tableRow.id}
                                                firstName={tableRow.firstName}
                                                lastName={tableRow.lastName}/>;
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
