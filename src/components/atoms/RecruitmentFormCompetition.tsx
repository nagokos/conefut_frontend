import { memo, VFC, useState, MouseEvent } from 'react';
import { Button } from '@mui/material';
import { StyledSelectMenuItem } from '../index';
import { Competition, Status, Type, useGetCompetitionsQuery } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';
import { RecruitmentInput } from '../../generated/graphql';
import Menu from '@mui/material/Menu';

type Props = {
  control: Control<RecruitmentInput, object>;
  watchStatus: Status;
  watchType: Type;
};

export const RecruitmentFormCompetition: VFC<Props> = memo((props) => {
  const { control, watchStatus, watchType } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [data] = useGetCompetitionsQuery();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Controller
      name="competitionId"
      control={control}
      render={({ field }) => (
        <>
          <Button
            size="small"
            defaultValue={Type.Unnecessary}
            sx={{ fontSize: 12, px: 1 }}
            disableRipple
            onClick={handleClick}
          >
            {field.value
              ? data.data?.getCompetitions.find((competition) => competition.id === field.value)?.name
              : '募集競技を選択'}
          </Button>
          <Menu
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            MenuListProps={{
              sx: {
                py: 0,
              },
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                borderRadius: 1.5,
                minWidth: 180,
                py: 0,
                boxShadow:
                  'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
              },
            }}
            {...field}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {data.data?.getCompetitions.map((competition: Competition) => (
              <StyledSelectMenuItem
                value={competition.id}
                key={competition.id}
                onClick={() => {
                  handleClose();
                  field.onChange(competition.id);
                }}
                sx={{ py: 1 }}
                disableRipple
              >
                {competition.name}
              </StyledSelectMenuItem>
            ))}
          </Menu>
        </>
      )}
    />
  );
});
