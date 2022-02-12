import { memo, useState, VFC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { UseFormSetValue } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleMap, StandaloneSearchBox, useJsApiLoader, Marker } from '@react-google-maps/api';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';

import { CreateRecruitmentInput } from '../../generated/graphql';
import { Typography } from '@mui/material';
import { StyledLocationSearchInput } from '../index';

type Props = {
  setValue: UseFormSetValue<CreateRecruitmentInput>;
  open: boolean;
  handleClose: () => void;
};

interface LocationObject {
  lat: number;
  lng: number;
}

type Libraries = ['places'];
const libraries: Libraries = ['places'];

export const RecruitmentLocationDialog: VFC<Props> = memo((props) => {
  const { open, setValue, handleClose } = props;
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  const googleMapApiKey: string = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const [location, setLocation] = useState<LocationObject>({
    lat: 35.69575,
    lng: 139.77521,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapApiKey,
    libraries,
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

  const onSBLoad = (ref: google.maps.places.SearchBox) => {
    console.log(ref);

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

  return (
    <Dialog
      PaperProps={{
        sx: {
          minWidth: 500,
          py: 0.5,
        },
      }}
      open={open}
      onClose={handleClose}
    >
      {isLoaded && (
        <>
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
              マーカーを設置するにはマップをクリック又は検索することで設置できます。
              <br />
              ※マーカーが設置されていないと保存することはできません。
            </Typography>

            <GoogleMap
              mapContainerStyle={{ width: '500px', height: '400px' }}
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
                      return (
                        <StyledLocationSearchInput
                          ref={InputProps.ref}
                          // endAdornment={
                          //   <IconButton
                          //     onClick={onPlacesChanged}
                          //     disableRipple
                          //     sx={{ position: 'relative', right: 45 }}
                          //   >
                          //     <SearchIcon sx={{ fontSize: 20 }} />
                          //   </IconButton>
                          // }
                          placeholder="検索ワードを入力"
                          {...rest}
                        />
                      );
                    }}
                  />
                </StandaloneSearchBox>
                <Marker position={location} />
              </>
            </GoogleMap>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', mb: 1, pt: 0 }}>
            <Button size="large" disableElevation variant="contained" onClick={setLatLng} autoFocus>
              保存する
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
});
