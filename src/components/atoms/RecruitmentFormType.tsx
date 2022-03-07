import { memo, useState, VFC, MouseEvent } from 'react';
import { Button } from '@mui/material';
import { StyledSelectMenuItem } from '../index';
import { RecruitmentInput, Status, Type } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';
import Menu from '@mui/material/Menu';

type Props = {
  control: Control<RecruitmentInput, object>;
  watchStatus: Status;
  watchType: Type;
};

type MenuItem = {
  id: string;
  value: string;
};

export const RecruitmentFormType: VFC<Props> = memo((props) => {
  const { control, watchStatus, watchType } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const types: Array<MenuItem> = [
    { id: Type.Unnecessary, value: '' },
    { id: Type.Opponent, value: '試合相手の募集' },
    { id: Type.Individual, value: '個人参加の募集' },
    { id: Type.Member, value: 'メンバーの募集' },
    { id: Type.Joining, value: 'チームに入りたい募集' },
    { id: Type.Others, value: 'その他' },
  ];

  return (
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <>
          <Button size="small" sx={{ fontSize: 12, px: 1 }} disableRipple onClick={handleClick}>
            {field.value === Type.Unnecessary || field.value === undefined
              ? '募集タイプを選択'
              : types.find((type: MenuItem) => type.id === field.value)?.value}
          </Button>
          <Menu
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            MenuListProps={{
              sx: {
                py: 0,
              },
            }}
            PaperProps={{
              sx: {
                borderRadius: 1.5,
                minWidth: 180,
                boxShadow:
                  'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
              },
            }}
            {...field}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {types.map((type: MenuItem) => (
              <StyledSelectMenuItem
                value={type.id}
                key={type.id}
                onClick={() => {
                  handleClose();
                  field.onChange(type.id);
                }}
                sx={{ display: type.id === Type.Unnecessary ? 'none' : '', py: 1.1 }}
                disableRipple
              >
                {type.value}
              </StyledSelectMenuItem>
            ))}
          </Menu>
        </>
      )}
    />
  );
});
