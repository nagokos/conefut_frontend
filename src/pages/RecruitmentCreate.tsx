import { memo, MouseEvent, useState, VFC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Grid, InputBase, Select, Paper, InputLabel, Button, Menu, MenuProps, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import { useGetPrefecturesQuery } from '../generated/graphql';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ja from 'date-fns/locale/ja';
import Fab from '@mui/material/Fab';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PreviewIcon from '@mui/icons-material/Preview';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { StyledMenuItem } from '../components';

const RecruitmentSelectInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 7,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #e0f2f1',
    fontSize: 13,
    padding: '13px 12px',
  },
}));

const RecruitmentInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 7,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #e0f2f1',
    fontSize: 13,
    padding: '15.12px 12px',
  },
}));

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip placement="right" {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const StyledMenu = styled((props: MenuProps) => (
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
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

interface Level {
  id: string;
  value: string;
}

export const RecruitmentCreate: VFC = memo(() => {
  const [valueHold, setValueHold] = useState<Date | null>(new Date());
  const [pickerHold, setPickerHold] = useState<boolean>(false);

  const [valueDeadline, setValueDeadline] = useState<Date | null>(new Date());
  const [pickerDeadline, setPickerDeadline] = useState<boolean>(false);

  const navigate = useNavigate();
  const { loading, data } = useGetPrefecturesQuery();

  const levels: Level[] = [
    { id: 'enjoy', value: 'エンジョイ' },
    { id: 'beginner', value: 'ビギナー' },
    { id: 'middle', value: 'ミドル' },
    { id: 'expert', value: 'エキスパート' },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElType, setAnchorElType] = useState<null | HTMLElement>(null);
  const openType = Boolean(anchorElType);
  const handleClickType = (event: MouseEvent<HTMLElement>) => {
    setAnchorElType(event.currentTarget);
  };
  const handleCloseType = () => {
    setAnchorElType(null);
  };

  if (!data) return null;

  return (
    <Box sx={{ pt: 2, px: 3 }} bgcolor="#ebf2f2">
      <Box>
        <IconButton onClick={() => navigate(-1)} disableTouchRipple size="medium">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>
      <Grid container sx={{ maxWidth: 900, margin: '0 auto', px: 0, mt: 7 }}>
        <Grid item xs={10}>
          <InputBase multiline fullWidth sx={{ fontWeight: 'bold', fontSize: 28, px: 3 }} placeholder="タイトル" />
          <Box px={2.4} mt={0.8}>
            <Button
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              size="small"
              sx={{ fontSize: 12, px: 1 }}
              disableRipple
              onClick={handleClick}
            >
              募集競技を選択
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <StyledMenuItem onClick={handleClose} disableRipple>
                サッカー
              </StyledMenuItem>
              <StyledMenuItem onClick={handleClose} disableRipple>
                フットサル
              </StyledMenuItem>
              <StyledMenuItem onClick={handleClose} disableRipple>
                ソサイチ
              </StyledMenuItem>
            </StyledMenu>
            <Button
              aria-controls={openType ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openType ? 'true' : undefined}
              size="small"
              sx={{ fontSize: 12, px: 1 }}
              disableRipple
              onClick={handleClickType}
            >
              募集タイプを選択
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorElType}
              open={openType}
              onClose={handleCloseType}
            >
              <StyledMenuItem onClick={handleCloseType} disableRipple>
                試合相手の募集
              </StyledMenuItem>
              <StyledMenuItem onClick={handleCloseType} disableRipple>
                個人での参加の募集
              </StyledMenuItem>
              <StyledMenuItem onClick={handleCloseType} disableRipple>
                チームメイトの募集
              </StyledMenuItem>
              <StyledMenuItem onClick={handleCloseType} disableRipple>
                チームに入りたい募集
              </StyledMenuItem>
              <StyledMenuItem onClick={handleCloseType} disableRipple>
                コーチの募集
              </StyledMenuItem>
              <StyledMenuItem onClick={handleCloseType} disableRipple>
                その他
              </StyledMenuItem>
            </StyledMenu>
          </Box>
        </Grid>
        <Grid display="none" item xs={2} />
      </Grid>
      <Grid container sx={{ maxWidth: 900, margin: '0 auto', px: 0 }}>
        <Grid item xs={10}>
          <Box sx={{ mt: -1 }}>
            <Container>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  bgcolor: '#fff',
                  height: 310,
                  mt: 3,
                }}
              >
                <InputBase multiline rows={13} fullWidth sx={{ fontSize: 14, py: 4, px: 4 }} placeholder="募集の詳細" />
              </Paper>
              <Grid container mt={4}>
                <Grid item xs={6}>
                  <Box maxWidth={320}>
                    <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
                      募集エリア
                    </InputLabel>
                    <Select
                      defaultValue=""
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 300,
                          },
                        },
                      }}
                      id="input-prefecture"
                      fullWidth
                      input={<RecruitmentSelectInput />}
                    >
                      {data?.getPrefectures.map((prefecture) => (
                        <StyledMenuItem disableRipple key={prefecture.id} value={prefecture.id}>
                          {prefecture.name}
                        </StyledMenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box maxWidth={320} ml="auto">
                    <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
                      会場名
                    </InputLabel>
                    <RecruitmentInput fullWidth />
                  </Box>
                </Grid>
                <Grid mt={4} item xs={6}>
                  <Box maxWidth={320}>
                    <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
                      レベル
                    </InputLabel>
                    <Select
                      defaultValue=""
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 300,
                          },
                        },
                      }}
                      id="input-prefecture"
                      fullWidth
                      input={<RecruitmentSelectInput />}
                    >
                      {levels.map((level: Level) => (
                        <StyledMenuItem disableRipple key={level.id} value={level.id}>
                          {level.value}
                        </StyledMenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
                <Grid mt={4} item xs={6}>
                  <Box maxWidth={320} ml="auto">
                    <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
                      募集人数
                    </InputLabel>
                    <RecruitmentInput type="number" fullWidth />
                  </Box>
                </Grid>
                <Grid mt={3} item xs={6}>
                  <Box maxWidth={320}>
                    <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
                      開催日時
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                      <DateTimePicker
                        open={pickerHold}
                        onClose={() => setPickerHold(false)}
                        minDate={new Date()}
                        renderInput={(props) => (
                          <RecruitmentInput
                            fullWidth
                            type="text"
                            inputRef={props.inputRef}
                            inputProps={props.inputProps}
                            value={props.value}
                            onClick={() => setPickerHold(true)}
                          />
                        )}
                        value={valueHold}
                        onChange={(newValue) => {
                          setValueHold(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid mb={15} mt={3} item xs={6}>
                  <Box maxWidth={320} ml="auto">
                    <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
                      募集期限
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                      <DateTimePicker
                        open={pickerDeadline}
                        onClose={() => setPickerDeadline(false)}
                        minDate={new Date()}
                        renderInput={(props) => (
                          <RecruitmentInput
                            fullWidth
                            type="text"
                            inputRef={props.inputRef}
                            inputProps={props.inputProps}
                            value={props.value}
                            onClick={() => setPickerDeadline(true)}
                          />
                        )}
                        value={valueDeadline}
                        onChange={(newValue) => {
                          setValueDeadline(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
        <Grid mt={2} xs={2} item>
          <Grid container spacing={1.4}>
            <Grid item xs={12}>
              <TooltipCustom title="募集を作成">
                <Fab
                  disableRipple
                  size="small"
                  sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
                  aria-label="add"
                >
                  <CreateOutlinedIcon />
                </Fab>
              </TooltipCustom>
            </Grid>
            <Grid item xs={12}>
              <TooltipCustom title="プレビュー">
                <Fab
                  disableRipple
                  size="small"
                  sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
                  aria-label="add"
                >
                  <PreviewIcon />
                </Fab>
              </TooltipCustom>
            </Grid>
            <Grid item xs={12}>
              <TooltipCustom title="会場を埋め込む">
                <Fab
                  disableRipple
                  size="small"
                  sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
                  aria-label="add"
                >
                  <AddLocationAltIcon />
                </Fab>
              </TooltipCustom>
            </Grid>
            <Grid item xs={12}>
              <TooltipCustom title="下書き保存">
                <Fab
                  disableRipple
                  size="small"
                  sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </TooltipCustom>
            </Grid>

            <Grid item xs={12}>
              <TooltipCustom title="ヘルプ">
                <Fab
                  disableRipple
                  size="small"
                  sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
                  aria-label="add"
                >
                  <QuestionMarkIcon />
                </Fab>
              </TooltipCustom>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});
