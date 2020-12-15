import React from "react";
import {Checkbox, Grid, ListItemText} from "@material-ui/core";
import {CheckBox, CheckBoxOutlineBlankOutlined} from "@material-ui/icons";
import {useTranslation} from "react-i18next";

export const ConditionRenderOption = (option, state) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Grid container justify='flex-start' alignItems='center'>
        <Grid item xs={2}>
          <Checkbox
            color='primary'
            icon={<CheckBoxOutlineBlankOutlined />}
            checkedIcon={<CheckBox />}
            checked={state.selected}
          />
        </Grid>
        {option.serviceType && option.serviceType.name && (
          <Grid item xs={3}>
            <ListItemText primary={t(option.serviceType.name)} />
          </Grid>
        )}
        {option.reasonCode && option.reasonCode.name && (
          <Grid item xs={3}>
            <ListItemText primary={t(option.reasonCode.name)} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};