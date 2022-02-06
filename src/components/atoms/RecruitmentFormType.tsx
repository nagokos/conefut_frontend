import { memo, useState, VFC, MouseEvent } from 'react';
import { Button } from '@mui/material';
import { StyledSelectMenuItem } from '../index';
import { CreateRecruitmentInput, Type } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';
import Menu from '@mui/material/Menu';

type Props = {
  control: Control<CreateRecruitmentInput, object>;
};

interface MenuItem {
  id: string;
  value: string;
}

export const RecruitmentFormType: VFC<Props> = memo((props) => {
  const { control } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const types: Array<MenuItem> = [
    { id: Type.Opponent, value: '試合相手の募集' },
    { id: Type.Individual, value: '個人での参加の募集' },
    { id: Type.Teammate, value: 'チームメイトの募集' },
    { id: Type.Joining, value: 'チームに入りたい募集' },
    { id: Type.Coaching, value: 'コーチの募集' },
    { id: Type.Others, value: 'その他' },
  ];

  return (
    <Controller
      name="type"
      control={control}
      rules={{
        required: '募集タイプを選択してください',
      }}
      render={({ field }) => (
        <>
          <Button
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            size="small"
            sx={{ fontSize: 12, px: 1 }}
            disableRipple
            onClick={handleClick}
          >
            {field.value ? types?.find((type) => type?.id === field?.value)?.value : '募集タイプを選択'}
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
            PaperProps={{
              sx: {
                borderRadius: 2,
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
