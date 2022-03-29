import { memo, useEffect, useState, VFC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleMap, StandaloneSearchBox, Marker, LoadScript } from '@react-google-maps/api';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';

import { RecruitmentInput, Type } from '../../generated/graphql';
import { Box, Typography } from '@mui/material';
import { StyledLocationSearchInput } from '../index';
import { useSize } from '../../hooks';

type Props = {
  setValue: UseFormSetValue<RecruitmentInput>;
  getValues: UseFormGetValues<RecruitmentInput>;
  open: boolean;
  handleClose: () => void;
  watchType: Type;
};

type LocationObject = {
  lat: number;
  lng: number;
};

type Libraries = ['places'];
const libraries: Libraries = ['places'];

export const RecruitmentLocationDialog: VFC<Props> = memo((props) => {
  const { open, setValue, handleClose, watchType, getValues } = props;
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  const defaultLat = getValues('locationLat');
  const defaultLng = getValues('locationLng');

  const googleMapApiKey: string = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const [location, setLocation] = useState<LocationObject>({
    lat: defaultLat ? defaultLat : 35.69575,
    lng: defaultLng ? defaultLng : 139.77521,
  });

  const onPlacesChanged = () => {
    const getLocation = searchBox?.getPlaces()?.shift()?.geometry?.location;

    if (getLocation?.lat() && getLocation?.lng()) {
      setLocation({
        lat: getLocation?.lat(),
        lng: getLocation?.lng(),
      });
    }
  };

  const { isMobile } = useSize();

  const onSBLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const mapOnClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng?.lat() && e.latLng?.lng()) {
      setLocation({
        lat: e.latLng?.lat(),
        lng: e.latLng?.lng(),
      });
    }
  };

  const setLatLng = () => {
    setValue('locationLat', location.lat);
    setValue('locationLng', location.lng);
    handleClose();
  };

  useEffect(() => {
    if (watchType === Type.Member || watchType === Type.Joining || watchType === Type.Others) {
      setLocation({
        lat: 35.69575,
        lng: 139.77521,
      });
    }
  }, [watchType]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          minWidth: isMobile ? 'auto' : 500,
          py: 0.5,
          boxShadow: '0 5px 20px #00166721;',
        },
      }}
      fullScreen={isMobile}
      BackdropProps={{
        sx: {
          bgcolor: 'rgba(38, 50, 56, 0.25);',
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle sx={{ margin: '0 auto', fontWeight: 'bold', fontSize: 23 }}>
        会場を埋め込む
        <IconButton
          disableTouchRipple
          size="small"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 17 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: '#757575' }} mb={2} fontSize={13}>
          会場を埋め込むためにマーカーを設置してください。
          <br />
          マーカーを設置するにはマップをクリック又は検索ワードを入力してください。
          <br />
          ※マーカーを指定の位置に設置後、必ず保存するをクリックしてください。
        </Typography>
        <LoadScript libraries={libraries} googleMapsApiKey={googleMapApiKey}>
          <GoogleMap
            mapContainerStyle={{ width: isMobile ? 'auto' : '500px', height: '400px' }}
            center={{ lat: location.lat, lng: location.lng }}
            zoom={16}
            onClick={mapOnClick}
          >
            <>
              <StandaloneSearchBox onPlacesChanged={onPlacesChanged} onLoad={onSBLoad}>
                <Autocomplete
                  freeSolo
                  disableClearable
                  options={[]}
                  sx={{ width: 250, fontSize: 20 }}
                  ListboxProps={{
                    style: {
                      fontSize: 13,
                    },
                  }}
                  PopperComponent={(props) => <Popper {...props} style={{ width: 264 }} placement="bottom-start" />}
                  renderInput={(params) => {
                    const { InputLabelProps, InputProps, ...rest } = params;
                    return <StyledLocationSearchInput ref={InputProps.ref} placeholder="検索ワードを入力" {...rest} />;
                  }}
                />
              </StandaloneSearchBox>
              <Marker position={location} />
            </>
          </GoogleMap>
        </LoadScript>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button size="large" disableElevation variant="contained" onClick={setLatLng} autoFocus>
            保存する
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
});
