import { memo, SyntheticEvent, useEffect, useState, VFC } from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete, { AutocompleteCloseReason, autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { Checkbox, Dialog, FilterOptionsState, IconButton } from '@mui/material';
import { AiFillTag } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { matchSorter } from 'match-sorter';
import {
  Tag,
  useCreateTagMutation,
  useGetTagsQuery,
  RecruitmentInput,
  RecruitmentTagInput,
} from '../../generated/graphql';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import CloseIcon from '@mui/icons-material/Close';

type PopperComponentProps = {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
};

const StyledList = styled('li')(({ theme }) => ({
  ':hover': {
    background: '#f0f5f4',
  },
}));

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    fontSize: 13,
    backgroundColor: '#fff',
  },
  [`& .${autocompleteClasses.noOptions}`]: {
    padding: 0,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0,
    backgroundColor: '#fff',
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      maxHeight: 40,
      backgroundColor: '#fff',
      borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'}`,
      '&[aria-selected="true"]': {
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: '#f0f5f4',
        },
      },
      '&[aria-selected="false"]': {
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: '#f0f5f4',
        },
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 8,
  width: '100%',
  fontFamily: 'Roboto',
  '& input': {
    backgroundColor: '#fff',
    padding: 6,
    fontSize: 13,
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

type Props = {
  open: boolean;
  handleClose: () => void;
  setFormValue: UseFormSetValue<RecruitmentInput>;
  getValues: UseFormGetValues<RecruitmentInput>;
};

export const AddTagDialog: VFC<Props> = memo((props) => {
  const { open, handleClose, setFormValue, getValues } = props;
  let count = 0;

  const [data] = useGetTagsQuery();
  const [result, createTagMutation] = useCreateTagMutation();

  const tags = data.data?.getTags;

  const [pendingValue, setPendingValue] = useState<RecruitmentTagInput[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<RecruitmentTagInput[]>([]);

  const filterOptions = (options: RecruitmentTagInput[], state: FilterOptionsState<Tag>) => {
    count = 0;
    const result: RecruitmentTagInput[] = matchSorter(options, state.inputValue, { keys: [(item) => item.name] });
    useEffect(() => {
      setInputValue(state.inputValue);
      setFilter(result);
    }, [state.inputValue]);
    return result;
  };

  const createTag = async () => {
    const variables = { name: inputValue };
    const res = await createTagMutation(variables);

    const tag = {
      id: String(res.data?.createTag.id),
      name: String(res.data?.createTag.name),
    };
    tags?.push(tag);
    const newPending = [...pendingValue, tag];
    setPendingValue(newPending);
    setFormValue('tags', newPending);
  };

  const closeOption = () => {
    setFormValue('tags', pendingValue);
    setInputValue('');
  };

  useEffect(() => {
    const defaultTags = getValues('tags').map((tag) => {
      return { id: String(tag?.id), name: String(tag?.name), __typename: 'Tag' };
    });
    setPendingValue(defaultTags);
  }, [open]);

  if (!tags) return null;

  return (
    <Dialog
      PaperProps={{
        sx: {
          minWidth: 290,
          borderRadius: 1,
        },
      }}
      open={open}
      onClose={() => {
        handleClose();
        closeOption();
      }}
    >
      <Box sx={{ px: 1.5, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ fontWeight: 'bold', fontSize: 15 }}>タグを追加</Box>
        <IconButton
          onClick={() => {
            handleClose();
            closeOption();
          }}
          disableRipple
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Autocomplete
        open
        multiple
        onClose={(event: SyntheticEvent, reason: AutocompleteCloseReason) => {
          if (reason === 'escape') {
            handleClose();
            closeOption();
          }
        }}
        value={pendingValue}
        onChange={(event, newValue, reason) => {
          if (
            event.type === 'keydown' &&
            (event as React.KeyboardEvent).key === 'Backspace' &&
            reason === 'removeOption'
          ) {
            return;
          }
          setFormValue('tags', newValue);
          setInputValue('');
          setPendingValue(newValue);
        }}
        filterOptions={(options, state) => filterOptions(options, state)}
        PopperComponent={PopperComponent}
        noOptionsText={
          <>
            <Box
              sx={{
                mt: 1.5,
                mb: 0.6,
                px: 2,
              }}
            >
              <Box>タグが見つかりませんでした</Box>
            </Box>
            <Box
              sx={{
                py: 1.5,
                px: 1.5,
                display: 'flex',
                alignItems: 'center',
                ':hover': { bgcolor: '#f0f5f4' },
                cursor: 'pointer',
              }}
              onClick={createTag}
            >
              <Box component={IoAddOutline} sx={{ width: 17, height: 17, mr: 1 }} />
              <Box sx={{ fontWeight: 'bold', fontFamily: 'Roboto', color: 'black' }}>
                {inputValue}
                &thinsp;を作成する
              </Box>
            </Box>
          </>
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option, { selected }) => {
          count += 1;
          return (
            <Box key={option.id}>
              <StyledList {...props} style={{ display: 'flex', alignItems: 'center' }}>
                <Box component={AiFillTag} sx={{ width: 17, height: 17, mr: '10px', pl: '5px', color: '#455a64' }} />
                <Box
                  sx={{
                    flexGrow: 1,
                    fontFamily: 'Roboto',
                  }}
                >
                  {option.name}
                </Box>
                <Checkbox disableTouchRipple checked={selected ? true : false} size="small" />
              </StyledList>
              {inputValue !== '' &&
                !filter.some((tag) => tag.name.toLocaleLowerCase() === inputValue.toLocaleLowerCase()) &&
                filter.length === count && (
                  <Box
                    sx={{
                      py: 1.5,
                      px: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      ':hover': { bgcolor: '#f0f5f4' },
                      cursor: 'pointer',
                    }}
                    onClick={createTag}
                  >
                    <Box component={IoAddOutline} sx={{ width: 17, height: 17, mr: 1 }} />
                    <Box sx={{ fontWeight: 'bold', fontFamily: 'Roboto', color: 'black' }}>
                      {inputValue}
                      &thinsp;を作成する
                    </Box>
                  </Box>
                )}
            </Box>
          );
        }}
        options={tags}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <Box sx={{ borderBottom: `1px solid #eaecef` }}>
            <StyledInput
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              placeholder="タグを入力"
              sx={{ pb: pendingValue.length === 0 ? 1 : '' }}
            />
            {pendingValue.length !== 0 && (
              <Box sx={{ display: 'flex', mt: 0.4, mb: 1.5, px: 1.5, flexWrap: 'wrap' }}>
                {pendingValue.map((pending) => (
                  <Box
                    component="span"
                    key={pending.id}
                    sx={{
                      border: '1px solid #e8e8e8',
                      bgcolor: '#f0f5f4',
                      pl: 1,
                      mt: 0.6,
                      pr: 0.5,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'flex',
                      mr: 0.6,
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ fontSize: 11 }}>{pending.name}</Box>
                    <IoIosClose
                      size={15}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        const newArray = pendingValue.filter((pendingNow) => pendingNow.id !== pending.id);
                        setPendingValue(newArray);
                        setFormValue('tags', newArray);
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      />
    </Dialog>
  );
});
